import React, { useEffect } from "react";
import * as THREE from "three";
import "./index.css";

function App() {
  useEffect(() => {
    // Création de la scène
    const scene = new THREE.Scene();
    // Création de la caméra
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setAnimationLoop(animate);
    renderer.setClearColor(0x000000);

    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 10000;
    const starsPosition = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i++) {
      starsPosition[i * 3] = (Math.random() - 0.5) * 950;
      starsPosition[i * 3 + 1] = (Math.random() - 0.5) * 950;
      starsPosition[i * 3 + 2] = (Math.random() - 0.5) * 950;
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starsPosition, 3)
    );

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const geometry = new THREE.SphereGeometry(15, 32, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x00008B});
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    camera.position.z = 50;

    function animate() {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;

      stars.rotation.y += 0.00001;
      stars.rotation.x += 0.00001;
      stars.rotation.z += 0.00001;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      document.body.appendChild(renderer.domElement);
    };
  }, []);

  return null;
}

export default App;
