import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Fireworks = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const particles = [];
    const colors = ['#f4a3c7', '#c4b5fd', '#fef3c7', '#9b6fa6', '#ffffff'];

    class Particle {
      constructor(x, y, color) {
        this.pos = new THREE.Vector3(x, y, 0);
        this.vel = new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
        this.acc = new THREE.Vector3(0, -0.05, 0); // Gravity
        this.life = 1.0;
        this.decay = Math.random() * 0.02 + 0.01;
        
        const geometry = new THREE.SphereGeometry(0.3, 4, 4);
        const material = new THREE.MeshBasicMaterial({ 
          color: new THREE.Color(color),
          transparent: true,
          opacity: 1
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(this.pos);
        scene.add(this.mesh);
      }

      update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.mesh.position.copy(this.pos);
        this.life -= this.decay;
        this.mesh.material.opacity = this.life;
        if (this.life <= 0) {
          scene.remove(this.mesh);
          return false;
        }
        return true;
      }
    }

    class Firework {
      constructor() {
        this.exploded = false;
        this.particles = [];
        this.pos = new THREE.Vector3((Math.random() - 0.5) * 150, -50, 0);
        this.vel = new THREE.Vector3((Math.random() - 0.5) * 1, 2 + Math.random() * 2, 0);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        const geometry = new THREE.SphereGeometry(0.5, 4, 4);
        const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(this.color) });
        this.mesh = new THREE.Mesh(geometry, material);
        scene.add(this.mesh);
      }

      update() {
        if (!this.exploded) {
          this.pos.add(this.vel);
          this.mesh.position.copy(this.pos);
          if (this.vel.y <= 0 || Math.random() < 0.02) {
            this.explode();
          }
          this.vel.y -= 0.02; // slow down
        } else {
          for (let i = this.particles.length - 1; i >= 0; i--) {
            if (!this.particles[i].update()) {
              this.particles.splice(i, 1);
            }
          }
        }
        return this.exploded && this.particles.length === 0 ? false : true;
      }

      explode() {
        this.exploded = true;
        scene.remove(this.mesh);
        for (let i = 0; i < 50; i++) {
          this.particles.push(new Particle(this.pos.x, this.pos.y, this.color));
        }
      }
    }

    const activeFireworks = [];

    const animate = () => {
      requestAnimationFrame(animate);
      
      if (Math.random() < 0.05) {
        activeFireworks.push(new Firework());
      }

      for (let i = activeFireworks.length - 1; i >= 0; i--) {
        if (!activeFireworks[i].update()) {
          activeFireworks.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 45, // Above sakura canopy but below navbar if needed
        pointerEvents: 'none',
      }}
    />
  );
};

export default Fireworks;
