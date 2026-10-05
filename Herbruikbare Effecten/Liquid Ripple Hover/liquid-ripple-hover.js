/* Liquid Ripple Hover — dependency-free WebGL image displacement. */
(function () {
  const MAX_RIPPLES = 12;

  const vertexSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;

    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision highp float;
    #define MAX_RIPPLES 12

    varying vec2 v_uv;
    uniform sampler2D u_texture;
    uniform sampler2D u_heightMap;
    uniform vec2 u_resolution;
    uniform vec2 u_imageResolution;
    uniform vec2 u_heightResolution;
    uniform vec2 u_centers[MAX_RIPPLES];
    uniform float u_ages[MAX_RIPPLES];
    uniform float u_strengths[MAX_RIPPLES];
    uniform int u_count;

    vec2 coverUV(vec2 uv) {
      float frameAspect = u_resolution.x / u_resolution.y;
      float imageAspect = u_imageResolution.x / u_imageResolution.y;

      if (frameAspect > imageAspect) {
        uv.y = (uv.y - 0.5) * (imageAspect / frameAspect) + 0.5;
      } else {
        uv.x = (uv.x - 0.5) * (frameAspect / imageAspect) + 0.5;
      }
      return uv;
    }

    void main() {
      vec2 frameUV = v_uv;
      vec2 heightPixel = 1.0 / u_heightResolution;
      float hL = texture2D(u_heightMap, frameUV - vec2(heightPixel.x, 0.0)).r * 2.0 - 1.0;
      float hR = texture2D(u_heightMap, frameUV + vec2(heightPixel.x, 0.0)).r * 2.0 - 1.0;
      float hD = texture2D(u_heightMap, frameUV - vec2(0.0, heightPixel.y)).r * 2.0 - 1.0;
      float hU = texture2D(u_heightMap, frameUV + vec2(0.0, heightPixel.y)).r * 2.0 - 1.0;
      vec2 displaced = frameUV + vec2(hL - hR, hD - hU) * 0.056;
      float frameAspect = u_resolution.x / u_resolution.y;

      for (int i = 0; i < MAX_RIPPLES; i++) {
        if (i >= u_count) break;

        vec2 delta = frameUV - u_centers[i];
        delta.x *= frameAspect;
        float distanceFromCenter = length(delta);
        float age = u_ages[i];
        float life = 1.15;
        float progress = clamp(age / life, 0.0, 1.0);
        float reach = 0.15;
        float radius = reach * progress;
        float band = distanceFromCenter - radius;
        float width = reach * 0.25;
        float envelope = exp(-(band * band) / (width * width));
        float fade = 1.0 - smoothstep(life * 0.6, life, age);
        float wave = cos((6.2831853 / width) * band) * envelope * fade * u_strengths[i];
        vec2 direction = normalize(delta + vec2(0.00001));
        direction.x /= frameAspect;
        displaced += direction * wave * 0.003;
      }

      vec2 sampleUV = clamp(coverUV(displaced), 0.002, 0.998);
      vec3 color = texture2D(u_texture, sampleUV).rgb;

      vec2 px = 1.0 / u_resolution;
      vec3 offsetColor = texture2D(u_texture, clamp(coverUV(displaced + px * 1.1), 0.002, 0.998)).rgb;
      float highlight = length(color - offsetColor);
      color += highlight * 0.08;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function compile(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  function createProgram(gl) {
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }
    return program;
  }

  function init(element) {
    if (!element || element.dataset.liquidRippleReady === 'true') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const stage = element.querySelector('[data-liquid-ripple-stage]');
    const image = element.querySelector('[data-liquid-ripple-source]');
    const canvas = element.querySelector('[data-liquid-ripple-canvas]');
    if (!stage || !image || !canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: 'high-performance'
    });
    if (!gl) return;

    let program;
    try {
      program = createProgram(gl);
    } catch (error) {
      console.warn('Liquid Ripple Hover could not start:', error);
      return;
    }

    const position = gl.getAttribLocation(program, 'a_position');
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

    const locations = {
      texture: gl.getUniformLocation(program, 'u_texture'),
      heightMap: gl.getUniformLocation(program, 'u_heightMap'),
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      imageResolution: gl.getUniformLocation(program, 'u_imageResolution'),
      heightResolution: gl.getUniformLocation(program, 'u_heightResolution'),
      centers: gl.getUniformLocation(program, 'u_centers[0]'),
      ages: gl.getUniformLocation(program, 'u_ages[0]'),
      strengths: gl.getUniformLocation(program, 'u_strengths[0]'),
      count: gl.getUniformLocation(program, 'u_count')
    };

    const texture = gl.createTexture();
    const heightTexture = gl.createTexture();
    const ripples = [];
    const stampQueue = [];
    let frame = 0;
    let hovering = false;
    let lastPoint = null;
    let lastStamp = 0;
    let lastInteraction = 0;
    let activeUntil = 0;
    let simWidth = 0;
    let simHeight = 0;
    let current;
    let previous;
    let next;
    let heightBytes;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(stage.clientWidth * ratio));
      const height = Math.max(1, Math.round(stage.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      const targetWidth = 220;
      const targetHeight = Math.max(72, Math.round(targetWidth * height / width));
      if (simWidth !== targetWidth || simHeight !== targetHeight) {
        simWidth = targetWidth;
        simHeight = targetHeight;
        const size = simWidth * simHeight;
        current = new Float32Array(size);
        previous = new Float32Array(size);
        next = new Float32Array(size);
        heightBytes = new Uint8Array(size);
        heightBytes.fill(128);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, heightTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, simWidth, simHeight, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, heightBytes);
      }
    }

    function addStamp(x, y, strength) {
      const now = performance.now();
      stampQueue.push({ x, y, strength });
      lastInteraction = now;
      activeUntil = now + 900;
      if (!frame) frame = requestAnimationFrame(render);
    }

    function updateWater(now) {
      const quietFor = Math.max(0, now - lastInteraction);
      const releaseProgress = Math.max(0, Math.min(1, (quietFor - 180) / 2800));
      const easedRelease = releaseProgress * releaseProgress * (3 - 2 * releaseProgress);
      const damping = .985 - easedRelease * .045;

      for (let y = 1; y < simHeight - 1; y++) {
        const row = y * simWidth;
        for (let x = 1; x < simWidth - 1; x++) {
          const index = row + x;
          const neighbors = current[index - 1] + current[index + 1] + current[index - simWidth] + current[index + simWidth];
          next[index] = (neighbors * .5 - previous[index]) * damping;
        }
      }

      const oldPrevious = previous;
      previous = current;
      current = next;
      next = oldPrevious;
      next.fill(0);

      while (stampQueue.length) {
        const stamp = stampQueue.shift();
        const centerX = stamp.x * (simWidth - 1);
        const centerY = stamp.y * (simHeight - 1);
        const radius = Math.max(5, Math.sqrt(simWidth * simHeight) * .05);
        const minX = Math.max(1, Math.floor(centerX - radius));
        const maxX = Math.min(simWidth - 2, Math.ceil(centerX + radius));
        const minY = Math.max(1, Math.floor(centerY - radius));
        const maxY = Math.min(simHeight - 2, Math.ceil(centerY + radius));

        for (let y = minY; y <= maxY; y++) {
          for (let x = minX; x <= maxX; x++) {
            const distance = Math.hypot(x - centerX, y - centerY) / radius;
            if (distance < 1) {
              const softStamp = .5 + .5 * Math.cos(distance * Math.PI);
              current[y * simWidth + x] += softStamp * stamp.strength;
            }
          }
        }
      }

      let peak = 0;
      for (let i = 0; i < current.length; i++) {
        peak = Math.max(peak, Math.abs(current[i]));
        heightBytes[i] = Math.round(Math.max(0, Math.min(255, 128 + current[i] * 42)));
      }

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, heightTexture);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, simWidth, simHeight, gl.LUMINANCE, gl.UNSIGNED_BYTE, heightBytes);
      return peak;
    }

    function addRipple(x, y, strength) {
      const now = performance.now();
      ripples.push({ x, y, born: now, strength });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
      activeUntil = now + 1400;
      if (!frame) frame = requestAnimationFrame(render);
    }

    function render(now) {
      frame = 0;
      resize();

      while (ripples.length && now - ripples[0].born > 1250) ripples.shift();
      const waterPeak = updateWater(now);

      const centers = new Float32Array(MAX_RIPPLES * 2);
      const ages = new Float32Array(MAX_RIPPLES);
      const strengths = new Float32Array(MAX_RIPPLES);

      ripples.forEach((ripple, index) => {
        centers[index * 2] = ripple.x;
        centers[index * 2 + 1] = ripple.y;
        ages[index] = (now - ripple.born) / 1000;
        strengths[index] = ripple.strength;
      });

      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1i(locations.texture, 0);
      gl.uniform1i(locations.heightMap, 1);
      gl.uniform2f(locations.resolution, canvas.width, canvas.height);
      gl.uniform2f(locations.imageResolution, image.naturalWidth, image.naturalHeight);
      gl.uniform2f(locations.heightResolution, simWidth, simHeight);
      gl.uniform2fv(locations.centers, centers);
      gl.uniform1fv(locations.ages, ages);
      gl.uniform1fv(locations.strengths, strengths);
      gl.uniform1i(locations.count, ripples.length);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      const waterIsVisible = waterPeak > .01;
      if (ripples.length || hovering || stampQueue.length || waterIsVisible || now < activeUntil) {
        frame = requestAnimationFrame(render);
      } else {
        current.fill(0);
        previous.fill(0);
        next.fill(0);
      }
    }

    function pointFromEvent(event) {
      const bounds = stage.getBoundingClientRect();
      return {
        x: (event.clientX - bounds.left) / bounds.width,
        y: 1 - (event.clientY - bounds.top) / bounds.height
      };
    }

    function start() {
      resize();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      element.dataset.liquidRippleReady = 'true';
      element.classList.add('is-liquid-ripple-ready');
      render(performance.now());
    }

    stage.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      hovering = true;
      const point = pointFromEvent(event);
      lastPoint = point;
      addStamp(point.x, point.y, .5);
    });

    stage.addEventListener('pointermove', event => {
      if (!hovering || event.pointerType === 'touch') return;
      const now = performance.now();
      const point = pointFromEvent(event);
      const distance = lastPoint ? Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y) : 1;

      if (now - lastStamp > 32 && distance > .009) {
        addStamp(point.x, point.y, Math.min(1.2, .35 + distance * 16));
        lastPoint = point;
        lastStamp = now;
      }
    });

    stage.addEventListener('pointerdown', event => {
      if (event.pointerType === 'touch') return;
      const point = pointFromEvent(event);
      addStamp(point.x, point.y, 1.8);
      addRipple(point.x, point.y, 1.1);
    });

    stage.addEventListener('pointerleave', () => {
      hovering = false;
      lastPoint = null;
      const now = performance.now();
      lastInteraction = now;
      activeUntil = Math.max(activeUntil, now + 1600);
      if (!frame) frame = requestAnimationFrame(render);
    });

    new ResizeObserver(() => {
      resize();
      if (!frame) frame = requestAnimationFrame(render);
    }).observe(stage);

    if (image.complete && image.naturalWidth) start();
    else image.addEventListener('load', start, { once: true });
  }

  function initAll(root = document) {
    root.querySelectorAll('[data-liquid-ripple]').forEach(init);
  }

  window.LiquidRippleHover = { init, initAll };
  initAll();
})();
