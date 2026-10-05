(() => {
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  class GravityStarsField {
    constructor(root) {
      this.root = root;
      this.canvas = root.querySelector('[data-gravity-stars-canvas]');
      this.context = this.canvas?.getContext('2d');
      if (!this.context) return;

      this.baseCount = Number(root.dataset.count) || 240;
      this.connectDistance = Number(root.dataset.connectDistance) || 120;
      this.tint = clamp(Number(root.dataset.tint) || .65, 0, 1);
      this.gravityRadius = Number(root.dataset.gravityRadius) || 380;
      this.gravityStrength = clamp(Number(root.dataset.gravityStrength) || .22, .04, .4);
      this.pointerResponse = clamp(Number(root.dataset.pointerResponse) || .36, .05, 1);
      this.maxOffset = clamp(Number(root.dataset.maxOffset) || 140, 40, 220);
      this.stars = [];
      this.width = 0;
      this.height = 0;
      this.frame = 0;
      this.visible = true;
      this.lastTime = performance.now();
      this.pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };

      this.resize = this.resize.bind(this);
      this.onPointerMove = this.onPointerMove.bind(this);
      this.onPointerLeave = this.onPointerLeave.bind(this);
      this.render = this.render.bind(this);

      this.resizeObserver = new ResizeObserver(this.resize);
      this.resizeObserver.observe(root);

      this.visibilityObserver = new IntersectionObserver(entries => {
        this.visible = entries[0]?.isIntersecting ?? true;
        if (this.visible && !this.frame && !reducedMotion.matches) {
          this.lastTime = performance.now();
          this.frame = requestAnimationFrame(this.render);
        }
      }, { rootMargin: '160px' });
      this.visibilityObserver.observe(root);

      if (finePointer.matches) {
        root.addEventListener('pointermove', this.onPointerMove, { passive: true });
        root.addEventListener('pointerleave', this.onPointerLeave, { passive: true });
      }

      this.resize();
    }

    resize() {
      const rect = this.root.getBoundingClientRect();
      this.width = Math.max(1, Math.round(rect.width));
      this.height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.canvas.width = Math.round(this.width * dpr);
      this.canvas.height = Math.round(this.height * dpr);
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
      this.context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const areaRatio = clamp((this.width * this.height) / (1440 * 900), .38, 1);
      const count = Math.max(90, Math.round(this.baseCount * areaRatio));
      this.stars = Array.from({ length: count }, () => this.createStar());
      this.pointer.x = this.pointer.targetX = this.width * .5;
      this.pointer.y = this.pointer.targetY = this.height * .5;

      if (reducedMotion.matches) {
        cancelAnimationFrame(this.frame);
        this.frame = 0;
        this.draw(0, false);
      } else if (!this.frame) {
        this.lastTime = performance.now();
        this.frame = requestAnimationFrame(this.render);
      }
    }

    createStar() {
      const bright = Math.random() < .3;
      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        driftX: (Math.random() - .5) * .055,
        driftY: (Math.random() - .5) * .055,
        offsetX: 0,
        offsetY: 0,
        velocityX: 0,
        velocityY: 0,
        radius: bright ? .9 + Math.random() * 1.35 : .35 + Math.random() * .65,
        alpha: bright ? .46 + Math.random() * .48 : .12 + Math.random() * .26,
        phase: Math.random() * Math.PI * 2,
        pulse: .0007 + Math.random() * .00125,
        warm: Math.random() < .18
      };
    }

    onPointerMove(event) {
      const rect = this.root.getBoundingClientRect();
      this.pointer.targetX = event.clientX - rect.left;
      this.pointer.targetY = event.clientY - rect.top;
      this.pointer.active = true;
    }

    onPointerLeave() {
      this.pointer.active = false;
    }

    updateStar(star, step) {
      star.x += star.driftX * step;
      star.y += star.driftY * step;

      if (star.x < -8) star.x = this.width + 8;
      if (star.x > this.width + 8) star.x = -8;
      if (star.y < -8) star.y = this.height + 8;
      if (star.y > this.height + 8) star.y = -8;

      const currentX = star.x + star.offsetX;
      const currentY = star.y + star.offsetY;
      const dx = this.pointer.x - currentX;
      const dy = this.pointer.y - currentY;
      const distance = Math.hypot(dx, dy) || 1;

      if (this.pointer.active && distance < this.gravityRadius) {
        const influence = 1 - distance / this.gravityRadius;
        const force = influence * influence * this.gravityStrength * step;
        star.velocityX += (dx / distance) * force - (dy / distance) * force * .16;
        star.velocityY += (dy / distance) * force + (dx / distance) * force * .16;
      }

      star.velocityX += -star.offsetX * .0034 * step;
      star.velocityY += -star.offsetY * .0034 * step;
      const damping = Math.pow(.925, step);
      star.velocityX *= damping;
      star.velocityY *= damping;
      star.offsetX += star.velocityX * step;
      star.offsetY += star.velocityY * step;

      const offsetLength = Math.hypot(star.offsetX, star.offsetY);
      if (offsetLength > this.maxOffset) {
        star.offsetX *= this.maxOffset / offsetLength;
        star.offsetY *= this.maxOffset / offsetLength;
      }
    }

    draw(time, update = true) {
      const context = this.context;
      context.clearRect(0, 0, this.width, this.height);

      const points = this.stars.map(star => {
        if (update) this.updateStar(star, this.step);
        return { star, x: star.x + star.offsetX, y: star.y + star.offsetY };
      });

      context.lineWidth = .55;
      for (let i = 0; i < points.length; i += 1) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j += 1) {
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared > this.connectDistance * this.connectDistance) continue;

          const distance = Math.sqrt(distanceSquared);
          const alpha = (1 - distance / this.connectDistance) * .14 * this.tint;
          context.strokeStyle = `rgba(209, 218, 231, ${alpha})`;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      points.forEach(({ star, x, y }) => {
        const twinkle = .72 + Math.sin(time * star.pulse + star.phase) * .28;
        const alpha = clamp(star.alpha * twinkle * (.62 + this.tint * .58), .04, 1);
        const color = star.warm ? '255, 239, 209' : '231, 237, 244';

        context.save();
        if (star.radius > .95) {
          context.shadowBlur = 8 + star.radius * 7;
          context.shadowColor = `rgba(${color}, ${alpha * .88})`;
        }
        context.fillStyle = `rgba(${color}, ${alpha})`;
        context.beginPath();
        context.arc(x, y, star.radius * twinkle, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });
    }

    render(time) {
      this.frame = 0;
      if (!this.visible || reducedMotion.matches) return;

      const elapsed = Math.min(32, time - this.lastTime);
      this.lastTime = time;
      this.step = elapsed / (1000 / 60);
      const pointerEase = 1 - Math.pow(1 - this.pointerResponse, this.step);
      this.pointer.x += (this.pointer.targetX - this.pointer.x) * pointerEase;
      this.pointer.y += (this.pointer.targetY - this.pointer.y) * pointerEase;
      this.draw(time, true);
      this.frame = requestAnimationFrame(this.render);
    }
  }

  document.querySelectorAll('[data-gravity-stars]').forEach(root => new GravityStarsField(root));
})();
