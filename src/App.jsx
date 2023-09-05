import { useEffect, useState } from 'react';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function App() {
  useEffect(() => {
// 创建场景
    const scene = new THREE.Scene();

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
    45, // 视角范围
    window.innerWidth/window.innerHeight, //相机宽高
    0.1,  // 最近平面
    1000, // 最远平面
    );
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 创建几何体
    const geometry = new THREE.BoxGeometry(1,1,1);
    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // 创建网格
    const cube = new THREE.Mesh(geometry, material);

    // 将网格添加到场景中
    scene.add(cube);

    // 添加世界坐标辅助器
    const axesHelper = new THREE.AxesHelper(5);

    // 设置相机位置
    camera.position.y = 3;
    camera.position.x = 2;
    camera.position.z = 5;
    camera.lookAt(0,0,0);

    // 加入到场景中
    scene.add(axesHelper);

    // 添加轨道控制器
    // const orbitControls = new OrbitControls(camera, renderer.domElement);
    const orbitControls = new OrbitControls(camera, document.body);
    // 开启阻尼器
    orbitControls.enableDamping = true;
    // 设置阻尼系数
    orbitControls.dampingFactor = 0.05;
    // 设置自动旋转
    orbitControls.autoRotate = true;

      function animate () {
        requestAnimationFrame(animate);
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        orbitControls.update();
        // 渲染
        renderer.render(scene, camera);
      }
      animate();
  }, []);

  return (
    <>
    </>
  )
}

export default App
