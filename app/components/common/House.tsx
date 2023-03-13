import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function House(props: any) {
  const group: any = useRef();
  const { nodes, materials }: any = useGLTF("/assets/house.gltf");

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.001;
  });
  return (
    <group
      ref={group}
      rotation={[0, -Math.PI + 0.01 / 5000, 0]}
      {...props}
      dispose={null}
    >
      <group name="Scene">
        <group name="House" position={[0, 1.02, 2.59]}>
          <mesh
            name="Cube001"
            geometry={nodes.Cube001.geometry}
            material={materials.Roof}
          />
          <mesh
            name="Cube001_1"
            geometry={nodes.Cube001_1.geometry}
            material={materials.Wall}
          />
          <mesh
            name="Cube001_2"
            geometry={nodes.Cube001_2.geometry}
            material={materials.Wood}
          />
          <mesh
            name="Cube001_3"
            geometry={nodes.Cube001_3.geometry}
            material={materials["Patio floor"]}
          />
          <mesh
            name="Cube001_4"
            geometry={nodes.Cube001_4.geometry}
            material={materials.Windows}
          />
          <mesh
            name="Cube001_5"
            geometry={nodes.Cube001_5.geometry}
            material={materials.Door}
          />
          <mesh
            name="Cube001_6"
            geometry={nodes.Cube001_6.geometry}
            material={materials["Room floor"]}
          />
          <mesh
            name="Cube001_7"
            geometry={nodes.Cube001_7.geometry}
            material={materials["Room wall"]}
          />
          <mesh
            name="Cube001_8"
            geometry={nodes.Cube001_8.geometry}
            material={materials["Room celing"]}
          />
          <mesh
            name="Cube001_9"
            geometry={nodes.Cube001_9.geometry}
            material={materials.Planks}
          />
        </group>
        <mesh
          name="Ladder"
          geometry={nodes.Ladder.geometry}
          material={nodes.Ladder.material}
          position={[0.65, 0, -2.54]}
          rotation={[-0.03, -0.07, 0.23]}
          scale={0.03}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/house.gltf");
