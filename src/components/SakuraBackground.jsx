import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SakuraBackground = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef(new THREE.Vector2(-1000, -1000)); // Start off-screen

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights for 3D effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Boosted
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(2, 5, 5); // Better angle
    scene.add(directionalLight);

    // Create sakura flower blossom
    const createSakuraFlower = () => {
      const flowerGroup = new THREE.Group();
      
      // Randomly pick between violet and soft pink
      const isPink = Math.random() > 0.5;
      const baseColor = isPink ? '#f9a8d4' : '#d8b4fe';
      
      const petalShape = new THREE.Shape();
      // Drawing a much more delicate petal shape
      petalShape.moveTo(0, 0);
      petalShape.bezierCurveTo(1, 1, 2, 0.5, 2, -0.5);
      petalShape.bezierCurveTo(2, -1.5, 1, -2, 0, -1);
      petalShape.bezierCurveTo(-1, -2, -2, -1.5, -2, -0.5);
      petalShape.bezierCurveTo(-2, 0.5, -1, 1, 0, 0);

      const petalGeometry = new THREE.ShapeGeometry(petalShape);
      
      const petalMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(baseColor),
        emissive: new THREE.Color(baseColor).multiplyScalar(0.2), // Slight glow
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
        shininess: 100,
        depthWrite: false, // Prevents dark overlap artifacts
      });

      // Create 5 petals arranged in a circle
      for (let i = 0; i < 5; i++) {
        const petal = new THREE.Mesh(petalGeometry, petalMaterial);
        petal.rotation.z = (i / 5) * Math.PI * 2;
        flowerGroup.add(petal);
      }

      // Add a small center
      const centerGeometry = new THREE.CircleGeometry(0.3, 8);
      const centerMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color('#fef3c7'), // Softer yellow/white
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const center = new THREE.Mesh(centerGeometry, centerMaterial);
      center.position.z = 0.1;
      flowerGroup.add(center);

      return flowerGroup;
    };

    // Create particles array
    const particles = [];
    const particleCount = 100; // Slightly reduced for flower complexity

    for (let i = 0; i < particleCount; i++) {
      const flower = createSakuraFlower();

      // Random initial position
      flower.position.set(
        (Math.random() - 0.5) * 400,
        Math.random() * 400 - 100,
        (Math.random() - 0.5) * 200
      );

      // Random rotation
      flower.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // Random scale - adjusted for min 5-10px appearance
      const scale = Math.random() * 0.3 + 0.3;
      flower.scale.set(scale, scale, scale);

      const particle = {
        mesh: flower,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.4,
          -Math.random() * 0.4 - 0.2, // Falling downwards
          (Math.random() - 0.5) * 0.2
        ),
        rotationSpeed: new THREE.Vector3(
          Math.random() * 0.02,
          Math.random() * 0.02,
          Math.random() * 0.02
        ),
        sway: Math.random() * 0.05,
        time: Math.random() * 100,
      };

      scene.add(flower);
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Animation loop
    let lastTime = 0;
    const animate = (time) => {
      // Handle the first frame where time might be high
      if (lastTime === 0) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      requestAnimationFrame(animate);

      particles.forEach((particle) => {
        // Use deltaTime for smooth animation regardless of frame rate
        const factor = deltaTime / 16.67; // normalize to 60fps
        particle.time += 0.01 * factor;

        // --- Mouse Repulsion Logic ---
        // Convert flower 3D position to normalized screen space roughly
        // (This is a simplified approach for performance)
        const flowerPos = particle.mesh.position.clone();
        
        // Simple distance check in 3D-to-2D approximation
        // X and Y are roughly -200 to 200 in our scene
        const nx = (flowerPos.x / 200); 
        const ny = (flowerPos.y / 200);

        const dx = nx - mouseRef.current.x;
        const dy = ny - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const repulsionRadius = 0.4;
        const repulsionStrength = 2.0;

        if (dist < repulsionRadius) {
          const force = (1 - dist / repulsionRadius) * repulsionStrength;
          particle.velocity.x += (dx / dist) * force * 0.1;
          particle.velocity.y += (dy / dist) * force * 0.1;
        }

        // Apply movement
        particle.mesh.position.x += (particle.velocity.x + Math.sin(particle.time + particle.sway) * 0.1) * factor;
        particle.mesh.position.y += particle.velocity.y * factor;
        particle.mesh.position.z += particle.velocity.z * factor;

        // Damping for velocity (so repulsion doesn't last forever)
        particle.velocity.x *= Math.pow(0.98, factor);
        if (particle.velocity.y > -0.2) {
          particle.velocity.y *= Math.pow(0.98, factor);
        } else {
          // Ensure it keeps falling
          particle.velocity.y = Math.max(-0.6, particle.velocity.y);
        }

        // Apply rotation for fluttering effect
        particle.mesh.rotation.x += particle.rotationSpeed.x * factor;
        particle.mesh.rotation.y += particle.rotationSpeed.y * factor;
        particle.mesh.rotation.z += Math.sin(particle.time) * 0.02 * factor;

        // Wrap around boundaries
        if (particle.mesh.position.y < -150) {
          particle.mesh.position.y = 250;
          particle.mesh.position.x = (Math.random() - 0.5) * 400;
          particle.velocity.y = -Math.random() * 0.4 - 0.2; // Reset falling speed
        }
        if (particle.mesh.position.x > 250) particle.mesh.position.x = -250;
        if (particle.mesh.position.x < -250) particle.mesh.position.x = 250;
      });

      renderer.render(scene, camera);
    };

    const requestId = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const handleMouseMove = (event) => {
      // Normalize mouse coordinates to -1 to 1
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(requestId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
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
        zIndex: 5, // Above section backgrounds (z-0) but below content (z-10)
        pointerEvents: 'none',
      }}
    />
  );
};

export default SakuraBackground;
