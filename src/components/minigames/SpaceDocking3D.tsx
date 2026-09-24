import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SpaceDocking3DProps {
  posX: number;
  posY: number;
  isAligned: boolean;
  language: 'by' | 'ru';
  thrusterActive: { dx: number; dy: number; timestamp: number } | null;
}

export const SpaceDocking3D: React.FC<SpaceDocking3DProps> = ({
  posX,
  posY,
  isAligned,
  language,
  thrusterActive
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const shipGroupRef = useRef<THREE.Group | null>(null);
  const dockingRingRef = useRef<THREE.Mesh | null>(null);
  const thrusterParticlesRef = useRef<THREE.Points | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // User mouse drag orbit rotation
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const cameraAngleRef = useRef({ yaw: 0, pitch: 0 });

  // Fallback state if WebGL is unsupported
  const [webglSupported, setWebglSupported] = useState(true);

  // Generate procedural realistic Earth texture on canvas (offline, 0 network bytes)
  const createEarthTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Deep ocean gradient
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
    oceanGrad.addColorStop(0, '#0c2340');
    oceanGrad.addColorStop(0.5, '#0d3868');
    oceanGrad.addColorStop(1, '#081728');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // Continents & landmasses
    ctx.fillStyle = '#1e3f20'; // Eurasian green/forests
    // Europe & Belarus region
    ctx.beginPath();
    ctx.ellipse(520, 160, 110, 60, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Asia & East
    ctx.fillStyle = '#2d4a22';
    ctx.beginPath();
    ctx.ellipse(680, 190, 160, 80, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Africa
    ctx.fillStyle = '#5c4826';
    ctx.beginPath();
    ctx.ellipse(510, 290, 80, 110, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Americas
    ctx.fillStyle = '#2d4224';
    ctx.beginPath();
    ctx.ellipse(240, 220, 70, 100, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Swirling atmospheric clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      const cx = (i * 27) % 1024;
      const cy = 100 + (Math.sin(i * 1.5) * 150) + 100;
      const rx = 30 + (i % 5) * 15;
      const ry = 8 + (i % 3) * 6;
      ctx.ellipse(cx, cy, rx, ry, 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 380;

    // 2. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 9.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x223344, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8ee, 3.2);
    sunLight.position.set(20, 15, 25);
    scene.add(sunLight);

    const earthGlow = new THREE.DirectionalLight(0x38bdf8, 1.2);
    earthGlow.position.set(-15, -20, 5);
    scene.add(earthGlow);

    // 4. Background Starfield
    const starCount = 600;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 90 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const colorVariant = Math.random();
      if (colorVariant > 0.8) {
        starColors[i * 3] = 0.5; starColors[i * 3 + 1] = 0.8; starColors[i * 3 + 2] = 1.0; // Cyan
      } else if (colorVariant > 0.6) {
        starColors[i * 3] = 1.0; starColors[i * 3 + 1] = 0.9; starColors[i * 3 + 2] = 0.7; // Gold
      } else {
        starColors[i * 3] = 0.9; starColors[i * 3 + 1] = 0.95; starColors[i * 3 + 2] = 1.0; // White
      }
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 5. Majestic 3D Earth Globe
    const earthTexture = createEarthTexture();
    const earthGeom = new THREE.SphereGeometry(18, 48, 48);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.7,
      metalness: 0.1
    });
    const earthMesh = new THREE.Mesh(earthGeom, earthMat);
    earthMesh.position.set(-6, -24, -20);
    earthMesh.rotation.z = 0.35;
    scene.add(earthMesh);

    // Atmosphere halo
    const atmosGeom = new THREE.SphereGeometry(18.6, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const atmosMesh = new THREE.Mesh(atmosGeom, atmosMat);
    atmosMesh.position.copy(earthMesh.position);
    scene.add(atmosMesh);

    // 6. Target Space Station (МКС Docking Node & Module)
    const stationGroup = new THREE.Group();
    stationGroup.position.set(0, 0, -2.5);

    // Station central cylinder
    const stationBodyGeom = new THREE.CylinderGeometry(0.85, 0.85, 2.6, 24);
    const stationBodyMat = new THREE.MeshStandardMaterial({
      color: 0xd8e2ec,
      metalness: 0.75,
      roughness: 0.35
    });
    const stationBody = new THREE.Mesh(stationBodyGeom, stationBodyMat);
    stationBody.rotation.z = Math.PI / 2;
    stationGroup.add(stationBody);

    // Solar panels on cross-truss
    const solarGeom = new THREE.BoxGeometry(0.04, 1.4, 3.8);
    const solarMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.2,
      metalness: 0.85
    });
    const leftSolar = new THREE.Mesh(solarGeom, solarMat);
    leftSolar.position.set(-2.6, 0, 0);
    stationGroup.add(leftSolar);

    const rightSolar = new THREE.Mesh(solarGeom, solarMat);
    rightSolar.position.set(2.6, 0, 0);
    stationGroup.add(rightSolar);

    // Docking Adapter Port facing the camera
    const portBaseGeom = new THREE.CylinderGeometry(0.55, 0.65, 0.45, 24);
    const portBaseMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.6, roughness: 0.4 });
    const portBase = new THREE.Mesh(portBaseGeom, portBaseMat);
    portBase.rotation.x = Math.PI / 2;
    portBase.position.set(0, 0, 1.0);
    stationGroup.add(portBase);

    // Docking Guide Ring (illuminated with status lights)
    const ringGeom = new THREE.TorusGeometry(0.48, 0.04, 16, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9
    });
    const dockingRing = new THREE.Mesh(ringGeom, ringMat);
    dockingRing.position.set(0, 0, 1.25);
    stationGroup.add(dockingRing);
    dockingRingRef.current = dockingRing;

    // 4 Visual Docking Target Beacons (Top, Bottom, Left, Right)
    const beaconGeom = new THREE.SphereGeometry(0.04, 8, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const beaconPositions = [
      [0, 0.52, 1.25],
      [0, -0.52, 1.25],
      [0.52, 0, 1.25],
      [-0.52, 0, 1.25]
    ];
    beaconPositions.forEach(pos => {
      const beacon = new THREE.Mesh(beaconGeom, beaconMat);
      beacon.position.set(pos[0], pos[1], pos[2]);
      stationGroup.add(beacon);
    });

    // 3D Alignment Crosshairs in space
    const crosshairMat = new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.65 });
    const hPoints = [new THREE.Vector3(-1.2, 0, 1.3), new THREE.Vector3(1.2, 0, 1.3)];
    const vPoints = [new THREE.Vector3(0, -1.2, 1.3), new THREE.Vector3(0, 1.2, 1.3)];
    const hLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(hPoints), crosshairMat);
    const vLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(vPoints), crosshairMat);
    stationGroup.add(hLine);
    stationGroup.add(vLine);

    scene.add(stationGroup);

    // 7. Spaceship «Саюз МС-25» / «Союз МС-25»
    const shipGroup = new THREE.Group();
    shipGroup.position.set(1.2, -1.0, 3.5);

    // Descent module (command capsule - conical sphere)
    const descentGeom = new THREE.CylinderGeometry(0.3, 0.42, 0.55, 16);
    const descentMat = new THREE.MeshStandardMaterial({
      color: 0x334155, // Thermal protective shield
      roughness: 0.6,
      metalness: 0.3
    });
    const descentModule = new THREE.Mesh(descentGeom, descentMat);
    descentModule.rotation.x = Math.PI / 2;
    shipGroup.add(descentModule);

    // Orbital habitation sphere
    const habGeom = new THREE.SphereGeometry(0.36, 16, 16);
    const habMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.3,
      metalness: 0.7
    });
    const habModule = new THREE.Mesh(habGeom, habMat);
    habModule.position.set(0, 0, -0.45);
    shipGroup.add(habModule);

    // Docking Probe Needle
    const probeGeom = new THREE.CylinderGeometry(0.02, 0.04, 0.35, 8);
    const probeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 });
    const probe = new THREE.Mesh(probeGeom, probeMat);
    probe.rotation.x = Math.PI / 2;
    probe.position.set(0, 0, -0.85);
    shipGroup.add(probe);

    // Instrument/Service module
    const serviceGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.65, 16);
    const serviceMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.3 });
    const serviceModule = new THREE.Mesh(serviceGeom, serviceMat);
    serviceModule.rotation.x = Math.PI / 2;
    serviceModule.position.set(0, 0, 0.55);
    shipGroup.add(serviceModule);

    // Ship solar wings (Belarus space agency colors)
    const shipWingGeom = new THREE.BoxGeometry(1.6, 0.02, 0.35);
    const shipWingMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.9, roughness: 0.2 });
    const leftWing = new THREE.Mesh(shipWingGeom, shipWingMat);
    leftWing.position.set(-1.0, 0, 0.6);
    shipGroup.add(leftWing);

    const rightWing = new THREE.Mesh(shipWingGeom, shipWingMat);
    rightWing.position.set(1.0, 0, 0.6);
    shipGroup.add(rightWing);

    // Ship navigation beacon (red & green)
    const portLight = new THREE.PointLight(0xef4444, 1.2, 1.5);
    portLight.position.set(-1.7, 0, 0.6);
    shipGroup.add(portLight);

    const stbdLight = new THREE.PointLight(0x10b981, 1.2, 1.5);
    stbdLight.position.set(1.7, 0, 0.6);
    shipGroup.add(stbdLight);

    // RCS Thrusters particles
    const rcsCount = 60;
    const rcsPos = new Float32Array(rcsCount * 3);
    for (let i = 0; i < rcsCount; i++) {
      rcsPos[i * 3] = (Math.random() - 0.5) * 0.4;
      rcsPos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      rcsPos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    const rcsGeom = new THREE.BufferGeometry();
    rcsGeom.setAttribute('position', new THREE.BufferAttribute(rcsPos, 3));
    const rcsMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.25,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });
    const rcsPoints = new THREE.Points(rcsGeom, rcsMat);
    rcsPoints.position.set(0, 0, 0.7);
    shipGroup.add(rcsPoints);
    thrusterParticlesRef.current = rcsPoints;

    scene.add(shipGroup);
    shipGroupRef.current = shipGroup;

    // 8. Mouse drag orbit controls for free 3D inspection
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      cameraAngleRef.current.yaw = Math.max(-0.6, Math.min(0.6, cameraAngleRef.current.yaw - dx * 0.005));
      cameraAngleRef.current.pitch = Math.max(-0.4, Math.min(0.4, cameraAngleRef.current.pitch - dy * 0.005));
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support for tablets and mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouseRef.current.x;
      const dy = e.touches[0].clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      cameraAngleRef.current.yaw = Math.max(-0.6, Math.min(0.6, cameraAngleRef.current.yaw - dx * 0.006));
      cameraAngleRef.current.pitch = Math.max(-0.4, Math.min(0.4, cameraAngleRef.current.pitch - dy * 0.006));
    };
    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    domEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 10. Animation Loop (60 FPS)
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Slow majestic Earth rotation
      earthMesh.rotation.y = elapsed * 0.03;

      // Pulse docking port lights
      if (dockingRingRef.current) {
        const mat = dockingRingRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.6 + Math.sin(elapsed * 4) * 0.35;
      }

      // Smooth camera interpolation based on drag angle
      const targetCamX = Math.sin(cameraAngleRef.current.yaw) * 9.5;
      const targetCamY = 1.2 + Math.sin(cameraAngleRef.current.pitch) * 4.0;
      const targetCamZ = Math.cos(cameraAngleRef.current.yaw) * 9.5;
      camera.position.x += (targetCamX - camera.position.x) * 0.1;
      camera.position.y += (targetCamY - camera.position.y) * 0.1;
      camera.position.z += (targetCamZ - camera.position.z) * 0.1;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 11. Clean resource cleanup
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();

      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      // Dispose Three.js objects
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
      container.replaceChildren();
    };
  }, []);

  // Update ship position in 3D based on React props (posX, posY)
  useEffect(() => {
    if (!shipGroupRef.current) return;
    const targetX = (posX / 50) * 3.2;
    const targetY = (-posY / 50) * 2.2;
    const targetZ = isAligned ? 1.4 : 3.6; // Approaches station when aligned!

    // Subtle pitch and roll banking during flight
    shipGroupRef.current.position.set(targetX, targetY, targetZ);
    shipGroupRef.current.rotation.z = -(posX / 50) * 0.25;
    shipGroupRef.current.rotation.x = (posY / 50) * 0.2;
  }, [posX, posY, isAligned]);

  // Trigger thruster particle burst when user moves ship
  useEffect(() => {
    if (!thrusterParticlesRef.current || !thrusterActive) return;
    const mat = thrusterParticlesRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.95;

    const timeout = setTimeout(() => {
      mat.opacity = 0.0;
    }, 280);

    return () => clearTimeout(timeout);
  }, [thrusterActive]);

  // Update docking ring color when aligned
  useEffect(() => {
    if (!dockingRingRef.current) return;
    const mat = dockingRingRef.current.material as THREE.MeshBasicMaterial;
    if (isAligned) {
      mat.color.setHex(0x10b981); // Bright Emerald Green
    } else {
      mat.color.setHex(0x06b6d4); // Cyan
    }
  }, [isAligned]);

  if (!webglSupported) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-4 text-center">
        <p className="text-xs font-mono">{language === 'by' ? 'Рэжым 3D недаступны на гэтай прыладзе.' : 'Режим 3D недоступен на этом устройстве.'}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden select-none cursor-grab active:cursor-grabbing">
      <div ref={containerRef} className="w-full h-full" />

      {/* Subtle 3D Navigation Hint */}
      <div className="absolute top-3 right-3 pointer-events-none px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs border border-white/20 text-[10px] font-mono text-cyan-300">
        <span>{language === 'by' ? '3D Агляд: рухайце мышкай' : '3D Обзор: вращайте мышью'}</span>
      </div>
    </div>
  );
};
