import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const COLORS = {
  bg: 0xffffff,
  brand: 0x0F172A,
  brandLight: 0x2563EB,
  gold: 0xB45309,
  silver: 0x94A3B8,
};

const STATES_COUNT = 5;

function smoothstep(t: number) {
    return t * t * (3 - 2 * t);
}

// Configuration for each scroll section
const STATE_CONFIGS = [
    // 0: Hero (Unified sleek lens)
    {
        rx: [0, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2],
        rz: [0, 0, 0, 0, 0],
        py: [0, 0.25, -0.25, 0, 0],
        scale: [1, 1, 1, 1, 1],
        grX: Math.PI / 6,
        grY: -Math.PI / 4,
        speed: 0.5,
    },
    // 1: Gas (Separated layers)
    {
        rx: [0, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2],
        rz: [0, 0, 0, 0, 0],
        py: [0.5, 1.3, -0.3, -1.0, -1.5],
        scale: [1, 1, 1, 0.8, 0.6],
        grX: Math.PI / 2 - 0.2, 
        grY: 0,
        speed: 1.0,
    },
    // 2: Gateway (Funnel structure)
    {
        rx: [0, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2],
        rz: [0, 0, 0, 0, 0],
        py: [0, 1.0, 0.5, 1.5, 2.0],
        scale: [0.8, 1.2, 1.0, 1.4, 1.6],
        grX: Math.PI / 3,
        grY: Math.PI / 4,
        speed: 0.5,
    },
    // 3: Netting (Gyroscopic intersection)
    {
        rx: [Math.PI/2, 0, Math.PI, Math.PI/4, -Math.PI/4], 
        rz: [0, Math.PI/2, -Math.PI/2, 0, Math.PI/4],
        py: [0, 0, 0, 0, 0],
        scale: [1, 1, 1, 1, 1],
        grX: 0,
        grY: 0,
        speed: 1.5,
    },
    // 4: EVM (Flat edge, rapid spin)
    {
        rx: [0, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2],
        rz: [0, 0, 0, 0, 0],
        py: [0, 0.25, -0.25, 0, 0],
        scale: [1, 1, 1, 1, 1],
        grX: Math.PI / 2 - 0.05, 
        grY: 0,
        speed: 12.0, 
    }
];

export function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(COLORS.bg, 0.03);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / 2 / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Advanced Lighting for luxury metallic & glass reflection
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(2, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(COLORS.brandLight, 3.0);
    dirLight2.position.set(-5, -2, 2);
    scene.add(dirLight2);
    
    const dirLight3 = new THREE.DirectionalLight(COLORS.gold, 2.0);
    dirLight3.position.set(4, -3, -2);
    scene.add(dirLight3);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // High-end Materials
    const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.0,
        transmission: 1.0,  // Pure glass property
        thickness: 1.5,
        ior: 1.5,
        side: THREE.DoubleSide,
    });

    const metalMat = new THREE.MeshStandardMaterial({
        color: COLORS.gold,
        metalness: 1.0,
        roughness: 0.15,
        side: THREE.DoubleSide
    });

    const darkMetalMat = new THREE.MeshStandardMaterial({
        color: COLORS.brand,
        metalness: 0.9,
        roughness: 0.2,
        side: THREE.DoubleSide
    });

    const silverMat = new THREE.MeshStandardMaterial({
        color: COLORS.silver,
        metalness: 1.0,
        roughness: 0.1,
        side: THREE.DoubleSide
    });

    // Architecture: 6 Layers of a high-tech "Lens" / Settlement Engine
    const compGroups: THREE.Group[] = [];
    const compMeshes: THREE.Mesh[] = [];

    const createComp = (geo: THREE.BufferGeometry, mat: THREE.Material) => {
        const group = new THREE.Group();
        const mesh = new THREE.Mesh(geo, mat);
        group.add(mesh);
        rootGroup.add(group);
        compGroups.push(group);
        compMeshes.push(mesh);
    };

    // 0: Glass Body (Main thick lens)
    createComp(new THREE.CylinderGeometry(1.6, 1.6, 0.5, 64), glassMat);

    // 1: Ring Top (Dark Metal rim)
    createComp(new THREE.TorusGeometry(1.6, 0.06, 32, 128), darkMetalMat);

    // 2: Ring Bottom (Dark Metal rim)
    createComp(new THREE.TorusGeometry(1.6, 0.06, 32, 128), darkMetalMat);

    // 3: Halo 1 (Silver thin ring)
    createComp(new THREE.TorusGeometry(2.1, 0.015, 16, 128), silverMat);

    // 4: Halo 2 (Outer thin ring)
    createComp(new THREE.TorusGeometry(2.4, 0.01, 16, 128), silverMat);

    const innerGlow = new THREE.PointLight(COLORS.gold, 3.0, 5.0);
    rootGroup.add(innerGlow);

    // Scroll tracking
    let targetScrollY = 0;
    const onScroll = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if(maxScroll > 0) {
            targetScrollY = Math.max(0, Math.min(1, window.scrollY / maxScroll));
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
        const container = canvas.parentElement;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right) {
            mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        }
    };
    window.addEventListener('mousemove', onMouseMove);

    const handleResize = () => {
        const container = canvas.parentElement;
        if (container) {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            
            // Shift the 3D object slightly to the right on larger screens
            if (window.innerWidth > 1024) {
                rootGroup.position.x = 1.0;
            } else {
                rootGroup.position.x = 0;
            }
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    let currentScrollSync = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentSpin = 0;
    
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let frame = 0;
    const render = () => {
        frame = requestAnimationFrame(render);

        currentScrollSync += (targetScrollY - currentScrollSync) * 0.08;
        targetParallaxX += (mouseX * 0.2 - targetParallaxX) * 0.05;
        targetParallaxY += (mouseY * 0.2 - targetParallaxY) * 0.05;

        const stateFloat = currentScrollSync * (STATES_COUNT - 1);
        const idx = Math.min(Math.floor(stateFloat), STATES_COUNT - 2);
        const t = smoothstep(stateFloat - idx);

        const s1 = STATE_CONFIGS[idx];
        const s2 = STATE_CONFIGS[idx + 1];

        // Ensure variables seamlessly interpolate
        const speed = lerp(s1.speed, s2.speed, t);
        const grX = lerp(s1.grX, s2.grX, t);
        const grY = lerp(s1.grY, s2.grY, t);

        currentSpin += speed * 0.016;

        rootGroup.rotation.x = grX - targetParallaxY;
        rootGroup.rotation.y = grY + targetParallaxX;

        compGroups.forEach((group, i) => {
            const trX = lerp(s1.rx[i], s2.rx[i], t);
            const trZ = lerp(s1.rz[i], s2.rz[i], t);
            const tY = lerp(s1.py[i], s2.py[i], t);
            const scale = lerp(s1.scale[i], s2.scale[i], t);

            // Interpolate target orientation securely
            group.rotation.x += (trX - group.rotation.x) * 0.1;
            group.rotation.z += (trZ - group.rotation.z) * 0.1;
            group.position.y += (tY - group.position.y) * 0.1;
            
            group.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);

            // Continuous spin of the mesh inside
            const dir = i % 2 === 0 ? 1 : -1;
            if (i === 0) {
                compMeshes[i].rotation.y = currentSpin * dir; // Local Y for Sphere/Cylinder
            } else {
                compMeshes[i].rotation.z = currentSpin * dir; // Local Z for Torus rotated PI/2 on X
            }
        });

        // Gateway slight camera adjustment to view funnel better
        const targetCamY = (idx === 2 ? 1 : 0) * t; 
        camera.position.y += (targetCamY - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    };
    render();

    return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', handleResize);
        
        scene.traverse((object: any) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) object.material.forEach((m: any) => m.dispose());
                else object.material.dispose();
            }
        });
        renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-[100vh] z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" aria-hidden="true" />
    </div>
  );
}
