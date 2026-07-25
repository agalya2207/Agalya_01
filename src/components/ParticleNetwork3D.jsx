import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleNetwork3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Scene & Camera setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- Group container for tilt & drift ---
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    // --- Create soft glowing dot texture ---
    const createDotTexture = () => {
      const texCanvas = document.createElement('canvas');
      texCanvas.width = 64;
      texCanvas.height = 64;
      const ctx = texCanvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(45, 212, 191, 1.0)');     // Bright teal core #2dd4bf
      grad.addColorStop(0.35, 'rgba(29, 158, 117, 0.7)');  // Deep teal #1D9E75
      grad.addColorStop(0.7, 'rgba(93, 202, 165, 0.2)');   // Light teal glow #5DCAA5
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(texCanvas);
    };

    const dotTexture = createDotTexture();

    // --- Particles Parameters ---
    const NUM_PARTICLES = 100;
    const BOUNDS_X = 380;
    const BOUNDS_Y = 280;
    const BOUNDS_Z = 200;

    const particlePositions = new Float32Array(NUM_PARTICLES * 3);
    const particleVelocities = [];

    for (let i = 0; i < NUM_PARTICLES; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * BOUNDS_X * 2;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS_Y * 2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS_Z * 2;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.25,
        y: (Math.random() - 0.5) * 0.25,
        z: (Math.random() - 0.5) * 0.25,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x5dcaa5,
      size: 14,
      map: dotTexture,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
    particleGroup.add(particlePoints);

    // --- Connecting Lines Setup ---
    const maxConnections = (NUM_PARTICLES * (NUM_PARTICLES - 1)) / 2;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    particleGroup.add(lineSegments);

    const DIST_THRESHOLD = 135;

    // --- Mouse Parallax Tracking ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // --- Resize Handler ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', onResize);

    // --- Animation Loop ---
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // 1. Update particle positions based on velocity & boundary bounce
      const posAttr = particleGeometry.attributes.position;
      const positions = posAttr.array;

      for (let i = 0; i < NUM_PARTICLES; i++) {
        const vel = particleVelocities[i];

        positions[i * 3 + 0] += vel.x;
        positions[i * 3 + 1] += vel.y;
        positions[i * 3 + 2] += vel.z;

        // Bounce back smoothly within 3D bounding box
        if (Math.abs(positions[i * 3 + 0]) > BOUNDS_X) vel.x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > BOUNDS_Y) vel.y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > BOUNDS_Z) vel.z *= -1;
      }
      posAttr.needsUpdate = true;

      // 2. Update connecting lines dynamically
      let lineIndex = 0;
      let colorIndex = 0;
      let vertexCount = 0;

      for (let i = 0; i < NUM_PARTICLES; i++) {
        const p1x = positions[i * 3 + 0];
        const p1y = positions[i * 3 + 1];
        const p1z = positions[i * 3 + 2];

        for (let j = i + 1; j < NUM_PARTICLES; j++) {
          const p2x = positions[j * 3 + 0];
          const p2y = positions[j * 3 + 1];
          const p2z = positions[j * 3 + 2];

          const dx = p1x - p2x;
          const dy = p1y - p2y;
          const dz = p1z - p2z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < DIST_THRESHOLD) {
            // Opacity fades based on distance (~0.15 - 0.35 max)
            const alpha = (1 - dist / DIST_THRESHOLD) * 0.35;

            // Teal color: RGB(29/255, 158/255, 117/255) scaled by alpha
            const r = 0.11 * alpha;
            const g = 0.83 * alpha;
            const b = 0.75 * alpha;

            // Segment start point
            linePositions[lineIndex++] = p1x;
            linePositions[lineIndex++] = p1y;
            linePositions[lineIndex++] = p1z;

            lineColors[colorIndex++] = r;
            lineColors[colorIndex++] = g;
            lineColors[colorIndex++] = b;

            // Segment end point
            linePositions[lineIndex++] = p2x;
            linePositions[lineIndex++] = p2y;
            linePositions[lineIndex++] = p2z;

            lineColors[colorIndex++] = r;
            lineColors[colorIndex++] = g;
            lineColors[colorIndex++] = b;

            vertexCount += 2;
          }
        }
      }

      lineGeometry.setDrawRange(0, vertexCount);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // 3. Constant ambient drift
      particleGroup.rotation.y += 0.0003;

      // 4. Smooth mouse parallax (lerp)
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Max ~6 deg tilt (0.1 rad)
      particleGroup.rotation.x = currentMouseY * 0.1;
      particleGroup.rotation.y += currentMouseX * 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup function on unmount ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      // Dispose geometries, materials, texture, and renderer
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      dotTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleNetwork3D;
