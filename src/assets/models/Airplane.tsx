/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Marine (https://sketchfab.com/rd.deleon26)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/boeing757-4e3746d125084a87ac61ec3831ea5a79
Title: Boeing757
*/

import * as THREE from "three";
// import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
    Object_3: THREE.Mesh;
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_7: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_9: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_11: THREE.Mesh;
    Object_12: THREE.Mesh;
    Object_13: THREE.Mesh;
    Object_14: THREE.Mesh;
  };
  materials: {
    ArchM73_Engine_B: THREE.MeshStandardMaterial;
    Material__123: THREE.MeshStandardMaterial;
    Material__124: THREE.MeshStandardMaterial;
    Material__127: THREE.MeshStandardMaterial;
    Material__1270: THREE.MeshStandardMaterial;
    Material__128: THREE.MeshStandardMaterial;
    Material__1280: THREE.MeshStandardMaterial;
    Material__129: THREE.MeshStandardMaterial;
    Material__130: THREE.MeshStandardMaterial;
    Material__132: THREE.MeshStandardMaterial;
    Material__133: THREE.MeshStandardMaterial;
    Material__25: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(process.env.VITE_PUBLIC + '/aircraft.gltf') as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: "Sketchfab_model" }}
        >
          <group
            name="Boeing757objcleanermaterialmergergles"
            userData={{ name: "Boeing757.obj.cleaner.materialmerger.gles" }}
          >
            <mesh
              name="Object_2"
              castShadow
              receiveShadow
              geometry={nodes.Object_2.geometry}
              material={materials.ArchM73_Engine_B}
              userData={{ name: "Object_2" }}
            />
            <mesh
              name="Object_3"
              castShadow
              receiveShadow
              geometry={nodes.Object_3.geometry}
              material={materials.Material__123}
              userData={{ name: "Object_3" }}
            />
            <mesh
              name="Object_4"
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.Material__123}
              userData={{ name: "Object_4" }}
            />
            <mesh
              name="Object_5"
              castShadow
              receiveShadow
              geometry={nodes.Object_5.geometry}
              material={materials.Material__124}
              userData={{ name: "Object_5" }}
            />
            <mesh
              name="Object_6"
              castShadow
              receiveShadow
              geometry={nodes.Object_6.geometry}
              material={materials.Material__127}
              userData={{ name: "Object_6" }}
            />
            <mesh
              name="Object_7"
              castShadow
              receiveShadow
              geometry={nodes.Object_7.geometry}
              material={materials.Material__1270}
              userData={{ name: "Object_7" }}
            />
            <mesh
              name="Object_8"
              castShadow
              receiveShadow
              geometry={nodes.Object_8.geometry}
              material={materials.Material__128}
              userData={{ name: "Object_8" }}
            />
            <mesh
              name="Object_9"
              castShadow
              receiveShadow
              geometry={nodes.Object_9.geometry}
              material={materials.Material__1280}
              userData={{ name: "Object_9" }}
            />
            <mesh
              name="Object_10"
              castShadow
              receiveShadow
              geometry={nodes.Object_10.geometry}
              material={materials.Material__129}
              userData={{ name: "Object_10" }}
            />
            <mesh
              name="Object_11"
              castShadow
              receiveShadow
              geometry={nodes.Object_11.geometry}
              material={materials.Material__130}
              userData={{ name: "Object_11" }}
            />
            <mesh
              name="Object_12"
              castShadow
              receiveShadow
              geometry={nodes.Object_12.geometry}
              material={materials.Material__132}
              userData={{ name: "Object_12" }}
            />
            <mesh
              name="Object_13"
              castShadow
              receiveShadow
              geometry={nodes.Object_13.geometry}
              material={materials.Material__133}
              userData={{ name: "Object_13" }}
            />
            <mesh
              name="Object_14"
              castShadow
              receiveShadow
              geometry={nodes.Object_14.geometry}
              material={materials.Material__25}
              userData={{ name: "Object_14" }}
            />
          </group>
        </group>
      </group>
    </group>
  );
}
useGLTF.preload(process.env.VITE_PUBLIC + '/aircraft.gltf')
