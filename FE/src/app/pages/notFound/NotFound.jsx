import classes from "./notFound.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function NotFound() {
  const canvasRef = useRef(null);
  const fireworksRef = useRef([]);
  const requestRef = useRef();
  const hoverIntervalRef = useRef();
  const colors = ["#3b82f6", "#60a5fa", "#2563eb", "#38bdf8", "#0ea5e9"];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Rocket firework for NavLink hover, launches in a random direction
  function createRocketFirework(x, y) {
    const angle = random(-Math.PI / 3, (-2 * Math.PI) / 3); // mostly upward, but random left/right
    const speed = random(6, 9);
    const rocket = {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: colors[Math.floor(random(0, colors.length))],
      exploded: false,
      phase: "rocket",
    };
    fireworksRef.current.push({ rocket });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (let i = fireworksRef.current.length - 1; i >= 0; i--) {
        const fw = fireworksRef.current[i];
        // Rocket firework
        if (fw.rocket) {
          const r = fw.rocket;
          if (!r.exploded) {
            // Draw rocket
            ctx.save();
            ctx.globalAlpha = r.alpha;
            ctx.beginPath();
            ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = r.color;
            ctx.shadowColor = r.color;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.restore();
            // Move rocket in its direction
            r.x += r.vx;
            r.y += r.vy;
            r.vy += 0.08; // gravity
            r.vx *= 0.99; // slight air resistance
            r.alpha *= 0.99;
            // When rocket slows down enough or leaves the screen, explode
            if (r.vy > -2 || r.y < H * 0.15 || r.x < 0 || r.x > W) {
              r.exploded = true;
              // Create explosion at rocket's position
              const color = r.color;
              const particles = [];
              const count = 36;
              for (let j = 0; j < count; j++) {
                const angle = (Math.PI * 2 * j) / count;
                const speed = random(2, 5);
                particles.push({
                  x: r.x,
                  y: r.y,
                  vx: Math.cos(angle) * speed,
                  vy: Math.sin(angle) * speed,
                  alpha: 1,
                  color,
                  phase: "explosion",
                });
              }
              fw.particles = particles;
              delete fw.rocket;
            }
          }
        }
        // Explosion phase
        if (fw.particles) {
          let allGone = true;
          for (const p of fw.particles) {
            if (p.alpha > 0.01) {
              allGone = false;
              ctx.save();
              ctx.globalAlpha = p.alpha;
              ctx.beginPath();
              ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 12;
              ctx.fill();
              ctx.restore();
              p.x += p.vx;
              p.y += p.vy;
              p.vx *= 0.98;
              p.vy *= 0.98;
              p.vy += 0.04; // gravity
              p.alpha *= 0.97;
            }
          }
          if (allGone) {
            fireworksRef.current.splice(i, 1);
          }
        }
      }
      requestRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(requestRef.current);
      clearInterval(hoverIntervalRef.current);
    };
  }, []);

  // Infinite rocket firework on NavLink hover
  function handleNavLinkHover(e) {
    if (hoverIntervalRef.current) return;
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    createRocketFirework(x, y);
    hoverIntervalRef.current = setInterval(() => {
      createRocketFirework(x, y);
    }, 350);
  }
  function handleNavLinkLeave() {
    clearInterval(hoverIntervalRef.current);
    hoverIntervalRef.current = null;
  }

  return (
    <div className={classes.container}>
      <canvas ref={canvasRef} className={classes.fireworks} />
      <div className={classes.animated404} style={{ zIndex: 1 }}>
        404
      </div>
      <h2 className={classes.title} style={{ zIndex: 1 }}>
        Page Not Found
      </h2>
      <p className={classes.message} style={{ zIndex: 1 }}>
        The page you are looking for does not exist.
      </p>
      <NavLink
        to="/"
        className={classes.homeButton}
        style={{ zIndex: 1 }}
        onMouseEnter={handleNavLinkHover}
        onMouseLeave={handleNavLinkLeave}
      >
        Go Home
      </NavLink>
    </div>
  );
}
