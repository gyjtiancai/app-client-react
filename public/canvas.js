(function () {
    const Canvas = document.getElementById("hello-canvas")
    const Width = Canvas.width
    const Height = Canvas.height
    if (!Canvas.getContext) return
    const ctx = Canvas.getContext('2d');
    class RandomParticles {
      constructor(x, y) {
        this.x = x;  //x坐标
        this.y = y;  //y坐标
        this.r = 80 //半径
        this.circles = [];
      }
      //绘制球
      draw() {
        const x = Math.random() * this.x;
        const y = Math.random() * this.y;
        const r = this.r;
        const color = `rgba(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256},${Math.random()})`;
        this.circles.push({ x: x, y: y, r: r, color: color, isAddX: true, isAddY: true });
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      }
      //球移动规则
      move(speed) {
        this.circles.forEach(circle => {
          if (circle.isAddX) {
            if (circle.x < Width - this.r) {
              circle.x = circle.x + speed
            } else {
              circle.isAddX = false
            }
          } else {
            if (circle.x > 0 + this.r) {
              circle.x = circle.x - speed
            } else {
              circle.isAddX = true
            }
          }
          if (circle.isAddY) {
            if (circle.y < Height - this.r) {
              circle.y = circle.y + speed
            } else {
              circle.isAddY = false
            }
          } else {
            if (circle.y > 0 + this.r) {
              circle.y = circle.y - speed
            } else {
              circle.isAddY = true
            }
          }
          ctx.beginPath();
          ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
          ctx.closePath();
          ctx.fillStyle = circle.color;
          ctx.fill();
        })
      }
      //绘制指定个数的球
      init(count) {
        for (let i = 0; i < count; i++) {
          this.draw()
        }
      }
    }
    const particles = new RandomParticles(Width, Height)
    particles.init(8)
    function anmite() {
      //清空画布
      ctx.clearRect(0, 0, Width, Height);
      particles.move(1)
      requestAnimationFrame(anmite)
    }
    anmite()
  })()