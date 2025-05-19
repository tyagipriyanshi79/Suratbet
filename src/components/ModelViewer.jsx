import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef, Suspense } from "react";
import * as THREE from "three";

const Model = ({ url }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const mixer = useRef();

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        mixer.current.clipAction(clip, group.current).play();
      });
    }

    // Optional: Center the model if it looks off
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [animations, scene]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return (
    <group ref={group} position={[0, -1, 0]}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
};

const ModelViewer = ({ frameRef, handleMouseMove, handleMouseLeave }) => {
  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3] lg:aspect-[16/9] rounded-xl overflow-hidden"
      style={{ perspective: 800 }}
    >
      <Canvas camera={{ position: [0, 1, 5], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <Model url="/models/boss.glb" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enableRotate={false}   // disable rotation by mouse
          enablePan={false}      // disable panning
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;