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


// Declare modelsArray as a global variable
let modelsArray = [];
const loader = new gltf.GLTFLoader(); // Correct the loader instantiation

const transparentMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5, // Set the opacity (0 is fully transparent, 1 is fully opaque)
});

// Create a transparent group






var lights = []
function lighting(x,z){
    // var x = Math.floor(Math.random() * -3000) + 1;
    // var z = Math.floor(Math.random() * -3000) + 1;

    // console.log(x, z)
    const sphere = new THREE.SphereGeometry( 1, 1, 1 );
    var light = new THREE.PointLight( 'gray', 0.5, 1500, );
    // light.castShadow = true
    light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 'white' } ) ) );
    scene.add( light );
    light.position.set(x,10,z)
    lights.push(light)

}


var base = 10
var wall_length = 100
var wall_height = 100
var path_width = 8
var wall_space = (wall_length/1.4 + path_width/2) 

var collidableMeshList = [];
var oldCamera;
// oldCamera = camera.clone();



function bottom_left_corner(center_x, center_z){
    var x = center_x - wall_space
    var z = center_z  - wall_space   
    // console.log(x-wall_length/2,z-wall_length/2)
    
    var geo = new THREE.BoxGeometry( wall_height, wall_length, 5 );
    var mat = new THREE.MeshStandardMaterial({color: 0x525252});
    var textureLoader = new THREE.TextureLoader()
    const customTexture = textureLoader.load('assets/textures/bloodWalls.jpg')

    const texture = new THREE.MeshStandardMaterial({ 
        map: customTexture,
        // depthWrite: false,
        side: THREE.BackSide,
    })
    var mat = new THREE.MeshStandardMaterial({color:'#910707'});
    var plane = new THREE.Mesh(geo, mat);
    plane.rotation.z=THREE.Math.degToRad(-90);
    plane.position.set(x, 50, z-wall_length/2)
    plane.receiveShadow = true;
    scene.add(plane)

    var plane2 = new THREE.Mesh(geo, mat);
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
    
    var geo = new THREE.BoxGeometry( wall_height, wall_length, 5 );
    var mat = new THREE.MeshStandardMaterial({color: 0x525252});
    var plane = new THREE.Mesh(geo, mat);
    plane.rotation.z=THREE.Math.degToRad(-90);
    plane.position.set(x, 50, z+wall_length/2)
    plane.receiveShadow = true;
    scene.add(plane)

    var plane2 = new THREE.Mesh(geo, mat);
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
    
    var geo = new THREE.BoxGeometry( wall_height, wall_length, 5 );
    var mat = new THREE.MeshStandardMaterial({color: 0x525252});
    var plane = new THREE.Mesh(geo, mat);
    plane.rotation.z=THREE.Math.degToRad(-90);
    plane.position.set(x, 50, z+wall_length/2)
    plane.receiveShadow = true;
    scene.add(plane)

    var plane2 = new THREE.Mesh(geo, mat);
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
    // console.log(x-wall_length/2,z-wall_length/2)
    
    var geo = new THREE.BoxGeometry( wall_height, wall_length, 5 );
    var mat = new THREE.MeshStandardMaterial({color: 0x525252});
    var plane = new THREE.Mesh(geo, mat);
    plane.rotation.z=THREE.Math.degToRad(-90);
    plane.position.set(x, 50, z-wall_length/2)
    plane.receiveShadow = true;
    scene.add(plane)

    var plane2 = new THREE.Mesh(geo, mat);
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
}

build_maze(2)
const spot = new THREE.AmbientLight(0xffffff, 8)
scene.add(spot)
// live()

// Assuming you have a scene and camera already set up




var player = { height: 1.8, speed: 3, turnSpeed: Math.PI * 0.025 };

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

function addModelBoundary(name,box_scale,x,y,z){
    const transparentMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 1,
    });
    
    const transparentBoxGeometry = new THREE.BoxGeometry(1, box_scale, box_scale);
    const transparentBox = new THREE.Mesh(transparentBoxGeometry, transparentMaterial);
    transparentBox.position.set(x,y,z)
    transparentBox.name = name.concat("_box")
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
                console.log(animations.length)
                if (animations && animations.length > 0) {
                    const mixer = new THREE.AnimationMixer(model);
                    const action = mixer.clipAction(animations[animation_num]);
                    action.timeScale = 1.0;
                    action.play();

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

(async () => {
    // await  addModel("greenModel",-100,0,14,-110,0,60);

    //// bunny
    await addModel("vanny.glb","bunny2",-1800,0,180,14,false,5,"evil-laughing.mp3",10);
    await addModel("vanny.glb","bunny",0,0,180,14,false,5,"evil-laughing.mp3",10);
    addModelBoundary("bunny",80,-810,50,180)
    addModelBoundary("bunny2",80,-800,50,180)
    let bunny = getObjectByName("bunny") 
    bunny.rotation.y += THREE.Math.degToRad(-90);
    let bunny2 = getObjectByName("bunny2") 
    bunny2.rotation.y += THREE.Math.degToRad(90);
    ////

    //// chess
    // await addModel("decorative_chess.glb","chess",1125,0,-750,70,true,0,"evil-laughing.mp3",10);
    // let chess = getObjectByName('chess')
    // clickList.push(chess)
    ////

    //// black man
    // await addModel("black_man.glb","black_man",-1800,0,180,14,false,5,"evil-laughing.mp3",10);
    // await addModel("black_man.glb","black_man2",0,0,180,14,false,5,"evil-laughing.mp3",10);
    addModelBoundary("black_man",80,-550,50,-800)
    let black_man_box = getObjectByName("black_man_box")
    black_man_box.rotation.y += THREE.Math.degToRad(90)

    addModelBoundary("black_man2",80,-550,50,-790)
    let black_man_box2 = getObjectByName("black_man2_box")
    black_man_box2.rotation.y += THREE.Math.degToRad(90)
    // addModelBoundary("black_man2",80,-800,50,180)
    ////
    
    // await addModel("the_backrooms-entity_3_smiler.glb","dark_running_man",0,0,0,30,true,0,"evil-laughing.mp3",10);
    // const darkMan = getObjectByName("dark_running_man")
    // addLight("dark_running_man")
    // clickedObject.addEventListener('click', showFullscreenImage);
    // addLight("bwunny");
    // addSounds()
})();



let start_bunny = false
let start_bunny2 = false

function intersection(direction, distance) {
    const raycaster = new THREE.Raycaster(camera.position, direction);
    raycaster.far = distance;

    // Check for intersections
    const intersections = raycaster.intersectObjects(collidableMeshList, true);
    // console.log(collidableMeshList)
    if (intersections.length > 0) {
        console.log(intersections)
        if (intersections[0].object.name === "greenModel-box"){
            const model = getObjectByName("greenModel");

            if (model) {
                // scene.remove(model)
                // console.log("Model is not visible:", model.visible);
                model.visible = true;

                addLight("greenModel");
                // scene.add(model)
                // console.log("Model is now visible:", model.visible);
            }
        }

        if (intersections[0].object.name === "bunny-box"){
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

        if (intersections[0].object.name === "bunny2-box"){
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
        const imageUrl = 'assets/images/moon.jpg';

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


const clock = new THREE.Clock()
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
function animate() {
    // requestAnimationFrame(() => animate(modelsArray));
    requestAnimationFrame( animate );
    lightMovement()
    // console.log(modelsArray)
    TWEEN.update() 
    const moveDirection = new THREE.Vector3();
    
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
    }

    if (keyboard[68]) { // A key (turn right)


        camera.rotation.y -= player.turnSpeed;
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
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);
        // console.log("Camera Direction:", cameraDirection);
        // console.log("Spotlight Direction:", spotLight.target.position);
        // console.log("Camera:", cameraDirection);
        spotLight.target.position.x = spotLight.position.x + cameraDirection.x * lightTurn;
        spotLight.target.position.z = spotLight.position.z + cameraDirection.z * lightTurn;
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

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    renderer.render( scene, camera );
};  
// addSounds()
document.addEventListener('click', onMouseClick);
animate();


