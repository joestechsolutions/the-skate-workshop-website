'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingParticles({ count = 100 }) {
    const mesh = useRef<THREE.InstancedMesh>(null)
    const light = useRef<THREE.PointLight>(null)

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])

    const dummy = useMemo(() => new THREE.Object3D(), [])

    useFrame(() => {
        particles.forEach((particle, i) => {
            const { factor, speed, xFactor, yFactor, zFactor } = particle
            const t = (particle.t += speed / 2)
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)
            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            dummy.scale.set(s, s, s)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()
            mesh.current?.setMatrixAt(i, dummy.matrix)
        })
        mesh.current!.instanceMatrix.needsUpdate = true
    })

    return (
        <>
            <pointLight ref={light} distance={40} intensity={8} color="#FC4C02" />
            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <dodecahedronGeometry args={[0.2, 0]} />
                <meshStandardMaterial color="#FC4C02" roughness={0.5} />
            </instancedMesh>
        </>
    )
}

function FloatingCore() {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh>
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                <MeshDistortMaterial
                    color="#00D9FF"
                    speed={2}
                    distort={0.4}
                    radius={1}
                />
            </mesh>
        </Float>
    )
}

export default function ThreeScene() {
    return (
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
            <Canvas shadows camera={{ position: [0, 0, 15], fov: 60 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00D9FF" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#FC4C02" />
                <FloatingParticles count={50} />
                <FloatingCore />
                <Environment preset="night" />
            </Canvas>
        </div>
    )
}
