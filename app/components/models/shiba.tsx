"use client"

import { useRef, Suspense } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
	nodes: {
		Object_4: THREE.SkinnedMesh
		Object_6: THREE.SkinnedMesh
		Object_8: THREE.SkinnedMesh
		Object_10: THREE.SkinnedMesh
		Object_12: THREE.SkinnedMesh
		_rootJoint: THREE.Bone
	}
	materials: {
		Material: THREE.MeshStandardMaterial
		Material_1: THREE.MeshStandardMaterial
		Material_2: THREE.MeshStandardMaterial
		Material_3: THREE.MeshStandardMaterial
		Material_4: THREE.MeshStandardMaterial
	}
}

function ShibaModel(props: JSX.IntrinsicElements['group']) {
	const group = useRef<THREE.Group>()
	const { scene } = useGLTF("/models/shiba/scene.gltf")

	// Clone and scale the scene
	const scaledScene = scene.clone()
	scaledScene.scale.set(4, 4, 4)

	// Add subtle animation
	useFrame((state) => {
		if (group.current) {
			// Smoother rotation
			group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15 + (props.rotation?.[1] || 0);
			// Gentler floating motion
			group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05 + (props.position?.[1] || 0);
		}
	})

	return (
		<group ref={group} {...props}>
			<primitive object={scaledScene} />
		</group>
	)
}

// Wrap the model in Suspense and export
export function Model(props: JSX.IntrinsicElements['group']) {
	return (
		<Suspense fallback={null}>
			<ShibaModel {...props} />
		</Suspense>
	)
}

// Preload the model with the correct path
useGLTF.preload("/models/shiba/scene.gltf")