import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.177.0/examples/jsm/controls/OrbitControls.js";

const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  2000
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(25, 25, 150, 150);

const planeMaterial = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide,
  flatShading: true,
  vertexColors: true,
});

const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
mesh.rotation.x = -Math.PI / 2 + 0.6;

const colors = [];
for (let i = 0; i < mesh.geometry.attributes.position.count; i++) {
  colors.push(1, 0, 0);
}

mesh.geometry.setAttribute(
  "color",
  new THREE.BufferAttribute(new Float32Array(colors), 3)
);



//light source
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
const backlight = new THREE.DirectionalLight(0xffffff, 1);
backlight.position.set(0, 0, -1);
scene.add(light);
scene.add(backlight);

scene.add(mesh);

const { array } = mesh.geometry.attributes.position;
for (let i = 0; i < array.length; i += 3) {
  const x = array[i];
  const y = array[i + 1];
  const z = array[i + 2];

  array[i + 2] = z + Math.random();
}

new OrbitControls(camera, renderer.domElement);

camera.position.z = 5;

const mouse = {
  x: undefined,
  y: undefined,
};

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(mesh);
  if (intersects.length > 0) {
    const {color} = intersects[0].object.geometry.attributes;

    const initialColor = {
        r: 1,
        g: 0,
        b: 0,
    }
    const hoverColor = {
        r: 1,
        g: 0.19,
        b: 0.5,
    }
    gsap.to(hoverColor,{
        r: initialColor.r,
        g: initialColor.g,
        b: initialColor.b,
        onUpdate:()=>{
            color.setX(intersects[0].face.a, hoverColor.r);
            color.setY(intersects[0].face.a, hoverColor.g);
            color.setZ(intersects[0].face.a, hoverColor.b);
            
            color.setX(intersects[0].face.b, hoverColor.r);
            color.setY(intersects[0].face.b, hoverColor.g);
            color.setZ(intersects[0].face.b, hoverColor.b);
        
            color.setX(intersects[0].face.c, hoverColor.r);
            color.setY(intersects[0].face.c, hoverColor.g);
            color.setZ(intersects[0].face.c, hoverColor.b);
            color.needsUpdate = true;
        }
    });

  }
    mesh.rotation.z += 0.0005;
}

animate();

addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
});

renderer.render(scene, camera);
