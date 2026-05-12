'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// 8 currency nodes — each gets its own orbital plane and initial phase
const NODES = [
    { r: 2.3, spd: 0.38, inc: 0.20, phase: 0.00, color: 0x2563EB, em: 0.6, sz: 0.13 },  // USDC
    { r: 2.9, spd: 0.27, inc: -0.45, phase: 0.78, color: 0x059669, em: 0.5, sz: 0.12 },  // USDT
    { r: 2.6, spd: 0.50, inc: 0.62, phase: 1.57, color: 0xB45309, em: 0.5, sz: 0.14 },   // mVND
    { r: 3.2, spd: 0.21, inc: -0.28, phase: 2.36, color: 0x64748B, em: 0.4, sz: 0.11 },  // mUSD
    { r: 2.1, spd: 0.58, inc: 0.80, phase: 3.14, color: 0x2563EB, em: 0.6, sz: 0.10 },   // EURC
    { r: 3.5, spd: 0.17, inc: -0.60, phase: 3.93, color: 0x059669, em: 0.5, sz: 0.13 },  // mEUR
    { r: 2.8, spd: 0.43, inc: 0.35, phase: 4.71, color: 0xB45309, em: 0.4, sz: 0.09 },   // mKES
    { r: 1.9, spd: 0.65, inc: -0.72, phase: 5.50, color: 0x64748B, em: 0.4, sz: 0.10 },  // misc
];

// Scroll state config
const SCROLL_STATES = [
    { hubEm: 0.5, nodeEm: 0.55, tubeOp: 0.18, bgOp: 0.30, spd: 0.55 }, // Hero
    { hubEm: 0.9, nodeEm: 0.80, tubeOp: 0.50, bgOp: 0.50, spd: 1.10 }, // Gas
    { hubEm: 0.7, nodeEm: 0.65, tubeOp: 0.65, bgOp: 0.40, spd: 0.80 }, // Gateway
    { hubEm: 1.1, nodeEm: 0.90, tubeOp: 0.80, bgOp: 0.55, spd: 1.40 }, // Netting
    { hubEm: 1.5, nodeEm: 0.40, tubeOp: 0.08, bgOp: 0.20, spd: 4.50 }, // EVM
];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function smooth(t: number) { return t * t * (3 - 2 * t); }

export function ThreeBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const el = canvasRef.current;

        // ── Renderer ──────────────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.4;
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
        camera.position.set(0, 0.8, 9);
        camera.lookAt(0, 0, 0);

        // ── Lighting ──────────────────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0xffffff, 0.9));

        const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
        keyLight.position.set(4, 6, 5);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0x2563EB, 4.5);
        fillLight.position.set(-5, 1, 3);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xB45309, 2.0);
        rimLight.position.set(1, -4, -3);
        scene.add(rimLight);

        const hubLight = new THREE.PointLight(0x2563EB, 4.0, 6.0);
        scene.add(hubLight);

        // ── Central Hub ───────────────────────────────────────────────────────
        const hubGroup = new THREE.Group();
        scene.add(hubGroup);

        // Outermost halo — large ghostly sphere, BackSide for inner-glow feel
        const haloMat = new THREE.MeshBasicMaterial({
            color: 0x2563EB, transparent: true, opacity: 0.04, side: THREE.BackSide,
        });
        hubGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.55, 24, 24), haloMat));

        // Mid halo layer — slightly less opaque front-face
        const halo2Mat = new THREE.MeshBasicMaterial({
            color: 0x93C5FD, transparent: true, opacity: 0.035,
        });
        hubGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.32, 20, 20), halo2Mat));

        // Outer lattice (level-1 icosahedron) — large visible wireframe
        const latticeOuter = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.08, 1));
        const latticeMat = new THREE.LineBasicMaterial({
            color: 0x2563EB, transparent: true, opacity: 0.40,
        });
        hubGroup.add(new THREE.LineSegments(latticeOuter, latticeMat));

        // Inner lattice (level-2, smaller) — denser grid, slightly less opaque
        const latticeInner = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.75, 1));
        const latticeMat2 = new THREE.LineBasicMaterial({
            color: 0x60A5FA, transparent: true, opacity: 0.25,
        });
        hubGroup.add(new THREE.LineSegments(latticeInner, latticeMat2));

        // Core: bright emissive sphere — the "settlement engine" glow
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x3B82F6,
            emissiveIntensity: 0.5,
            roughness: 0.15,
            metalness: 0.1,
        });
        const coreMesh = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 20), coreMat);
        hubGroup.add(coreMesh);

        // ── Orbital nodes + curved tube connections ───────────────────────────
        const nodeGroups: THREE.Group[] = [];
        const nodeMeshes: THREE.Mesh[] = [];
        const tubeMeshes: THREE.Mesh[] = [];

        NODES.forEach((def) => {
            const orbitGroup = new THREE.Group();
            orbitGroup.rotation.x = def.inc;
            // Initial phase spread — evenly distributed so nodes encircle the hub
            orbitGroup.rotation.y = def.phase;
            scene.add(orbitGroup);
            nodeGroups.push(orbitGroup);

            // Node sphere
            const mat = new THREE.MeshStandardMaterial({
                color: def.color,
                metalness: 0.85,
                roughness: 0.18,
                emissive: def.color,
                emissiveIntensity: def.em,
            });
            const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(def.sz, 1), mat);
            mesh.position.x = def.r;
            orbitGroup.add(mesh);
            nodeMeshes.push(mesh);

            // Curved tube connection: arc from origin to node position with a slight outward bow
            const nodePos = new THREE.Vector3(def.r, 0, 0);
            const midPos = nodePos.clone().multiplyScalar(0.5).add(
                new THREE.Vector3(0, nodePos.length() * 0.12, 0)
            );
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                midPos,
                nodePos,
            ]);
            const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.014, 5, false);
            const tubeMat = new THREE.MeshStandardMaterial({
                color: def.color,
                emissive: def.color,
                emissiveIntensity: 0.3,
                metalness: 0.0,
                roughness: 1.0,
                transparent: true,
                opacity: 0.18,
            });
            const tube = new THREE.Mesh(tubeGeo, tubeMat);
            orbitGroup.add(tube);
            tubeMeshes.push(tube);
        });

        // ── Flow particles along tubes ─────────────────────────────────────────
        // For each node: 8 small dots travelling from hub to node along the curve
        const FLOW_COUNT = 8;
        type FlowItem = { group: THREE.Group; points: THREE.Points; curve: THREE.CatmullRomCurve3 };
        const flows: FlowItem[] = [];

        NODES.forEach((def, i) => {
            const group = new THREE.Group();
            group.rotation.x = nodeGroups[i].rotation.x;
            group.rotation.y = nodeGroups[i].rotation.y;
            scene.add(group);

            const nodePos = new THREE.Vector3(def.r, 0, 0);
            const midPos = nodePos.clone().multiplyScalar(0.5).add(
                new THREE.Vector3(0, nodePos.length() * 0.12, 0)
            );
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0), midPos, nodePos,
            ]);

            const pos = new Float32Array(FLOW_COUNT * 3);
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            const mat = new THREE.PointsMaterial({
                color: def.color,
                size: 0.055,
                transparent: true,
                opacity: 0.0,
                sizeAttenuation: true,
            });
            const pts = new THREE.Points(geo, mat);
            group.add(pts);
            flows.push({ group, points: pts, curve });
        });

        // ── Decorative orbital guide rings ─────────────────────────────────────
        const ringGroup = new THREE.Group();
        scene.add(ringGroup);

        type RingDef = [number, number, number, number, number, number];
        const RING_DEFS: RingDef[] = [
            [2.55, 0.006, 0x2563EB, 0.12, Math.PI / 2, 0],
            [3.60, 0.004, 0x94A3B8, 0.07, Math.PI / 3, Math.PI / 6],
            [1.65, 0.005, 0xB45309, 0.09, Math.PI / 7, Math.PI / 4],
        ];
        const ringMeshes: THREE.Mesh[] = [];
        RING_DEFS.forEach(([r, tube, col, op, rx, ry]) => {
            const geo = new THREE.TorusGeometry(r, tube, 3, 160);
            const mat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op });
            const ring = new THREE.Mesh(geo, mat);
            ring.rotation.x = rx;
            ring.rotation.y = ry;
            ringGroup.add(ring);
            ringMeshes.push(ring);
        });

        // ── Background dust field ──────────────────────────────────────────────
        const DUST_COUNT = 2200;
        const dustPos = new Float32Array(DUST_COUNT * 3);
        for (let i = 0; i < DUST_COUNT; i++) {
            const r = 5 + Math.random() * 9;
            const th = Math.random() * Math.PI * 2;
            const ph = Math.acos(2 * Math.random() - 1);
            dustPos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
            dustPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
            dustPos[i * 3 + 2] = r * Math.cos(ph);
        }
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
        const dustMat = new THREE.PointsMaterial({
            color: 0x94A3B8, size: 0.018, transparent: true, opacity: 0.30, sizeAttenuation: true,
        });
        const dust = new THREE.Points(dustGeo, dustMat);
        scene.add(dust);

        // ── Input & resize ─────────────────────────────────────────────────────
        let tScroll = 0, cScroll = 0;
        let tMX = 0, tMY = 0, cMX = 0, cMY = 0;

        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            tScroll = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        const onMouse = (e: MouseEvent) => {
            const parent = el.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            tMX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
            tMY = -((e.clientY - rect.top)  / rect.height - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouse);

        const onResize = () => {
            const parent = el.parentElement;
            if (!parent) return;
            const w = parent.clientWidth, h = parent.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', onResize);
        onResize();

        // ── Render loop ───────────────────────────────────────────────────────
        let time = 0, rafId = 0;
        const flowPhaseOffset = NODES.map((_, i) => i / NODES.length);

        const tick = () => {
            rafId = requestAnimationFrame(tick);
            time += 0.016;

            cScroll += (tScroll - cScroll) * 0.055;
            cMX     += (tMX - cMX) * 0.04;
            cMY     += (tMY - cMY) * 0.04;

            // Interpolate scroll state
            const sf = cScroll * (SCROLL_STATES.length - 1);
            const si = Math.min(Math.floor(sf), SCROLL_STATES.length - 2);
            const st = smooth(sf - si);
            const S1 = SCROLL_STATES[si], S2 = SCROLL_STATES[si + 1];

            const spd     = lerp(S1.spd,    S2.spd,    st);
            const tubeOp  = lerp(S1.tubeOp, S2.tubeOp, st);
            const bgOp    = lerp(S1.bgOp,   S2.bgOp,   st);
            const hubEm   = lerp(S1.hubEm,  S2.hubEm,  st);
            const nodeEm  = lerp(S1.nodeEm, S2.nodeEm, st);

            // Hub
            hubGroup.rotation.y = time * 0.12 * spd;
            hubGroup.rotation.x = time * 0.07 * spd;
            coreMat.emissiveIntensity = hubEm;
            latticeMat.opacity = 0.20 + hubEm * 0.40;
            hubLight.intensity = hubEm * 5.0;
            const pulse = 1 + Math.sin(time * 1.8) * 0.022;
            hubGroup.scale.setScalar(pulse);

            // Nodes + tubes + flow
            NODES.forEach((def, i) => {
                // Orbit
                nodeGroups[i].rotation.y = def.phase + time * def.spd * spd;

                // Node emissive
                (nodeMeshes[i].material as THREE.MeshStandardMaterial).emissiveIntensity =
                    nodeEm + Math.sin(time * 2.5 + i * 0.8) * 0.08;

                // Node scale micro-pulse
                const ns = 1 + Math.sin(time * 3.0 + i * 1.1) * 0.04;
                nodeMeshes[i].scale.setScalar(ns);

                // Tube opacity
                (tubeMeshes[i].material as THREE.MeshStandardMaterial).opacity = tubeOp;

                // Flow group matches orbit
                flows[i].group.rotation.x = nodeGroups[i].rotation.x;
                flows[i].group.rotation.y = nodeGroups[i].rotation.y;

                // Advance flow particles along curve
                const flowPos = (flows[i].points.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
                for (let k = 0; k < FLOW_COUNT; k++) {
                    // Each particle has its own phase, moving from 0→1 along the curve
                    const t01 = ((time * 0.5 * spd + flowPhaseOffset[i] + k / FLOW_COUNT) % 1.0);
                    const pt = flows[i].curve.getPoint(t01);
                    flowPos[k * 3]     = pt.x;
                    flowPos[k * 3 + 1] = pt.y;
                    flowPos[k * 3 + 2] = pt.z;
                }
                flows[i].points.geometry.attributes.position.needsUpdate = true;
                (flows[i].points.material as THREE.PointsMaterial).opacity = tubeOp * 0.8;
            });

            // Orbital rings drift
            ringGroup.rotation.y += 0.0012 * spd;
            ringMeshes.forEach((r, i) => {
                (r.material as THREE.MeshBasicMaterial).opacity =
                    RING_DEFS[i][3] * (0.6 + tubeOp * 0.5);
            });

            // Dust field
            dust.rotation.y += 0.00015;
            dustMat.opacity = bgOp * 0.35;

            // Mouse parallax on whole scene
            scene.rotation.y += (cMX * 0.10 - scene.rotation.y) * 0.022;
            scene.rotation.x += (cMY * 0.07 - scene.rotation.x) * 0.022;

            renderer.render(scene, camera);
        };
        tick();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('mousemove', onMouse);
            window.removeEventListener('resize', onResize);
            scene.traverse((obj: any) => {
                if (obj.geometry) obj.geometry.dispose();
                if (obj.material) {
                    if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
                    else obj.material.dispose();
                }
            });
            renderer.dispose();
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full block" aria-hidden="true" />
        </div>
    );
}
