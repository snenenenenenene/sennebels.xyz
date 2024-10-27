import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'


export function Model(props) {
  const { nodes, materials } = useGLTF('/models/desk.glb')


  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.trestle.geometry}
        material={materials.Trestle}
        position={[0, 0, 0.392]}
        scale={0.216}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.trestle001.geometry}
        material={materials.Trestle}
        position={[0, 0, 15.556]}
        scale={0.216}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials['Desk Top']}
        position={[0, 8.335, 8.009]}
        scale={[4.464, 0.114, 9.032]}
      />
    </group>
  )
}

useGLTF.preload('/models/desk.glb')
