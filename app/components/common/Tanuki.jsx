import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/assets/tanuki.gltf");
  return (
    <group {...props} dispose={null}>
      <group position={[0, 1.33, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Cylinder_1.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Cylinder_2.geometry}
          material={materials["Material.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/assets/tanuki.gltf");
