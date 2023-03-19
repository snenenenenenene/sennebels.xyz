"use client";

import { useGLTF } from "@react-three/drei";

export function Model(props: any) {
  const { nodes, materials }: any = useGLTF("/assets/pangolin.gltf");

  return (
    <group {...props} dispose={null}>
      <group position={[0, 19.75, 0]} scale={6.68}>
        <mesh
          geometry={nodes.Cube001.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          geometry={nodes.Cube001_1.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          geometry={nodes.Cube001_2.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          geometry={nodes.Cube001_3.geometry}
          material={materials["Material.005"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/pangolin.glb");
