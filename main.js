import * as THREE from 'https://cdn.jsdelivr.net/gh/mesquite-mocap/mesquite.cc@latest/build-static/three.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Connect to AWS Server
//ssh -i ~/.ssh/game551.pem ubuntu@ec2-54-165-108-40.compute-1.amazonaws.com

// Clone Repo
// 

// Update Repo
// 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//const controls = new OrbitControls( camera, renderer.domElement );
//const loader = new GLTFLoader();

let boxGeo = new THREE.BoxGeometry(1, 1, 1);

// Block Colors
let matArray = [
    new THREE.MeshBasicMaterial({color:0x000000}), // Black
    new THREE.MeshBasicMaterial({color:0xff0000}), // Red 
    new THREE.MeshBasicMaterial({color:0xffff00}), // Yellow
    new THREE.MeshBasicMaterial({color:0x00ff00}), // Green
    new THREE.MeshBasicMaterial({color:0x00ffff}), // Cyan 
    new THREE.MeshBasicMaterial({color:0x0000ff}), // Blue
    new THREE.MeshBasicMaterial({color:0xff00ff})  // Magenta
];

// Create a block at the given coordinates with the given color id.
function createBlock(x, y, z, id) {
    let block = new THREE.Mesh(boxGeo, matArray[id]);
    block.translateX(x);
    block.translateY(-y);
    block.translateZ(z - 5);
    scene.add(block);
    console.log("ADDED BLOCK AT: " + y + ", " + z + ", " + x);
}

function loadWorld(path) {
    const data = $.getJSON(path, function(data) {
        console.log("Adding World: " + data.name);
        let world = data.blocks;
        for (let y = 0; y < world.length; y++) {
            for (let z = 0; z < world[y].length; z++) {
                for (let x = 0; x < world[y][z].length; x++) {
                    if (world[y][z][x] == 0) continue;
                    createBlock(x, y, z, world[y][z][x]);
                }
            }
        }
    });
}

console.log("ADDING WORLD");
loadWorld("./world.json");

camera.position.z = 5;

//renderer.xr.enabled = true;

/*
loader.load( 'smartrent-sample-site.glb', function ( gltf ) {

  scene.add( gltf.scene );

}, undefined, function ( error ) {

  console.error( error );

} );
*/

const keys = new Set();
addEventListener("keydown", (e) => keys.add(e.code));
addEventListener("keyup",   (e) => keys.delete(e.code));

let last = performance.now();

function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.1); // clamp big pauses
    last = now;

    camMovement(dt)
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}

function camMovement(dt) {
    const speed = 4; // units per second
    if (keys.has("KeyW")) camera.position.z -= speed * dt;
    if (keys.has("KeyS")) camera.position.z += speed * dt;
    if (keys.has("KeyA")) camera.position.x -= speed * dt;
    if (keys.has("KeyD")) camera.position.x += speed * dt;
    if (keys.has("KeyQ")) camera.rotation.y += speed * dt;
    if (keys.has("KeyE")) camera.rotation.y -= speed * dt;
    //console.log(camera.position)
    //console.log(camera.rotation)
}

requestAnimationFrame(tick);