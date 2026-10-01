import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

//const controls = new OrbitControls( camera, renderer.domElement );
//const loader = new GLTFLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color:0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//const textMesh = new THREE.TextGeometry("HI", {size: 10})
//scene.add(textMesh);

/*
const lineMat = new THREE.LineBasicMaterial({color: 0x0000ff});
const points = [];
points.push(new THREE.Vector3(-10, 0, -10));
points.push(new THREE.Vector3(0, 10, -10));
points.push(new THREE.Vector3(10, 0, -10));
const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeo, lineMat);
scene.add(line);
*/

let world = [
    [[0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [6, 1, 1, 1, 6],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]],
    [[0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]],
    [[0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]],
    [[0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]],
    [[3, 3, 3, 3, 0],
    [3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3]]
]

let boxGeo = new THREE.BoxGeometry(1, 1, 1);
let blackMat = new THREE.MeshBasicMaterial({color:0x000000});
let redMat = new THREE.MeshBasicMaterial({color:0xff0000});
let yellowMat = new THREE.MeshBasicMaterial({color:0xffff00});
let greenMat = new THREE.MeshBasicMaterial({color:0x00ff00});
let cyanMat = new THREE.MeshBasicMaterial({color:0x00ffff});
let blueMat = new THREE.MeshBasicMaterial({color:0x0000ff});
let magentaMat = new THREE.MeshBasicMaterial({color:0xff00ff});
let matArray = [blackMat, redMat, yellowMat, greenMat, cyanMat, blueMat, magentaMat];

function createBlock(x, y, z, id) {
    let block = new THREE.Mesh(boxGeo, matArray[id]);
    block.translateX(x);
    block.translateY(-y);
    block.translateZ(z - 5);
    scene.add(block);
    console.log("ADDED BLOCK AT: " + y + ", " + z + ", " + x);
}

console.log("ADDING WORLD");
for (let y = 0; y < world.length; y++) {
    for (let z = 0; z < world[y].length; z++) {
        for (let x = 0; x < world[y][z].length; x++) {
            if (world[y][z][x] == 0) continue;
            createBlock(x, y, z, world[y][z][x]);
        }
    }
}


camera.position.z = 5;

function animate(time) {
    cube.rotation.x = time/2000;
    cube.rotation.y = time/1000;
    renderer.render(scene, camera);
}

//renderer.xr.enabled = true;
renderer.setAnimationLoop(animate);