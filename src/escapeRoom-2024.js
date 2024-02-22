import * as THREE from 'three';
import * as orbit from 'OrbitControls'
import * as gltf from 'GLTFLoader'
import * as loaders from 'Loaders'
import * as dat from 'dat'
import { BoxBufferGeometry, Material } from 'three';
import {TWEEN} from 'Tween'
function degInRad(deg) {
    return deg * Math.PI / 180;
 }

function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true  });
    // renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( window.innerWidth, window.innerHeight );
    return renderer
}

const renderer = createRenderer()

document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 100000 );
camera.position.set( 0, 6000, 0 );
const controls = new orbit.OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0, 0 );
controls.update();
controls.enableDamping = true
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.keys = [ 65, 83, 68 ];

function live(){
    const controls = new orbit.OrbitControls( camera, renderer.domElement );

    camera.position.set( 0, 30, 0 );
    controls.target.set(0, 155, 0 );
    
    controls.update();
    camera.rotation.y += degInRad(90)
    camera.rotation.x += degInRad(-90)
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    // controls.panSpeed = 0.8;
    controls.keys = [ 65, 83, 68 ];
    
    controls.enableZoom = false;
    controls.enableRotate = false;
    controls.enablePan = false;
}


let start_bunny, start_bunny2, dark_man = false, dark_man2 = false
let modelsArray = [];
const loader = new gltf.GLTFLoader(); // Correct the loader instantiation

const transparentMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5, // Set the opacity (0 is fully transparent, 1 is fully opaque)
});


var lights = []
function lighting(x,y,z){
    // var x = Math.floor(Math.random() * -3000) + 1;
    // var z = Math.floor(Math.random() * -3000) + 1;

    // console.log(x, z)
    const sphere = new THREE.SphereGeometry( 0.1, 0.1, 0.1 );
    var light = new THREE.PointLight( 'yellow', 0.8,600 );
    // light.castShadow = true
    light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 'yellow' } ) ) );
    scene.add( light );
    light.position.set(x,y,z)
    light.name = "candle_flame"
    lights.push(light)

}


var base = 10
var wall_length = 150
var wall_height = 150
var wall_width = 15
var path_width = 8
var wall_space = (wall_length/1.4 + path_width/2) 

var collidableMeshList = [];
var oldCamera;
// oldCamera = camera.clone();



var geo = new THREE.BoxGeometry( wall_height, wall_length, wall_width );
var mat = new THREE.MeshStandardMaterial({color: 0x525252});
var textureLoader = new THREE.TextureLoader()
const customTexture = textureLoader.load('assets/textures/scratches.jpg')

const texture = new THREE.MeshStandardMaterial({ 
    map: customTexture
})

function maze_boundary(){
    var geo_boundary = new THREE.BoxGeometry( 150, 5000, 10 );
    var textureLoader = new THREE.TextureLoader()
    const customTexture = textureLoader.load('assets/textures/scratches.jpg')

    const texture = new THREE.MeshStandardMaterial({ 
        map: customTexture
    })

    var plane = new THREE.Mesh(geo_boundary, texture);
    plane.rotation.z=THREE.Math.degToRad(-90);
    plane.position.set(0, 50, -1200)
    plane.receiveShadow = true;
    scene.add(plane)

    var plane2 = new THREE.Mesh(geo_boundary, texture);
    plane2.rotation.z=THREE.Math.degToRad(-90);
    plane2.position.set(0, 50, 1750)
    plane2.receiveShadow = true;
    scene.add(plane2)

    var plane3 = new THREE.Mesh(geo_boundary, texture);
    plane3.rotation.z=THREE.Math.degToRad(-90);
    plane3.rotation.y=THREE.Math.degToRad(-90);
    plane3.position.set(2200, 50, 0)
    plane3.receiveShadow = true;
    scene.add(plane3)

    var plane4 = new THREE.Mesh(geo_boundary, texture);
    plane4.rotation.z=THREE.Math.degToRad(-90);
    plane4.rotation.y=THREE.Math.degToRad(-90);
    plane4.position.set(-2200, 50, 0)
    plane4.receiveShadow = true;
    scene.add(plane4)

    collidableMeshList.push(plane)
    collidableMeshList.push(plane2)
    collidableMeshList.push(plane3)
    collidableMeshList.push(plane4)


    // collidableMeshList.push(plane2)
}

maze_boundary()

function bottom_left_corner(center_x, center_z){
    var x = center_x - wall_space
    var z = center_z  - wall_space   
    // console.log(x-wall_length/2,z-wall_length/2)
    

    var mat = new THREE.MeshStandardMaterial({color:'#910707'});
    var plane = new THREE.Mesh(geo, texture);
    plane.rotation.z=THREE.Math.degToRad(-90);
    plane.position.set(x, 50, z-wall_length/2)
    plane.receiveShadow = true;
    scene.add(plane)

    var plane2 = new THREE.Mesh(geo, texture);
    plane2.rotation.y=THREE.Math.degToRad(-90);
    plane2.rotation.z=THREE.Math.degToRad(-90);
    plane2.position.set(x-wall_length/2, 50, z)
    
    // plane2.position.set(-150, 50, -100)
    plane2.receiveShadow = true;
    scene.add(plane2)

    collidableMeshList.push(plane)
    collidableMeshList.push(plane2)
}

function top_right_corner(center_x, center_z){
    var x = center_x + wall_space
    var z = center_z  + wall_space   
    // console.log(x-wall_length/2,z-wall_length/2)
    
    // var geo = new THREE.BoxGeometry( wall_height, wall_length, wall_width );
    var mat = new THREE.MeshStandardMaterial({color: 0x525252});
    var plane = new THREE.Mesh(geo, texture);

    plane.rotation.z=THREE.Math.degToRad(-90);
    plane.position.set(x, 50, z+wall_length/2)
    plane.receiveShadow = true;
    scene.add(plane)

    var plane2 = new THREE.Mesh(geo, texture);
    plane2.rotation.y=THREE.Math.degToRad(-90);
    plane2.rotation.z=THREE.Math.degToRad(-90);
    plane2.position.set(x+wall_length/2, 50, z)
    // plane2.position.set(-150, 50, -100)
    plane2.receiveShadow = true;
    scene.add(plane2)

    collidableMeshList.push(plane)
    collidableMeshList.push(plane2)
}

function bottom_right_corner(center_x, center_z){
    var x = center_x - wall_space
    var z = center_z  + wall_space   
    // console.log(x-wall_length/2,z-wall_length/2)
    
    // var geo = new THREE.BoxGeometry( wall_height, wall_length, wall_width );
    var mat = new THREE.MeshStandardMaterial({color: 0x525252});
    var plane = new THREE.Mesh(geo, texture);

    plane.rotation.z=THREE.Math.degToRad(-90);
    plane.position.set(x, 50, z+wall_length/2)
    plane.receiveShadow = true;
    scene.add(plane)

    var plane2 = new THREE.Mesh(geo, texture);
    plane2.rotation.y=THREE.Math.degToRad(-90);
    plane2.rotation.z=THREE.Math.degToRad(-90);
    plane2.position.set(x-wall_length/2, 50, z)
    // plane2.position.set(-150, 50, -100)
    plane2.receiveShadow = true;
    scene.add(plane2)

    collidableMeshList.push(plane)
    collidableMeshList.push(plane2)
}

function top_left_corner(center_x, center_z){
    var x = center_x + wall_space
    var z = center_z  - wall_space   
    var mat = new THREE.MeshStandardMaterial({color: 0x525252});
    var plane = new THREE.Mesh(geo, texture);

    plane.rotation.z=THREE.Math.degToRad(-90);
    plane.position.set(x, 50, z-wall_length/2)
    plane.receiveShadow = true;
    scene.add(plane)

    var plane2 = new THREE.Mesh(geo, texture);
    plane2.rotation.y=THREE.Math.degToRad(-90);
    plane2.rotation.z=THREE.Math.degToRad(-90);
    plane2.position.set(x+wall_length/2, 50, z)
    // plane2.position.set(-150, 50, -100)
    plane2.receiveShadow = true;
    scene.add(plane2)

    collidableMeshList.push(plane)
    collidableMeshList.push(plane2)
}

function inner_sqaure(a,b){
    var x = path_width/2 + wall_length*2 + 2*wall_height/2 + path_width*8
    var x1 = a + x
    var x2 = a - x

    var y1 = b + x
    var y2 = b - x

    // lighting(a,b)
    // lighting(x1,y1)
    // lighting(x2,y2)

    ///////////////////////////////////////////
    // adds to all squares but increases load
    // lighting(x1,b)
    // lighting(a,y1)
    // lighting(x1,y2)
    //
    // lighting(x2,b)
    // lighting(x2,y1)
    // lighting(a,y2)
    ///////////////////////////////////////////

    top_right_corner(a,b)
    bottom_left_corner(a,b)
    top_left_corner(a,b)
    bottom_right_corner(a,b)

    top_right_corner(x2,b)
    bottom_left_corner(x2,b)
    top_left_corner(x2,b)
    bottom_right_corner(x2,b)

    top_right_corner(x1,b)
    bottom_left_corner(x1,b)
    top_left_corner(x1,b)
    bottom_right_corner(x1,b)

    top_right_corner(x2,y1)
    bottom_left_corner(x2,y1)
    top_left_corner(x2,y1)
    bottom_right_corner(x2,y1)

    top_right_corner(x1,y1)
    bottom_left_corner(x1,y1)
    top_left_corner(x1,y1)
    bottom_right_corner(x1,y1)

    top_right_corner(a,y1)
    bottom_left_corner(a,y1)
    top_left_corner(a,y1)
    bottom_right_corner(a,y1)

    top_right_corner(a,y2)
    bottom_left_corner(a,y2)
    top_left_corner(a,y2)
    bottom_right_corner(a,y2)
    
    top_right_corner(x2,y2)
    bottom_left_corner(x2,y2)
    top_left_corner(x2,y2)
    bottom_right_corner(x2,y2)

    top_right_corner(x1,y2)
    bottom_left_corner(x1,y2)
    top_left_corner(x1,y2)
    bottom_right_corner(x1,y2)
}

function zombie_wall(){
    var geo_extra_wall = new THREE.BoxGeometry( wall_height, wall_space, wall_width );
    var plane = new THREE.Mesh(geo_extra_wall, texture);
    plane.rotation.z=THREE.Math.degToRad(-90);
    plane.position.set(500, 50, -333)
    plane.receiveShadow = true;
    scene.add(plane)

    // var geo_extra_wall = new THREE.BoxGeometry( wall_height, wall_space, wall_width );
    var plane2 = new THREE.Mesh(geo_extra_wall, texture);
    plane2.rotation.z=THREE.Math.degToRad(-90);
    plane2.position.set(500, 50, -704.5)
    plane2.receiveShadow = true;
    scene.add(plane2)

    var plane3 = new THREE.Mesh(geo_extra_wall, texture);
    plane3.rotation.z=THREE.Math.degToRad(-90);
    plane3.position.set(1020, 50, -704.5)
    plane3.receiveShadow = true;
    scene.add(plane3)

    var plane4 = new THREE.Mesh(geo_extra_wall, texture);
    plane4.rotation.z=THREE.Math.degToRad(-90);
    plane4.position.set(1020, 50, -333)
    plane4.receiveShadow = true;
    scene.add(plane4)    

    var geo_extra_wall_2 = new THREE.BoxGeometry( wall_height, wall_space*2, wall_width );

    var plane5 = new THREE.Mesh(geo_extra_wall_2, texture);
    plane5.rotation.z=THREE.Math.degToRad(-90);
    plane5.position.set(780, 50, -704.5)
    plane5.receiveShadow = true;
    scene.add(plane5)

    var plane6 = new THREE.Mesh(geo_extra_wall_2, texture);
    plane6.rotation.z=THREE.Math.degToRad(-90);
    plane6.position.set(780, 50, -333)
    plane6.receiveShadow = true;
    scene.add(plane6)

    var plane7 = new THREE.Mesh(geo_extra_wall, texture);
    plane7.rotation.z=THREE.Math.degToRad(-90);
    plane7.rotation.y=THREE.Math.degToRad(-90);
    plane7.position.set(1220, 50, -500)
    plane7.receiveShadow = true;
    scene.add(plane7)

    collidableMeshList.push(plane)
    collidableMeshList.push(plane2)
    collidableMeshList.push(plane3)
    collidableMeshList.push(plane4)
    collidableMeshList.push(plane5)
    collidableMeshList.push(plane6)
    collidableMeshList.push(plane7)
}

function hugger_wall(){
    var geo_extra_wall = new THREE.BoxGeometry( wall_height, wall_space, wall_width );
    var geo_extra_wall_2 = new THREE.BoxGeometry( wall_height, wall_space*2, wall_width );

    var plane = new THREE.Mesh(geo_extra_wall, texture);
    plane.rotation.z=THREE.Math.degToRad(-90);
    plane.position.set(1550, 50, 1365)
    plane.receiveShadow = true;
    scene.add(plane)

    var plane2 = new THREE.Mesh(geo_extra_wall, texture);
    plane2.rotation.z=THREE.Math.degToRad(-90);
    plane2.position.set(1050, 50, 1365)
    plane2.receiveShadow = true;
    scene.add(plane2)

    var plane3 = new THREE.Mesh(geo_extra_wall_2, texture);
    plane3.rotation.z=THREE.Math.degToRad(-90);
    plane3.position.set(1290, 50, 1365)
    plane3.receiveShadow = true;
    scene.add(plane3)

    var plane4 = new THREE.Mesh(geo_extra_wall, texture);
    plane4.rotation.z=THREE.Math.degToRad(-90);
    plane4.rotation.y=THREE.Math.degToRad(-90);
    plane4.position.set(1740, 50, 1570)
    plane4.receiveShadow = true;
    scene.add(plane4)

    collidableMeshList.push(plane)
    collidableMeshList.push(plane2)
    collidableMeshList.push(plane3)
    collidableMeshList.push(plane4)

}
function build_maze(shape){
    var x = path_width/2 + wall_length*2 + 2*wall_height/2 + path_width*8

    inner_sqaure(x*0,0)

    for(var i = 0; i < shape; i++){
        for(var j = 0; j < shape; j++){
            if (i != 0 || j != 0)    
                inner_sqaure((3*x)*i,(3*x)*j)        
        }   
    }

    for(var i = 0; i < shape; i++){
        for(var j = 0; j < shape; j++){
            if (i != 0 || j!= 0)    
                inner_sqaure(-(3*x)*i,(3*x)*j)        
        }   
    }

    for(var i = 0; i < shape; i++){
        for(var j = 0; j < shape; j++){
            if (i != 0 || j!= 0)    
                inner_sqaure((3*x)*i,-(3*x)*j)        
        }   
    }

    for(var i = 0; i < shape; i++){
        for(var j = 0; j < shape; j++){
            if (i != 0 || j != 0)    
                inner_sqaure(-(3*x)*i,-(3*x)*j)        
        }   
    }

    zombie_wall()
    hugger_wall()
}

var player = { height: 1.8, speed: 15, turnSpeed: Math.PI * 0.025 };

function addLight(model_name){
    let cameraPosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z); 
    
    const spotLight = new THREE.SpotLight("white", 5)
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 100;
    spotLight.shadow.mapSize.height = 100;

    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 20
    spotLight.penumbra = 1
    spotLight.distance = 500;

    // spotLight.position.copy(cameraPosition);
    // spotLight.position.set(x+60,-100,z)
    spotLight.castShadow = true
    const model = getObjectByName(model_name);
    // model.visible = !model.visible
    spotLight.target = model
    let model_position = new THREE.Vector3(model.position.x, model.position.y+30, model.position.z);
    spotLight.position.copy(model_position);
    const spotLight_name = model_name.concat("_light")
    console.log(spotLight_name)
    let model_spotlight = getObjectByName(spotLight_name);
    if (!model_spotlight){
        spotLight.name = spotLight_name
        scene.add(spotLight)
    }

    return spotLight
 
    

    // setTimeout(() => {
    //     scene.remove(spotLight)
    //     model.visible = false
    // }, 10000);
    
}
const listener = new THREE.AudioListener();
camera.add( listener );

const sound = new THREE.PositionalAudio( listener );

const audioLoader = new THREE.AudioLoader();
const sounds = {};
const clickList = []

let huggy, zombie, zombie_idle, candle, cupboard, hugger
let zombie_path = []


build_maze(2)
const spot = new THREE.AmbientLight(0xffffff, 8)
// scene.add(spot)
live()

let model_hugger,animations_hugger,model_zombie,animations_zombie
function animation_hugger(animation_num,play){
    if (animations_hugger && animations_hugger.length > 0) {
        const mixer = new THREE.AnimationMixer(model_hugger);
        const action = mixer.clipAction(animations_hugger[animation_num]);
        console.log(animations_hugger.length)

        action.timeScale = 6.0;
        if(play)
            action.play()
    
        function animate() {
            requestAnimationFrame(animate);
            mixer.update(0.016);
            renderer.render(scene, camera);
        }
    
        animate();
    }
}

function animation_zombie(animation_num,play){
    if (animations_zombie && animations_zombie.length > 0) {
        const mixer = new THREE.AnimationMixer(model_zombie);
        const action = mixer.clipAction(animations_zombie[animation_num]);
        console.log(animations_zombie.length)

        action.timeScale = 6.0;
        if(play)
            action.play()
    
        function animate() {
            requestAnimationFrame(animate);
            mixer.update(0.016);
            renderer.render(scene, camera);
        }
    
        animate();
    }
}

function addModel_hugger(model_file,name,x,y,z,scale,visibility,animation_num,sound_file,volume) {
    return new Promise((resolve, reject) => {

        audioLoader.load('assets/sounds/'.concat(sound_file), function (buffer) {
            sound.setBuffer( buffer );
            sound.setRefDistance( 100 );
            sound.setMaxDistance( 150 );
            sound.setLoop(true);
            sound.setVolume(volume);
            sound.playbackRate = 1.2;
            sounds[name] = sound;
            
            loader.load('assets/models/'.concat(model_file), (gltf) => {
                model_hugger = gltf.scene;
                model_hugger.visible = visibility;
                model_hugger.add(sound)
                model_hugger.name = name
                scene.add(model_hugger);
                

                model_hugger.scale.set(scale, scale, scale);
                model_hugger.position.set(x, y, z);
                model_hugger.receiveShadow = true;
                animations_hugger = gltf.animations;

            
                

                resolve(modelsArray, collidableMeshList);
            }
        )}, undefined, reject);
    }
    );
}

function addModel_zombie(model_file,name,x,y,z,scale,visibility,animation_num,sound_file,volume) {
    return new Promise((resolve, reject) => {

        audioLoader.load('assets/sounds/'.concat(sound_file), function (buffer) {
            sound.setBuffer( buffer );
            sound.setRefDistance( 100 );
            sound.setMaxDistance( 150 );
            sound.setLoop(true);
            sound.setVolume(volume);
            sound.playbackRate = 1.2;
            sounds[name] = sound;
            
            loader.load('assets/models/'.concat(model_file), (gltf) => {
                model_zombie = gltf.scene;
                model_zombie.visible = visibility;
                model_zombie.add(sound)
                model_zombie.name = name
                scene.add(model_zombie);
                

                model_zombie.scale.set(scale, scale, scale);
                model_zombie.position.set(x, y, z);
                model_zombie.receiveShadow = true;
                animations_zombie = gltf.animations;
                resolve(modelsArray, collidableMeshList);
            }
        )}, undefined, reject);
    }
    );
}

function addModelBoundary(name,box_scale,x,y,z){
    const transparentMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0,
    });
    
    const transparentBoxGeometry = new THREE.BoxGeometry(0.01, box_scale, box_scale);
    const transparentBox = new THREE.Mesh(transparentBoxGeometry, transparentMaterial);
    transparentBox.position.set(x,y,z)
    transparentBox.name = name.concat("-box")
    scene.add(transparentBox);
    collidableMeshList.push(transparentBox)

}

function addModel(model_file,name,x,y,z,scale,visibility,animation_num,sound_file,volume) {
    return new Promise((resolve, reject) => {

        audioLoader.load('assets/sounds/'.concat(sound_file), function (buffer) {
            sound.setBuffer( buffer );
            sound.setRefDistance( 100 );
            sound.setMaxDistance( 150 );
            sound.setLoop(true);
            sound.setVolume(volume);
            sound.playbackRate = 1.2;
            sounds[name] = sound;
            
            loader.load('assets/models/'.concat(model_file), (gltf) => {
                const model = gltf.scene;
                model.visible = visibility;
                model.add(sound)
                model.name = name
                scene.add(model);
                

                model.scale.set(scale, scale, scale);
                model.position.set(x, y, z);
                model.receiveShadow = true;
                const animations = gltf.animations;

            
                if (animations && animations.length > 0) {
                    const mixer = new THREE.AnimationMixer(model);
                    const action = mixer.clipAction(animations[animation_num]);
                    console.log(animations.length)

                    action.timeScale = 1.0;
                    action.play()
                
                    function animate() {
                        requestAnimationFrame(animate);
                        mixer.update(0.016);
                        renderer.render(scene, camera);
                    }
                
                    animate();
                }

                resolve(modelsArray, collidableMeshList);
            }
        )}, undefined, reject);
    }
    );
}

function getObjectByName(objectName) {
    let foundObject = null;

    // Traverse the scene's children
    scene.traverse((child) => {
        // Check if the child has the specified name
        if (child.name === objectName) {
            foundObject = child;
        }
    });

    return foundObject;
}

document.getElementById("message").style.visibility = "hidden";
document.getElementById("section").style.visibility = "hidden";   

function display_alert(text, timeout){
    document.getElementById("message").style.visibility = "visible";
    document.getElementById("section").style.visibility = "visible";
    document.getElementById("message").innerHTML = text

    if(timeout != -1){
        setTimeout(function() {
            document.getElementById("message").style.visibility = "hidden";
            document.getElementById("section").style.visibility = "hidden";    
        },timeout);
    }
}


(async () => {
    //// bunny
    // await addModel("vanny.glb","bunny2",-1800,0,260,14,false,5,"evil-laughing.mp3",10);
    // await addModel("vanny.glb","bunny",0,0,260,14,false,5,"evil-laughing.mp3",10);
    // addModelBoundary("bunny",100,-900,50,260)
    // addModelBoundary("bunny2",100,-890,50,260)
    // let bunny = getObjectByName("bunny") 
    // bunny.rotation.y += THREE.Math.degToRad(-90);
    // let bunny2 = getObjectByName("bunny2") 
    // bunny2.rotation.y += THREE.Math.degToRad(90);
    ////

    //// chess
    // await addModel("decorative_chess.glb","chess",1050,0,-500,70,true,0,"evil-laughing.mp3",10);
    // let chess = getObjectByName('chess')
    // clickList.push(chess)
    ////

    //// dark man
    //// await addModel("dark_man.glb","black_man",0,0,180,14,false,0,"evil-laughing.mp3",10);
    // await addModel("dark_man.glb","dark_man",2050,0,-250,50,true,0,"evil-laughing.mp3",10);
    // await addModel("dark_man.glb","dark_man2",0,0,-250,50,true,0,"evil-laughing.mp3",10);
    // addModelBoundary("dark_man",110,410,50,-250)
    // addModelBoundary("dark_man2",110,400,50,-250)


    // let dark_man = getObjectByName("dark_man")
    // dark_man.rotation.y += THREE.Math.degToRad(-90)
    // let dark_man2 = getObjectByName("dark_man2")
    // dark_man2.rotation.y += THREE.Math.degToRad(90)

    // let dark_man_box = getObjectByName("dark_man-box")
    // let dark_man_box2 = getObjectByName("dark_man2-box")
    // ////
    // await addModel("scary-huggy-vent.glb","huggy",550,-20,0,500,true,0,"evil-laughing.mp3",10); //180,-550
    // huggy = getObjectByName("huggy")
    // huggy.rotation.y += THREE.Math.degToRad(-90)
    // /////
    // 1100,-20,1550
    await addModel_hugger("hallucination_huggy.glb","hugger",1100,-20,1550,400,true,1,"evil-laughing.mp3",10); //180,-550
    hugger = getObjectByName("hugger")
    hugger.rotation.y += THREE.Math.degToRad(-90)
    animation_hugger(0,0)

    addModelBoundary("hugger",350,900,50,1550)
    hugger = getObjectByName("hugger")
    // hugger_box.rotation.y += THREE.Math.degToRad(90)

    // setTimeout(() => {
    //     animation_hugger(1,1)
    // }, 5000);

    ///// ZOMBIE
    await addModel_zombie("scp-096.glb","zombie",550,-20,-550,40,true,4,"evil-laughing.mp3",10)
    zombie = getObjectByName("zombie")
    animation_zombie(0,0)
    zombie.rotation.y += THREE.Math.degToRad(-90)
    
    addModelBoundary("zombie",350,420,50,-520)

    // addModelBoundary("zombie",100,540,50,-410)
    // let zombie_box = getObjectByName("zombie-box")
    // zombie_box.rotation.y += THREE.Math.degToRad(90)
    /////
    // addModelBoundary("zombie2",100,540,50,-700)
    // zombie_box = getObjectByName("zombie2-box")
    // zombie_box.rotation.y += THREE.Math.degToRad(90)

    
    // addModelBoundary("zombie4",100,690,50,-550)
    
    // ///// CUPBOARD AND CANDLE
    await addModel("cupboard.glb","cupboard",1700,30,1700,0.6,true,0,"evil-laughing.mp3",10)
    cupboard = getObjectByName("cupboard")
    cupboard.rotation.y += THREE.Math.degToRad(180) 

    await addModel("candle.glb","candle",1705,15,1680,0.05,true,0,"evil-laughing.mp3",10)
    candle = getObjectByName("candle")
    candle.rotation.y += THREE.Math.degToRad(90) 
    ////////////
    if(huggy){
        start = model1[model1_index][0]
        end = model1[model1_index][1]
        model1_count = start        
        if(model1[model1_index][3] === "x"){
            huggy.position.x = start
        }
        else{
            huggy.position.z = start
        }
    }
    // await addModel("satan.glb","taunt",0,-20,0,0.5,true,0,"evil-laughing.mp3",10);
    
    // await addModel("fallen_angel.glb","angel",0,20,0,1,true,4,"evil-laughing.mp3",10);
    // let angel = getObjectByName("angel")
    // angel.rotation.x += THREE.Math.degToRad(90)


    // await addModel("devil_on_a_throne.glb","devil",0,-20,0,0.5,true,0,"evil-laughing.mp3",10);

    // await addModel("monster_dogday_-_poppy_playtime.glb","monster_dogday_-_poppy_playtime",0,0,0,30,true,1,"evil-laughing.mp3",10); //0 or 1 animation
   
})();


let zombie_angle = THREE.Math.degToRad(90)
let hugger_angle = THREE.Math.degToRad(90)

let zombie_enable = 1
let zombie_follow = 0
var paper_visible,paper_semi_visible,hugger_follow = 0

function candle_paper(){
    var geo_paper = new THREE.BoxGeometry( 10, 15, 0.1 );
    var textureLoader = new THREE.TextureLoader()
    var customTexture_paper_visible = textureLoader.load('assets/images/paper_visible.png')
    var customTexture_paper_semi_visible = textureLoader.load('assets/images/paper_semi_visible.png')
    const texture_paper_visible = new THREE.MeshStandardMaterial({ 
        map: customTexture_paper_visible,
    })
    paper_visible = new THREE.Mesh(geo_paper, texture_paper_visible);
    paper_visible.rotation.y += THREE.Math.degToRad(90)
    paper_visible.position.set(1705,25,1697)
    scene.add(paper_visible)

    const texture_paper_semi_visible = new THREE.MeshStandardMaterial({ 
        map: customTexture_paper_semi_visible,
    })

    paper_semi_visible = new THREE.Mesh(geo_paper, texture_paper_semi_visible);
    paper_semi_visible.position.set(1705,25,1697)
    paper_semi_visible.rotation.y += THREE.Math.degToRad(90)

    scene.add(paper_semi_visible)


    lighting(1705,28,1680)
}
candle_paper()
let candle_flame = getObjectByName("candle_flame")
let clock, clock_hugger


function intersection(direction, distance) {
    const raycaster = new THREE.Raycaster(camera.position, direction);
    raycaster.far = distance;

    // Check for intersections
    const intersections = raycaster.intersectObjects(collidableMeshList, true);
    // console.log(collidableMeshList)
    if (intersections.length > 0) {
        // console.log(intersections)
        if (intersections[0].object.name === "greenModel-box"){
            const model = getObjectByName("greenModel");

            if (model) {
                model.visible = true;
                addLight("greenModel");
            }
        }

        else if (intersections[0].object.name === "bunny-box"){
            const model = getObjectByName("bunny");

            if (model) {
                model.visible = true;
                start_bunny = true
                let bunny_box2 = getObjectByName("bunny2-box")
                scene.remove(bunny_box2)
                collidableMeshList.pop(bunny_box2)
                let bunny_box = getObjectByName("bunny-box")
                scene.remove(bunny_box)
                collidableMeshList.pop(bunny_box)
                addLight("bunny");
            }
        } 

        else if (intersections[0].object.name === "bunny2-box"){
            const model = getObjectByName("bunny2");

            if (model) {
                start_bunny2 = true
                let bunny_box2 = getObjectByName("bunny2-box")
                scene.remove(bunny_box2)
                collidableMeshList.pop(bunny_box2)
                let bunny_box = getObjectByName("bunny-box")
                scene.remove(bunny_box)
                collidableMeshList.pop(bunny_box)
                addLight("bunny2");
            }
        }
    
        else if (intersections[0].object.name === "dark_man2-box"){
            const model = getObjectByName("dark_man");
            console.log(model)
            if (model) {
                dark_man = true
                let dark_man_box2 = getObjectByName("dark_man2-box")
                scene.remove(dark_man_box2)
                collidableMeshList.pop(dark_man_box2)
                let dark_man_box = getObjectByName("dark_man-box")
                scene.remove(dark_man_box)
                collidableMeshList.pop(dark_man_box)
                addLight("dark_man");
            }
        }

        else if (intersections[0].object.name === "dark_man-box"){
            const model = getObjectByName("dark_man2");
            console.log(model)
            if (model) {
                dark_man2 = true
                let dark_man_box2 = getObjectByName("dark_man2-box")
                scene.remove(dark_man_box2)
                collidableMeshList.pop(dark_man_box2)
                let dark_man_box = getObjectByName("dark_man-box")
                scene.remove(dark_man_box)
                collidableMeshList.pop(dark_man_box)
                addLight("dark_man2");
            }
        }

        else if (intersections[0].object.name === "zombie-box"){
            // if(hugger_hit != 1){
                zombie_follow = 1    
                let box = getObjectByName("zombie-box");
                scene.remove(box)
                collidableMeshList.pop(box)
                console.log("hit",5000)
                clock = new THREE.Clock();    
            // }


            function temp(){
                console.log(123)
            }
            
            (async()=>{
                
                // zombie.visible = false
                // await addModel("scp-096.glb","zombie",550,-20,-550,30,true,9,"evil-laughing.mp3",10)
                // // remove_boxes()
                // zombie = getObjectByName("zombie")
                
                if(zombie){
                    // zombie.rotation.y += THREE.Math.degToRad(-90)
                    zombie_move = 1
                    display_alert("RUN",5000)
                }

            })();
        }

        else if (intersections[0].object.name === "hugger-box"){
            // if(zombie_hit != 1){
                let box = getObjectByName("hugger-box");
                scene.remove(box)
                collidableMeshList.pop(box)
                // console.log("hit",5000)
                clock_hugger = new THREE.Clock();    
                hugger_follow = 1    
            // }


            function temp(){
                console.log(123)
            }
            
            (async()=>{
                if(hugger){
                    hugger_move = 1
                    display_alert("RUN",5000)
                }

            })();
        }
        return true;
    }

    return false;
}
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
function onMouseClick(event) {
    // Calculate mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickList, true);

    if (intersects.length > 0) {
        const clickedObject = getObjectByName("chess")
        console.log(clickedObject)
        const imageUrl = 'assets/images/chess.png';

        onObjectClick(imageUrl)
        
    }
}

function onObjectClick(imageUrl) {
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.style.width = '80%'; // Adjust the width as needed
    imageElement.style.height = 'auto'; // Maintain aspect ratio
    imageElement.style.position = 'fixed';
    imageElement.style.top = '50%';
    imageElement.style.left = '50%';
    imageElement.style.transform = 'translate(-50%, -50%)';
    imageElement.style.zIndex = '9999';

    // Append the image element to the document body
    document.body.appendChild(imageElement);

    // Close the image after 5 seconds
    const timeoutId = setTimeout(() => {
        document.body.removeChild(imageElement);
        document.removeEventListener('click', closeImageOnClick);
    }, 5000);

    // Close the image when clicked
    const closeImageOnClick = () => {
        clearTimeout(timeoutId);
        document.body.removeChild(imageElement);
        imageElement.addEventListener('click', () => {
            document.body.removeChild(imageElement);
        });
    };

    // Add the event listener to the document body
    document.addEventListener('click', closeImageOnClick);

    
}

const fullscreenOverlay = document.getElementById('fullscreenOverlay');
const fullscreenImage = document.getElementById('fullscreenImage');

function lightMovement(){
    var len = lights.length
    var i = 0
    var theta = 0.05
    var x = 0, y = 0, z = 0
    while (i < len) {
        var x_rotation = lights[i].rotation.x
        var y_rotation = lights[i].rotation.y
        var z_rotation = lights[i].rotation.z
    
        lights[i].rotation.x += theta
        lights[i].rotation.y += theta
        lights[i].rotation.z += theta
    
    
        x = 2*Math.sin( x_rotation ) 
        y = 2*Math.cos( y_rotation ) 
        z = 2*Math.cos( z_rotation )
        
        lights[i].position.x += x
        lights[i].position.y += y
        lights[i].position.z += z    
        i += 1
        // console.log(i%len, len)


    }
}

var geo = new THREE.BoxGeometry( 4000, 4000, 60 );
var mat = new THREE.MeshBasicMaterial({color: 0x525252});
var plane = new THREE.Mesh(geo, mat);
plane.rotation.x=THREE.Math.degToRad(-90);
plane.position.set(0, -100, 0)
plane.receiveShadow = true;
// scene.add(plane)


scene.add(new THREE.AxesHelper(2000))


// const clock = new THREE.Clock()
var keyboard = {};
function keyDown(e) {
    keyboard[e.keyCode] = true;
}

function keyUp(e) {
    keyboard[e.keyCode] = false;
}
var lightTurn = 75
let cameraPosition = new THREE.Vector3(camera.position.x, -50, camera.position.z); 
let targetPosition = new THREE.Vector3(cameraPosition.x-lightTurn, 50, cameraPosition.z); 
function addTorch(){
    const spotLight = new THREE.SpotLight(0xffffff, 0.8);

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 100;
    spotLight.shadow.mapSize.height = 100;

    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 20
    spotLight.penumbra = 1
    spotLight.distance = 500;

    const spotLightTarget = new THREE.Object3D();
    scene.add(spotLightTarget);
    spotLight.target = spotLightTarget;

    scene.add(spotLight);
    spotLight.position.copy(cameraPosition);

    spotLight.target.position.copy(targetPosition);
    return spotLight
}

let spotLight = addTorch()
let temp_sound_var = 0
// [[start,end,steps,axis="x"/"z",next]]
let model1 = [[-800,300,5,"z",550],[-800,300,5,"z",260],[-800,300,5,"z",-1050],[-800,300,5,"z",-550]]
let model1_index = 0
let start = model1[model1_index][0]
let end = model1[model1_index][1]
let model1_count = start
let next_model1 = model1[model1_index][4]

let zombie_move = 0
let current_paper = 0
let elapsedTime
let zombie_run = 0, hugger_run = 0, zombie_stop = 1
let movement = 1
let hit_clock, hit_elapsedTime, elapsedTime_hugger, hit_clock_hugger
let hugger_path = [], hugger_move = 0, zombie_hit=0,hugger_hit=0
function animate() {
    requestAnimationFrame( animate );
    
    zombie_run = 0
    hugger_run = 0
    
    if(clock_hugger){
        elapsedTime_hugger = clock_hugger.getElapsedTime();
        if(parseInt(elapsedTime_hugger) < 5 && parseInt(elapsedTime_hugger) > 0){
            display_alert(5-parseInt(elapsedTime_hugger),0)    
        }
        else if(parseInt(elapsedTime_hugger) === 5){
            animation_hugger(1,1)
            display_alert(5-parseInt(elapsedTime_hugger),1000)    
        }
    }
    if(clock && zombie_follow){
        elapsedTime = clock.getElapsedTime();
        
        if(parseInt(elapsedTime) < 5 && parseInt(elapsedTime) > 0){
            display_alert(5-parseInt(elapsedTime),0)    
        }
        else if(parseInt(elapsedTime) === 5){
            animation_zombie(9,1)
            display_alert(5-parseInt(elapsedTime),1000)    
        }
    } 
    if(huggy){
        if(model1_count === end){
            model1_index++
            if( model1_index === model1.length)
                model1_index = 0
            next_model1 = model1[model1_index][4]

            start = model1[model1_index][0]
            end = model1[model1_index][1]
            model1_count = start        
            if(model1[model1_index][3] === "x"){
                huggy.position.x = start
                huggy.position.z = next_model1
            }
            else{
                huggy.position.z = start
                huggy.position.x = next_model1
            }
        }
        if(model1[model1_index][3] === "x"){
            huggy.position.x += model1[model1_index][2] + 1
        }
        else{
            huggy.position.z += model1[model1_index][2] + 1
        }
        model1_count += model1[model1_index][2]
    }

    TWEEN.update() 
    const moveDirection = new THREE.Vector3();
    
    if(paper_visible && paper_semi_visible){
        if(current_paper===0){
            setTimeout(function() {
                paper_visible.visible = true
                paper_semi_visible.visible = false
                current_paper = 1
            },2000);
            
            if(candle_flame.intensity <= 1 && candle_flame.intensity > 0.2){
                candle_flame.intensity -= 0.01
                
            }
        }
        
        else if(current_paper===1){
            setTimeout(function() {
                paper_visible.visible = false
                paper_semi_visible.visible = true
                
                current_paper = 0
            },2000);
                if(candle_flame.intensity > 0 && candle_flame.intensity < 0.8){
                    candle_flame.intensity += 0.01
                    
                }
        }
    }

    if(movement){
        if (keyboard[87]) { // W key (forward)
            if (temp_sound_var === 0){
                listener.context.resume().then(() => {
                    sound.play();
                });
                temp_sound_var = 1
            }
            moveDirection.set(
                -Math.sin(camera.rotation.y),
                0,
                -Math.cos(camera.rotation.y)
            );
        }

        if (keyboard[83]) { // S key (backward)
            moveDirection.set(
                Math.sin(camera.rotation.y),
                0,
                Math.cos(camera.rotation.y)
            );
        }

        if (keyboard[87] || keyboard[83]) {
            // directionalLight.distance = 30

            cameraPosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z); 
            spotLight.position.copy(cameraPosition);
            targetPosition = new THREE.Vector3(cameraPosition.x, 0, cameraPosition.z); 
            spotLight.target.position.copy(targetPosition);
            
            moveDirection.normalize(); // Ensure the movement direction is normalized
            const isColliding = intersection(moveDirection, 50);
            const cameraDirection = new THREE.Vector3();
            camera.getWorldDirection(cameraDirection);
            
            spotLight.target.position.x = spotLight.position.x + cameraDirection.x * lightTurn;
            spotLight.target.position.z = spotLight.position.z + cameraDirection.z * lightTurn;

            if (!isColliding) {
                camera.position.x += moveDirection.x * player.speed;
                camera.position.z += moveDirection.z * player.speed;  
            }

            if(zombie_follow){
                console.log("zombie")
                zombie_path.push(cameraPosition)
                if(elapsedTime > 5 && elapsedTime < 20 && zombie_stop){
                    if(!zombie_run && zombie_follow){
                        zombie_run = 1
                        console.log("move")
                        let path = zombie_path.shift()
                        // path = zombie_path.shift()
                        console.log(zombie_path.length)
                        zombie.rotation.y = zombie_angle
                        if(zombie_path.length > 5){
                            // setTimeout(function() {
                                zombie.position.set(path.x,-20,path.z)
                                spotLight.intensity = 0.8                    
                            // },1000)
                        }
                        else{
                            zombie_stop = 0
                            spotLight.intensity = 0
                            hit_clock = new THREE.Clock()
                            movement = 0
                            zombie_follow = 0
                            zombie_hit = 1
                            scene.remove(zombie)
                        }
                    }
                }
            }

            if(hugger_follow){
                hugger_path.push(cameraPosition)
                console.log(hugger_path.length)
            }

            

            if(elapsedTime_hugger > 5){
                if(!hugger_run && hugger_follow){
                    hugger_run = 1
                    console.log("move")
                    let path = hugger_path.shift()
                    // path = hugger_path.shift()
                    console.log(hugger_path.length)
                    hugger.rotation.y = hugger_angle
                    if(hugger_path.length > 5){
                        setTimeout(function() {
                            hugger.position.set(path.x,-20,path.z)
                            spotLight.intensity = 0.8                    
                        },0)
                    }
                    else{
                        spotLight.intensity = 0
                        hit_clock_hugger = new THREE.Clock()
                        movement = 0
                        hugger_follow = 0
                        scene.remove(hugger)
                        hugger_hit = 1
                    }
                    hugger.rotation.y = hugger_angle
                }
            }
                
        }

        else{
            if(elapsedTime > 5 && elapsedTime < 20 && zombie_stop){
                if(!zombie_run && zombie_follow){
                    console.log("run")
                    let path = zombie_path.shift()
                    // path = zombie_path.shift()
                    console.log(zombie_path.length)
                    zombie.rotation.y = zombie_angle
                    if(zombie_path.length > 5){
                        // setTimeout(function() {
                            zombie.position.set(path.x,-20,path.z)
                            spotLight.intensity = 0.8                    
                        // },1000)
                    }
                    else{
                        zombie_stop = 0
                        spotLight.intensity = 0
                        hit_clock = new THREE.Clock()
                        movement = 0
                        zombie_follow = 0
                        scene.remove(zombie)
                        zombie_hit = 1
                    }
                }
            }

            else if(elapsedTime > 20 && zombie_stop){
                scene.remove(zombie)
                zombie_stop = 0
                zombie_follow = 0
            }


            if(elapsedTime_hugger > 5 && elapsedTime_hugger < 20){
                if(!hugger_run && hugger_follow){
                    hugger_run = 1
                    console.log("move")
                    let path = hugger_path.shift()
                    // path = hugger_path.shift()
                    console.log(hugger_path.length)
                    hugger.rotation.y = hugger_angle
                    if(hugger_path.length > 5){
                        setTimeout(function() {
                            hugger.position.set(path.x,-20,path.z)
                            spotLight.intensity = 0.8                    
                        },0)
                    }
                    else{
                        spotLight.intensity = 0
                        hit_clock_hugger = new THREE.Clock()
                        movement = 0
                        hugger_follow = 0
                        scene.remove(hugger)
                        hugger_hit = 1
                    }
                    hugger.rotation.y = hugger_angle
                }
            }

            else if(elapsedTime_hugger > 5 && elapsedTime_hugger < 20){
                scene.remove(hugger)
            }
        }

        if (keyboard[68]) { // A key (turn right)
            camera.rotation.y -= player.turnSpeed;
            zombie_angle -= player.turnSpeed
            hugger_angle -= player.turnSpeed
            const cameraDirection = new THREE.Vector3();
            camera.getWorldDirection(cameraDirection);
            // console.log("Camera Direction:", cameraDirection);
            // console.log("Spotlight Direction:", spotLight.target.position);
            // console.log("Camera:", cameraDirection);
            spotLight.target.position.x = spotLight.position.x + cameraDirection.x * lightTurn;
            spotLight.target.position.z = spotLight.position.z + cameraDirection.z * lightTurn;
        }

        if (keyboard[65]) { // D key (turn left)
            camera.rotation.y += player.turnSpeed;
            zombie_angle += player.turnSpeed
            hugger_angle += player.turnSpeed
            const cameraDirection = new THREE.Vector3();
            camera.getWorldDirection(cameraDirection)
            spotLight.target.position.x = spotLight.position.x + cameraDirection.x * lightTurn;
            spotLight.target.position.z = spotLight.position.z + cameraDirection.z * lightTurn;
        }
    }

    else{
        if(hit_clock && zombie_stop)
            hit_elapsedTime = hit_clock.getElapsedTime();
        
        if(hit_clock_hugger)
            hit_elapsedTime = hit_clock_hugger.getElapsedTime();
        
        if(zombie_hit===1 || hugger_hit===1 ){
            if(parseInt(hit_elapsedTime) >= 20){
                display_alert(20-parseInt(hit_elapsedTime),1000)    
                movement = 1
                spotLight.intensity = 0.8  
                if(hugger_hit===1)
                    hugger_hit=-1
                else
                    zombie_hit=-1      
            }
                
            else if(parseInt(hit_elapsedTime) < 20){
                setTimeout(() => {
                    display_alert(20-parseInt(hit_elapsedTime),-1)
                }, 1000);    
            }
        }
        

    }

    if (start_bunny2){
        let bunny = getObjectByName("bunny2")
        bunny.visible = true;

        bunny.position.x += 20
        let bunny_spotlight = getObjectByName("bunny2_light");
        // console.log(bunny_spotlight)
        if (bunny && bunny_spotlight){
            bunny_spotlight.target = bunny
            let model_position = new THREE.Vector3(bunny.position.x+100, bunny.position.y+100, bunny.position.z);
            bunny_spotlight.position.copy(model_position);
            if (bunny.position.x >= 100){
                start_bunny2 = false
                scene.remove(bunny)
                scene.remove(bunny_spotlight)
                let sound = sounds["bunny2"]
                sound.stop()
            }
        }
    }

    if (start_bunny){
        let bunny2 = getObjectByName("bunny2")

        scene.remove(bunny2)
        let bunny = getObjectByName("bunny")
        bunny.visible = true;

        bunny.position.x -= 20
        let bunny_spotlight = getObjectByName("bunny_light");
        // console.log(bunny_spotlight)
        if (bunny && bunny_spotlight){
            bunny_spotlight.target = bunny
            let model_position = new THREE.Vector3(bunny.position.x-100, bunny.position.y+100, bunny.position.z);
            bunny_spotlight.position.copy(model_position);
            if (bunny.position.x <= -9000){
                start_bunny = false
                scene.remove(bunny)
                scene.remove(bunny_spotlight)
                let sound = sounds["bunny"]
                sound.stop()
            }
        }
    }

    if (dark_man){
        let dark_man = getObjectByName("dark_man")
        let dark_man2 = getObjectByName("dark_man2")
        scene.remove(dark_man2)
        dark_man.visible = true;

        dark_man.position.x -= 20
        let dark_man_spotlight = getObjectByName("dark_man_light");
        // console.log(bunny_spotlight)
        if (dark_man && dark_man_spotlight){
            dark_man_spotlight.target = dark_man
            let model_position = new THREE.Vector3(dark_man.position.x, dark_man.position.y+100, dark_man.position.z+100);
            dark_man_spotlight.position.copy(model_position);
            if (dark_man.position.z >= 3000){
                dark_man = false
                scene.remove(dark_man)
                scene.remove(dark_man_spotlight)
                let sound = sounds["dark_man"]
                sound.stop()
            }
        }
    }

    if (dark_man2){
        let dark_man = getObjectByName("dark_man2")
        let dark_man2_model = getObjectByName("dark_man")
        scene.remove(dark_man2_model)
        dark_man.visible = true;

        dark_man.position.x += 20
        let dark_man_spotlight = getObjectByName("dark_man2_light");
        // console.log(bunny_spotlight)
        if (dark_man && dark_man_spotlight){
            dark_man_spotlight.target = dark_man
            let model_position = new THREE.Vector3(dark_man.position.x, dark_man.position.y+100, dark_man.position.z+100);
            dark_man_spotlight.position.copy(model_position);
            if (dark_man.position.z < -3000){
                dark_man2 = false
                scene.remove(dark_man)
                scene.remove(dark_man_spotlight)
                let sound = sounds["dark_man"]
                sound.stop()
            }
        }
    }
    // if(candle)
    //     candle.rotation.y += THREE.Math.degToRad(90) 

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    renderer.render( scene, camera );
};  
// addSounds()
document.addEventListener('click', onMouseClick);
animate();


