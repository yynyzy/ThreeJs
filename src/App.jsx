import { createElement, useEffect, useState } from 'react';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { render } from 'react-dom';

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
    const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    // 创建网格
    const cube = new THREE.Mesh(geometry, material);
    // 创建父网格
    const parentCube = new THREE.Mesh(geometry, parentMaterial)
    parentCube.add(cube);

    // 设置相机位置
    camera.position.y = 3;
    camera.position.x = 2;
    camera.position.z = 5;
    camera.lookAt(0,0,0);

    cube.position.set(3, 0 , 0);
    // 设置父元素场景
    parentCube.position.set(-3, 0, 0); // 局部控制，元素的定位是相对于父元素的
    parentCube.scale.set(2, 2, 2); // 局部控制，控制物体的放大和缩小，父元素放大，子元素也会相应放大
    cube.scale.set(2, 2, 2);

    cube.rotation.x = Math.PI/4;
    parentCube.rotation.x = Math.PI/4; // 局部控制，控制物体的旋转，父元素旋转，子元素也会相应旋转
    // 将网格添加到场景中
    // scene.add(cube);
    scene.add(parentCube);


    // 添加世界坐标辅助器
    const axesHelper = new THREE.AxesHelper(5);
    // 加入到场景中
        scene.add(axesHelper);

    // 添加轨道控制器
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    // const orbitControls = new OrbitControls(camera, document.body); //会影响对事件的监听
    // 开启阻尼器
    orbitControls.enableDamping = true;
    // 设置阻尼系数
    orbitControls.dampingFactor = 0.05;
    // 设置自动旋转
    orbitControls.autoRotate = true;

    function animate () {
      orbitControls.update();
      requestAnimationFrame(animate);
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      // 渲染
      renderer.render(scene, camera);
    }
    animate();

    // 监听窗口变化
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix;
    })

      const button = document.createElement('button');
      button.innerHTML = '点击全屏'
      button.style.position = 'absolute';
      button.style.left = '10px';
      button.style.top = '10px';
      button.style.zIndex = '999';
      button.onclick = function () {
        renderer.domElement.requestFullScreen();
        console.log('全屏');
      };
      document.body.appendChild(button);

      const button1 = document.createElement('button');
      button1.innerHTML = '退出全屏'
      button1.style.position = 'absolute';
      button1.style.left = '100px';
      button1.style.top = '10px';
      button1.style.zIndex = '999';
      button1.onclick = () => {
        document.exitFullscreen();
        console.log('退出全屏');
      };
      document.body.appendChild(button1);

  }, []);


  return (
    <>
    </>
  )
}

// 监听窗口变化



export default App
