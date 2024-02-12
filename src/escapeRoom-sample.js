import * as THREE from 'three';
import * as orbit from 'OrbitControls';
import {TWEEN} from 'Tween';
import * as gltf from 'GLTFLoader'

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a circle geometry
const circleGeometry = new THREE.CircleGeometry(5, 32); // radius, segments
const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // yellow color
const circle = new THREE.Mesh(circleGeometry, circleMaterial);

// Add the circle to the scene
scene.add(circle);

// Position the camera
camera.position.z = 10;

const ambientLight = new THREE.DirectionalLight(0xffffff, 5); // color, intensity
ambientLight.target = circle
scene.add(ambientLight);

// Create an animation loop
const animate = function () {
  requestAnimationFrame(animate);

  // Rotate the circle
  circle.rotation.x += 0.01;
  circle.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

// Start the animation loop
animate();


// // import {inter}
// // import {RectAreaLightHelper } from "RectAreaHelper" 
// // "interaction": "https://cdn.skypack.dev/three.interactive",
// // "RectAreaHelper": "https://threejs.org/examples/jsm/helpers/RectAreaLightHelper.js"
// // import { gsap } from "gsap";
// function createRenderer() 
// {
//     const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true  });
//     // renderer.physicallyCorrectLights = true;
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//     renderer.setSize( window.innerWidth, window.innerHeight );
//     return renderer
// }

// const renderer = createRenderer()

// document.body.appendChild( renderer.domElement );
// const scene = new THREE.Scene();


// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 1000 );

// // const interactionManager = new InteractionManager(
// //     renderer,
// //     camera,
// //     renderer.domElement
// //   );

// /////////////////////////////////////////

// //COMMENT WHEN LIVE
// function testing(light){
//     const controls = new orbit.OrbitControls( camera, renderer.domElement );

//     camera.position.set( -1000, 8700, 0 );
//     camera.lookAt(-2400,0,0)
//     // const spot = new THREE.AmbientLight()
//     const spot = new THREE.RectAreaLight(0xffffff, 5, 4000, 4000)
//     spot.position.set(-2000,1300,0)
//     spot.rotation.x += degInRad(-90)
//     spot.rotation.z += degInRad(-90)
//     if(light === 1)
//         scene.add(spot)
// }

// function live(){
//     const controls = new orbit.OrbitControls( camera, renderer.domElement );

//     camera.position.set( 0, 150, 0 );
//     controls.target.set(0, 155, 0 );
    
//     controls.update();
//     camera.rotation.y += degInRad(90)
//     camera.rotation.x += degInRad(-90)
//     controls.rotateSpeed = 1.0;
//     controls.zoomSpeed = 1.2;
//     // controls.panSpeed = 0.8;
//     controls.keys = [ 65, 83, 68 ];
    
//     controls.enableZoom = false;
//     controls.enableRotate = false;
//     controls.enablePan = false;
// }

// // testing()


// scene.add(new THREE.AxesHelper(2000))


// camera.position.set( 100, 100, 100 );


// const circleGeometry = new THREE.CircleGeometry(50, 32); // radius, segments
// const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // yellow color
// const circle = new THREE.Mesh(circleGeometry, circleMaterial);

// // Add the circle to the scene
// scene.add(circle);

// const ambientLight = new THREE.AmbientLight(0xffffff, 5); // color, intensity
// scene.add(ambientLight);




// var collidableMeshList = [];
// var mouse = new THREE.Vector2();
// var modelRayCaster = new THREE.Raycaster();

// // function onMouseMove(event) {

// //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
// //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
// //   var userPassword = document.getElementById("password").value;
// // //   console.log(userPassword)
// //   DoorClick()
// //   BabyClick()
// //   PotraitClick()
// // }

// // var doorModel = []
// // var prevPassword = '-', newPassword = ''

// // function passwordInput(){
   
// //     while(prevPassword != newPassword){
// //         console.log("while")
// //         newPassword = document.getElementById("password").value
// //         console.log(newPassword)
// //         prevPassword = newPassword
// //         setTimeout(function() {
            
//         }, 4000);
//     }

// //     // else{
// //         // setTimeout(function() {
// //         //     document.getElementById("message").style.visibility = "hidden";
// //         //     document.getElementById("password").type = "hidden";
// //         //     document.getElementById("password").value = ""
// //         //     return true
// //         // }, 4000);
        
// //     // }
// // }


// // function DoorClick(){
// //     modelRayCaster.setFromCamera(mouse, camera);

// //     // calculate objects intersecting the picking ray
// //     var text = "ENTER PASSWORD TO UNLOCK"
// //     var intersects = modelRayCaster.intersectObjects(doorModel, true);
// //     var password
// //     // console.log("1")

// //     if (intersects.length > 0) {
        
// //         document.getElementById("message").style.visibility = "visible";
// //         document.getElementById("section").style.visibility = "visible";
// //         document.getElementById("message").innerHTML = text

// //         document.getElementById("password").type = "text"

// //         passwordInput()

// //         setTimeout(function() {
// //             document.getElementById("message").style.visibility = "hidden";
// //             document.getElementById("section").style.visibility = "hidden";

// //             document.getElementById("password").type = "hidden";
// //             document.getElementById("password").value = ""
// //             // return true
// //         }, 6000);
       
// //         // console.log(password)
// //     }
// // }

// // var babyModel = []
// // function BabyClick(){
// //     modelRayCaster.setFromCamera(mouse, camera);

// //     // calculate objects intersecting the picking ray
// //     var text = "Baby Text"
// //     var intersects = modelRayCaster.intersectObjects(babyModel, true);
// //     var password
// //     // console.log("1")

// //     if (intersects.length > 0) {
        
// //         document.getElementById("message").style.visibility = "visible";
// //         document.getElementById("section").style.visibility = "visible";
// //         document.getElementById("message").innerHTML = text

// //         // document.getElementById("password").type = "text"

// //         // passwordInput()

// //         setTimeout(function() {
// //             document.getElementById("message").style.visibility = "hidden";
// //             document.getElementById("section").style.visibility = "hidden";
// //             // return true
// //         }, 1000);
       
// //         // console.log(password)
// //     }
// // }

// // var potraitModel = []
// // function PotraitClick(){
// //     modelRayCaster.setFromCamera(mouse, camera);

// //     // calculate objects intersecting the picking ray
// //     var text = "Potrait Text"
// //     var intersects = modelRayCaster.intersectObjects(potraitModel, true);
// //     var password
// //     // console.log("1")

// //     if (intersects.length > 0) {
        
// //         document.getElementById("message").style.visibility = "visible";
// //         document.getElementById("section").style.visibility = "visible";
// //         document.getElementById("message").innerHTML = text

// //         // document.getElementById("password").type = "text"

// //         // passwordInput()

// //         setTimeout(function() {
// //             document.getElementById("message").style.visibility = "hidden";
// //             document.getElementById("section").style.visibility = "hidden";
// //             // return true
// //         }, 1000);
       
// //         // console.log(password)
// //     }
// // }

// // window.addEventListener('mousemove', onMouseMove, false);


// /////////////////////////////////////////
// var lights = []
// function lighting(x,z){
//     // var x = Math.floor(Math.random() * -3000) + 1;
//     // var z = Math.floor(Math.random() * -3000) + 1;

//     // console.log(x, z)
//     const sphere = new THREE.SphereGeometry( 1, 1, 1 );
//     var light = new THREE.PointLight( 'white', 0.8, 1200 );
//     // light.castShadow = true
//     light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 'white' } ) ) );
//     scene.add( light );
//     light.position.set(x,100,z)
//     lights.push(light)

// }


// function degInRad(deg) {
//     return deg * Math.PI / 180;
// }

// var oldCamera;
// // oldCamera = camera.clone();



// // function intersection(){

// //     oldCamera = camera.clone();
// //     const raycaster = new THREE.Raycaster(camera.position, oldCamera.position.normalize());

// //     raycaster.far = 100;
// //     raycaster.ray.origin.copy( camera.position );
// //     camera.getWorldDirection( raycaster.ray.direction );
// //     if(raycaster.intersectObjects(collidableMeshList).length>0){
// //         console.log("Hit")
// //         console.log(camera.position)
// //         return true
// //     }

// //     return false
// // }

// function wall(startX, startZ, height, width, type){
    
    // var textureLoader = new THREE.TextureLoader()
    // const customTexture = textureLoader.load('assets/textures/bloodWalls.jpg')

    // const texture = new THREE.MeshStandardMaterial({ 
    //     map: customTexture,
    //     // depthWrite: false,
    //     side: THREE.BackSide,
    // })
    // var mat = new THREE.MeshStandardMaterial({color:'#910707'});

//     var geo = new THREE.BoxGeometry( height, width, 2 );
//     var wall = new THREE.Mesh(geo, mat);
//     if( type === 'v'){
//         wall.position.set(startX, height/2.75, startZ)
//         // wall.polygonOffset = true;
//         // wall.polygonOffsetFactor = -0.1;
//         scene.add(wall)
//         collidableMeshList.push(wall)
       
        
        // wall.addEventListener("click", (event) => {
        //     console.log(wall.position.x, wall.position.z)
        // });
//     }
    
//     if(type === 'h'){
//         //horizontal
//         var wall2 = new THREE.Mesh(geo, mat);
//         // wall2.receiveShadow=true
//         wall2.rotation.y = Math.PI
//          / 2;
//         wall2.position.set(startX-height/2, height/2.75, startZ+height/2)
//         // wall2.polygonOffset = true;
//         // wall2.polygonOffsetFactor = -0.1;
//         scene.add(wall2)
//         collidableMeshList.push(wall2)
//         // interactionManager.add(wall2);
                
//         wall2.addEventListener("click", (event) => {
//             console.log(wall2.position.x+150, wall2.position.z-150)
//         });
//     }
// }


// // function hints(){
// //     var geo = new THREE.BoxGeometry( 400, 300, 2 );

// //     var textureLoader = new THREE.TextureLoader()
// //     const customTexture = textureLoader.load('assets/images/hints/1.JPG')

// //     const texture = new THREE.MeshStandardMaterial({ 
// //         map: customTexture,
// //         // depthWrite: false,
// //         side: THREE.BackSide,
// //     })

// //     var one = new THREE.Mesh(geo, texture);
// //     one.position.set(-3300,100,-1880)
// //     scene.add(one)


// //     const customTexture3 = textureLoader.load('assets/images/hints/3.JPG')
// //     var geo3 = new THREE.BoxGeometry( 300, 300, 2 );

// //     const texture3 = new THREE.MeshBasicMaterial({ 
// //         map: customTexture3,
// //         // depthWrite: false,
// //         side: THREE.BackSide,
// //     })

// //     var three = new THREE.Mesh(geo3, texture3);
// //     three.position.set(-2100,0,700)
// //     // three.rotation.y += degInRad(-90)
// //     three.rotation.x += degInRad(90)
// //     three.rotation.z += degInRad(90)
// //     scene.add(three)


// //     const customTexture4 = textureLoader.load('assets/images/hints/4.JPG')
// //     var geo4 = new THREE.BoxGeometry( 240, 300, 2 );

// //     const texture4 = new THREE.MeshBasicMaterial({ 
// //         map: customTexture4,
// //         // depthWrite: false,
// //         side: THREE.BackSide,
// //     })

// //     var four = new THREE.Mesh(geo4, texture4);
// //     four.position.set(-2400,200,-1300)
// //     four.rotation.y += degInRad(-90)
// //     // four.rotation.x += degInRad(90)
// //     // four.rotation.z += degInRad(90)
// //     scene.add(four)
// // }

// function maze(){
//     var height = 300, width = 200

//     wall(600, -150, height, width, 'h')

//     wall(300, -150, height, width, 'v')
//     wall(300, 150, height, width, 'v')

//     wall(0, -150, height, width, 'v')
//     wall(0, 150, height, width, 'v')
//     wall(-300, -150, height, width, 'v')
//     wall(-300, 150, height, width, 'v')
//     wall(-4200, -350, height, width, 'h')
//     //left
//     //bottom
//     // wall(0, 150, height, width, 'h')
//     // wall(0, 450, height, width, 'h')
//     // wall(0, 750, height, width, 'h')
//     // wall(0, 1050, height, width, 'h')
//     // wall(0, 1350, height, width, 'h')
//     // wall(0, 1650, height, width, 'h')
//     wall(-300, 1950, height, width, 'h')
//     wall(-300, -1850, height, width, 'h')
    
//     // wall(-300, 200, height, width, 'v')
//     wall(-300, 1950, height, width, 'h')
//     //upper
//     wall(-300, 150, height, width, 'h')
//     wall(-300, 450, height, width, 'h')
//     wall(-300, 750, height, width, 'h')
//     wall(-300, 1050, height, width, 'h')
//     wall(-300, 1350, height, width, 'h')
//     wall(-300, 1650, height, width, 'h')


//     //left room
//     //left walls
//     // wall(-300, 2250, height, width, 'v')
//     wall(-600, 2250, height, width, 'v')
//     wall(-900, 2250, height, width, 'v')
//     wall(-1200, 2250, height, width, 'v')
//     wall(-1500, 2250, height, width, 'v')
//     wall(-1800, 2250, height, width, 'v')
//     wall(-2100, 2250, height, width, 'v')
//     wall(-2200, 2250, height, width, 'v')
//     wall(-2500, 2250, height, width, 'v')
//     wall(-2800, 2250, height, width, 'v')
//     wall(-3100, 2250, height, width, 'v')
//     wall(-3300, 2250, height, width, 'v')
//     wall(-3500, 2250, height, width, 'v')
//     wall(-3800, 2250, height, width, 'v')

//     //right walls
//     wall(-900, 1950, height, width, 'v')
//     wall(-1200, 1950, height, width, 'v')
//     // wall(-1500, 1950, height, width, 'v')
//     wall(-1800, 1950, height, width, 'v')
//     wall(-2100, 1950, height, width, 'v')
//     wall(-2100, 1950, height, width, 'h')
//     // wall(-2500, 1950, height, width, 'v')
//     wall(-2800, 1950, height, width, 'v')
//     wall(-3100, 1950, height, width, 'v')
//     wall(-3300, 1950, height, width, 'v')
//     // wall(-3500, 1950, height, width, 'v')
//     wall(-3800, 1950, height, width, 'v')


//     // wall(-2200, 1650, height, width, 'h')
//     // wall(-2500, 1650, height, width, 'v')
//     wall(-2500, 1350, height, width, 'h')
//     wall(-2800, 1350, height, width, 'v')
//     wall(-3100, 1350, height, width, 'v')
//     wall(-3100, 1050, height, width, 'h')
//     wall(-3100, 1050, height, width, 'h')
//     wall(-3400, 1050, height, width, 'h')
//     wall(-3100, 750, height, width, 'h')
//     wall(-3100, 450, height, width, 'h')
//     wall(-3100, 150, height, width, 'h')
//     wall(-3400, 150, height, width, 'v')
//     wall(-3500, 150, height, width, 'v')

//     wall(-2250, 850, height, width, 'v')

//     wall(-3100, 150, height, width, 'v')
    
//     // wall(-2800, 400, height, width, 'h')
//     // wall(-2800, 150, height, width, 'h')


//     wall(-1800, 850, height, width, 'h')

//     wall(-2400, 250, height, width, 'v')
//     wall(-2700, 250, height, width, 'v')
//     wall(-2400, 250, height, width, 'v')
//     wall(-2800, -50, height, width, 'h')

//     wall(-2700, 0, height, width, 'v')
//     wall(-3000, 0, height, width, 'v')

//     wall(-2500, 1050, height, width, 'h')
//     wall(-3100, 1050, height, width, 'v')
//     wall(-3000, 250, height, width, 'v')
//     wall(-2800, 250, height, width, 'h')


//     // wall(-3000, 0, height, width, 'h')
//     // wall(-3000, 300, height, width, 'h')

//     // wall(-3000, 600, height, width, 'h')
//     // wall(-3000, 900, height, width, 'h')
//     // wall(-3000, 1050, height, width, 'h')




//     // wall(-3550, 900, height/2, 2*width, 'v')
//     wall(-3400, 750, height, width, 'h')
//     wall(-3400, 450, height, width, 'h')
//     wall(-3200, 1650, height, width, 'h')
//     wall(-3200, 1650, height, width, 'v')
//     wall(-3000, 1650, height, width, 'v')

//     wall(-1200, 1650, height, width, 'h')
//     wall(-1200, 1450, height, width, 'h')
//     wall(-1500, 1450, height, width, 'v')
//     // wall(-1800, 1450, height, width, 'v')

//     wall(-1800, 1150, height, width, 'h')
//     // wall(-1800, 850, height, width, 'h')
//     wall(-1800, 550, height, width, 'h')


//     wall(-2100, 850, height, width, 'v')
//     wall(-2100, 850, height, width, 'h')
//     wall(-2100, 1150, height, width, 'h')
//     // wall(-2100, 1350, height, width, 'h')
//     wall(-2100, 1650, height, width, 'v')
//     wall(-1800, 1650, height, width, 'v')
//     // wall(-1500, 1650, height, width, 'v')


//     wall(-2100, 550, height, width, 'v')
//     wall(-2400, 550, height, width, 'v')
//     wall(-2400, 250, height, width, 'h')



//     wall(-3500, 1650, height, width, 'h')
//     wall(-3800, 1650, height, width, 'v')

//     wall(-3800, 1350, height, width, 'h')
//     // wall(-3800, 1050, height, width, 'h')
//     wall(-3800, 750, height, width, 'h')
//     wall(-3800, 450, height, width, 'h')
//     // wall(-3800, 150, height, width, 'h')

//     wall(-4100, 150, height, width, 'v')
//     wall(-4200, 150, height, width, 'v')

//     wall(-3800, 150, height, width, 'v')
//     wall(-3500, -150, height, width, 'h')

//     wall(-3800, -450, height, width, 'h')
//     wall(-4200, -450, height, width, 'v')    
//     wall(-4100, -450, height, width, 'v')
//     wall(-3800, -450, height, width, 'v')
//     wall(-3500, -450, height, width, 'v')
//     wall(-3200, -450, height, width, 'v')
//     wall(-2900, -450, height, width, 'v')
    



//     wall(-600, 1650, height, width, 'v')
//     wall(-900, 1650, height, width, 'v')

//     wall(-1200, 1650, height, width, 'v')
//     wall(-2400, 1650, height, width, 'v')
//     wall(-2700, 1650, height, width, 'v')


//     wall(-900, 1350, height, width, 'h')
//     wall(-900, 1050, height, width, 'h')
//     // wall(-900, 850, height, width, 'h')

//     wall(-600, 1150, height, width, 'h')
//     wall(-600, 850, height, width, 'h')
//     wall(-600, 550, height, width, 'h')
//     wall(-600, 250, height, width, 'h')
//     wall(-600, -50, height, width, 'h')
//     wall(-600, -350, height, width, 'h')

//     wall(-900, -50, height, width, 'v')
//     wall(-1200, -50, height, width, 'v')
//     wall(-1500, -50, height, width, 'v')
//     wall(-1800, -50, height, width, 'v')

//     wall(-1800, -350, height, width, 'h')
//     wall(-1800, -650, height, width, 'h')
//     // wall(-1800, -950, height, width, 'h')
//     wall(-1800, -1250, height, width, 'h')
//     wall(-1800, -1550, height, width, 'h')

//     wall(-1800, -1550, height, width, 'v')
//     wall(-1500, -1550, height, width, 'v')
//     wall(-1200, -1550, height, width, 'h')


//     wall(-1800, -950, height, width, 'v')
//     // wall(-1500, -950, height, width, 'v')
//     wall(-1200, -950, height, width, 'v')

//     wall(-900, -1250, height, width, 'h')
//     wall(-900, -1550, height, width, 'h')
//     wall(-900, -1850, height, width, 'h')

//     wall(-1200, -1850, height, width, 'v')
//     wall(-1500, -1850, height, width, 'v')
//     wall(-1800, -1850, height, width, 'v')
//     wall(-2100, -1850, height, width, 'v')
//     wall(-2400, -1850, height, width, 'v')

//     wall(-3000, -1250, height, width, 'h')




//     wall(-2400, -1850, height, width, 'h')
//     wall(-2400, -1550, height, width, 'h')
//     wall(-2400, -1250, height, width, 'h')


//     wall(-2700, -950, height, width, 'v')
//     wall(-3000, -950, height, width, 'v')

//     wall(-2400, -1250, height, width, 'v')
//     wall(-2100, -1550, height, width, 'h')

//     wall(-900, 700, height, width, 'v')
//     wall(-1200, 700, height, width, 'v')

//     wall(-1200, 1200, height, width, 'v')
//     // wall(-1500, 1200, height, width, 'v')

//     wall(-1500, 300, height, width, 'v')
//     wall(-1200, 300, height, width, 'v')
//     wall(-1800, 300, height, width, 'v')
//     wall(-2100, 300, height, width, 'v')

//     wall(-2100, 0, height, width, 'h')
//     wall(-2100, -300, height, width, 'h')
//     wall(-2100, -600, height, width, 'h')
//     wall(-2100, -900, height, width, 'h')
    

//     wall(-2400, -700, height, width, 'v')
//     wall(-2700, -700, height, width, 'v')
//     wall(-3000, -700, height, width, 'v')
//     wall(-3300, -700, height, width, 'v')
    
//     wall(-3300, -1000, height, width, 'h')
//     wall(-3300, -1300, height, width, 'h')
//     wall(-3300, -1600, height, width, 'h')
//     wall(-3300, -1900, height, width, 'h')
//     wall(-3300, -1900, height, width, 'v')
//     wall(-3000, -1900, height, width, 'h')



//     wall(-1500, 900, height, width, 'h')
//     wall(-1500, 600, height, width, 'h')
//     wall(-1500, 300, height, width, 'h')


//     wall(-300, -350, height, width, 'h')
//     wall(-300, -650, height, width, 'h')
//     wall(-300, -950, height, width, 'h')
//     wall(-300, -1250, height, width, 'h')
//     wall(-300, -1550, height, width, 'h')
//     wall(-300, -2150, height, width, 'h')

//     wall(-600, -1850, height, width, 'h')
//     wall(-600, -1550, height, width, 'h')
//     wall(-600, -1250, height, width, 'h')
//     wall(-600, -950, height, width, 'h')
//     wall(-900, -650, height, width, 'v')
//     wall(-1200, -350, height, width, 'v')
//     wall(-1500, -350, height, width, 'v')
//     wall(-1500, -650, height, width, 'v')


//     wall(-900, -650, height, width, 'h')
//     wall(-1500, -650, height, width, 'h')


//     wall(-600, -2150, height, width, 'v')
//     wall(-900, -2150, height, width, 'v')
//     wall(-1200, -2150, height, width, 'v')
//     wall(-1500, -2150, height, width, 'v')
//     wall(-1800, -2150, height, width, 'v')
//     wall(-2100, -2150, height, width, 'v')
//     wall(-2400, -2150, height, width, 'v')
//     wall(-2700, -2150, height, width, 'v')
//     wall(-3000, -2150, height, width, 'v')
//     wall(-3300, -2150, height, width, 'v')
//     wall(-3600, -2150, height, width, 'v')
//     wall(-3900, -2150, height, width, 'v')
//     wall(-4200, -2150, height, width, 'v')


//     wall(-2700, -2150, height, width, 'h')
//     wall(-2700, -1850, height, width, 'h')
//     wall(-2700, -1550, height, width, 'h')


//     wall(-3800, -1850, height, width, 'h')
//     wall(-3800, -1550, height, width, 'h')
//     wall(-3800, -1350, height, width, 'h')
//     wall(-3800, -1050, height, width, 'h')

//     wall(-3800, -750, height, width, 'v')

    
//     wall(-3500, -2150, height, width, 'h')
//     wall(-3500, -1850, height, width, 'h')
//     wall(-3500, -1550, height, width, 'h')
//     wall(-3500, -1350, height, width, 'h')
//     wall(-3500, -1050, height, width, 'h')
    


//     wall(-3500, -1050, height, width, 'h')

//     wall(-4200, -2150, height, width, 'h')
//     wall(-4200, -1850, height, width, 'h')
//     wall(-4200, -1550, height, width, 'h')
//     wall(-4200, -1250, height, width, 'h')
//     wall(-4200, -950, height, width, 'h')
//     wall(-4200, -650, height, width, 'h')
//     wall(-4200, -50, height, width, 'h')
//     wall(-4200, 250, height, width, 'h')
//     wall(-4200, 450, height, width, 'h')
//     wall(-4200, 750, height, width, 'h')
//     wall(-4200, 1050, height, width, 'h')
//     wall(-4200, 1350, height, width, 'h')
//     wall(-4200, 1650, height, width, 'h')
//     wall(-4200, 1950, height, width, 'h')
//     wall(-4150, 2250, height, width, 'v')
    
//     wall(-4100, 2250, height, width, 'v')
//     wall(-4200, 2250, height, width, 'v')



//     wall(-600, -1850, height, width, 'v')
//     wall(-600, -350, height, width, 'v')

//     wall(-600, -350, height, width, 'v')
// }


// function audio(){
//     var audioLoader = new THREE.AudioLoader();
//     var listener = new THREE.AudioListener();
//     var audio = new THREE.Audio(listener);
//     audioLoader.load('assets/sounds/ghostly-humming.mp3', function(buffer) {
//         audio.setBuffer(buffer);
//         audio.setLoop(true);
//         audio.setVolume(2)
//         audio.play();
//     });

//     var audio1 = new THREE.Audio(listener);
//     audioLoader.load('assets/sounds/monster-howl.mp3', function(buffer) {
//         audio1.setBuffer(buffer);
//         audio1.setLoop(true);
//         audio1.setVolume(0.2)
//         // audio1.play();
//     });
// }


// function initLights(){
//     lighting(-650, 700)
//     lighting(-1150, 1500)
//     lighting(-1500, 900)
//     lighting(-2400, 1800)
//     lighting(-3500, 1600)
//     lighting(-3800, 200)
//     lighting(-4200, -600)

    
//     lighting(-1130, 100)
//     lighting(-2900, 0)
//     lighting(-2800, -800)
//     lighting(-3600, -1600)


//     lighting(-2300, -1700)
//     lighting(-1100, -1600)
//     lighting(-1700, -1000)
//     // lighting(-1400, -800)
//     lighting(-1800, -200)

//     lighting(-900, -800)
//     // lighting(-700, -1300)
//     // lighting(-900, -200)


//     // lighting(-1200, 1500)
//     // lighting(-600, 2000)
    
//     // lighting(-4200, 1300)

//     lighting(-2400, 900)

//     lighting(-950,1550)

//     //-3000,-1600
//     // lighting(-2100, 2100)
//     // lighting(-3200, 2100)
//     // lighting(-4200, 2000)
    
//     // lighting(-3800, 1200)
//     // lighting(-3800, 300)
//     // lighting(-4200, 800)

//     // lighting(-3400, 1500)
//     // lighting(-3400, 700)



//     // lighting(-2500, 1800)

//     // lighting(-1800, 1450)
//     // lighting(-2100, 1100)
//     // lighting(-1500, 1800)
//     // lighting(-1800, 400)
//     // lighting(-2400, -200)

//     lighting(-4000,1800)

// }

// function popup(){
//     var text = "ABC"
//     document.getElementById("message").innerHTML = text

//     var x = document.getElementById("message").value;
//     console.log(x)
//     // setTimeout(function() {
//     //     document.getElementById("a").style.visibility = "hidden";
//     //   }, 2000);

// }

// const loader = new gltf.GLTFLoader();
// var door, potrait, reaper, monster, baby, web


// function addWeb(){
//     loader.load( 'assets/models/webs/scene.gltf', 
//     function ( gltf ) {
//             web = gltf.scene;
//             scene.add(web)
//             models.push(web)
//             gltf.scene.scale.set(1000,1000,1000)
//             gltf.scene.position.set(0,0,0)
//             // gltf.scene.rotation.z=THREE.Math.degToRad(-90);
//             // gltf.scene.rotation.x=THREE.Math.degToRad(180);
//             // gltf.scene.rotation.y=THREE.Math.degToRad(-90);
//             // const spot = new THREE.DirectionalLight()
//             var spot = new THREE.SpotLight( 'white', 10, 1000 );
//             spot.target = web
//             // const target = new THREE.Vector3(0,0,0)
//             // spot.intensity=0.5
//             spot.position.set(500,10000,0)
//             spot.castShadow = true
//             web.receiveShadow = true
//             spot.target = web
//             // spot.penumbra = 0.05
//             scene.add(spot) 
        
//         }
//     )   
// }


// function addBaby(){
//     loader.load( 'assets/models/baby/scene.gltf', 
//     function ( gltf ) {
//             baby = gltf.scene;
//             scene.add(baby)
//             babyModel.push(baby)
//             gltf.scene.scale.set(3,3,3)
//             gltf.scene.position.set(-950,40,1550)
//             // gltf.scene.rotation.z=THREE.Math.degToRad(-90);
//             // gltf.scene.rotation.x=THREE.Math.degToRad(180);
//             // gltf.scene.rotation.y=THREE.Math.degToRad(-90);
//             // const spot = new THREE.DirectionalLight()
//             var spot = new THREE.SpotLight( 'white', 10, 1000 );
//             spot.target = baby
//             // const target = new THREE.Vector3(0,0,0)
//             // spot.intensity=0.5
//             spot.position.set(500,10000,0)
//             spot.castShadow = true
//             baby.receiveShadow = true
//             spot.target = baby
//             // spot.penumbra = 0.05
//             // scene.add(spot) 
        
//         }
//     )   
// }

// function addMonster(){
//     loader.load( 'assets/models/monster/scene.gltf', 
//     function ( gltf ) {
//             monster = gltf.scene;
//             scene.add(monster)
//             // models.push(monster)
//             gltf.scene.scale.set(1,1,1)
//             gltf.scene.position.set(-3800,0,1800)
//             // gltf.scene.rotation.z=THREE.Math.degToRad(-90);
//             // gltf.scene.rotation.x=THREE.Math.degToRad(180);
//             gltf.scene.rotation.y=THREE.Math.degToRad(-90);
//             // const spot = new THREE.DirectionalLight()
//             var spot = new THREE.SpotLight( 'white', 10, 1000 );
//             spot.target = monster
//             // const target = new THREE.Vector3(0,0,0)
//             // spot.intensity=0.5
//             spot.position.set(500,10000,0)
//             spot.castShadow = true
//             monster.receiveShadow = true
//             spot.target = monster
//             // spot.penumbra = 0.05
//             // scene.add(spot) 
        
//         }
//     )   
// }

// function addReaper(){
//     loader.load( 'assets/models/reaper/scene.gltf', 
//     function ( gltf ) {
//             reaper = gltf.scene;
//             scene.add(reaper)
//             // models.push(reaper)
//             gltf.scene.scale.set(4000,4000,4000)
//             gltf.scene.position.set(-2100,0,700)
//             // gltf.scene.rotation.z=THREE.Math.degToRad(-90);
//             // gltf.scene.rotation.x=THREE.Math.degToRad(180);
//             gltf.scene.rotation.y=THREE.Math.degToRad(270);
//             // const spot = new THREE.DirectionalLight()
//             var spot = new THREE.SpotLight( 'white', 10, 1000 );
//             spot.target = reaper
//             // const target = new THREE.Vector3(0,0,0)
//             // spot.intensity=0.5
//             spot.position.set(500,500,0)
//             spot.castShadow = true
//             reaper.receiveShadow = true
//             spot.target = reaper
//             // spot.penumbra = 0.05
//             // scene.add(spot) 
        
//         }
//     )   
// }

// function addPotrait(){
//     loader.load( 'assets/models/potrait/scene.gltf', 
//     function ( gltf ) {
//             potrait = gltf.scene;
//             scene.add(potrait)
//             potraitModel.push(potrait)
//             gltf.scene.scale.set(250,250,250)
//             // gltf.scene.position.set(0,0,0)
//             gltf.scene.position.set(-1050,130,1550)

//             // gltf.scene.rotation.z=THREE.Math.degToRad(-90);
//             // gltf.scene.rotation.x=THREE.Math.degToRad(180);

//             gltf.scene.rotation.y=THREE.Math.degToRad(90);
//             // const spot = new THREE.DirectionalLight()
//             var spot = new THREE.SpotLight( 'white', 10, 1000 );
//             spot.target = potrait
//             // const target = new THREE.Vector3(0,0,0)
//             // spot.intensity=0.5
//             spot.position.set(500,500,0)
//             spot.castShadow = true
//             potrait.receiveShadow = true
//             spot.target = potrait
//             // spot.penumbra = 0.05
//             // scene.add(spot) 
        
//         }
//     )   
// }

// function addDoor(){
//     loader.load( 'assets/models/door/scene.gltf', 
//     function ( gltf ) {
//             door = gltf.scene;
//             scene.add(door)
//             doorModel.push(door)
//             // door.name = "123"
//             gltf.scene.scale.set(1.5,1.5,1.5)
//             // gltf.scene.position.set(-3545,350,-1000)
//             gltf.scene.position.set(-100,350,0)
            // gltf.scene.traverse( function ( child ) {
            //     if ( child.isMesh ) {
            //         collidableMeshList.push(child)
            //     }
            // } );
//             // collidableMeshList.push(door)




//             // gltf.scene.rotation.z=THREE.Math.degToRad(-90);
//             // gltf.scene.rotation.x=THREE.Math.degToRad(180);
//             gltf.scene.rotation.y=THREE.Math.degToRad(-90);
//             // const spot = new THREE.DirectionalLight()
//             var spot = new THREE.PointLight( 'white', 10, 1000 );

//             // const target = new THREE.Vector3(0,0,0)
//             // spot.intensity=0.5
//             spot.position.set(500,500,0)
//             spot.castShadow = true
//             door.receiveShadow = true
//             spot.target = door
//             // spot.penumbra = 0.05
//             scene.add(spot) 
        
//         }
//     )   
// }

// function removeDoor(){
//     scene.remove(door)
// }

// // testing(0)
// // testing(1)
// // live()

// function init(){
//     // document.getElementById("section").style.visibility = "hidden";
//     // document.getElementById("password").type = "hidden"
//     // document.getElementById("message").style.visibility = "hidden";
//     // const spot = new THREE.AmbientLight()
//     // spot.position.y = 5000
//     // // scene.add(spot)
//     // // hints()
//     // audio()
//     // maze()

//     // addWeb()
//     // addMonster()
//     // addReaper()
//     // addPotrait()
//     // addBaby()
//     // addDoor()
//     // initLights()
//     // for(let i = 0; i < collidableMeshList.length; i++){
//     //     var name = collidableMeshList[i].name
//     //     console.log(name)
//     //     // if(name[0] === 'd'){
//     //     //     console.log(collidableMeshList[i])   
//     //     // }
//     // }
//     // console.log(collidableMeshList[0])

//     // var textureLoader = new THREE.TextureLoader()
//     // const customTexture = textureLoader.load('assets/textures/mud.jpg')

//     // // const boxGeometry = new THREE.SphereGeometry(50, 50, 50)
//     // const texture = new THREE.MeshStandardMaterial({ 
//     //     map: customTexture
//     // })

//     // var base = 4000
//     // // var material = new THREE.MeshStandardMaterial({color:'#fcd9d9'});
//     // var geometery = new THREE.BoxGeometry( base, base, 60 );
    
//     // var plane = new THREE.Mesh(geometery, texture)
//     // plane.receiveShadow = true;
//     // plane.rotation.x=THREE.Math.degToRad(-90);
//     // plane.position.set(0, 0, 0)
//     // // scene.add(plane)

//     // // interactionManager.add(plane);
//     // plane.addEventListener("click", (event) => {
//     // console.log(plane.position)
//     // });



//     animate()
// }
// var keyboard = {};
// function keyDown(e) {
//     keyboard[e.keyCode] = true;
// }

// function keyUp(e) {
//     keyboard[e.keyCode] = false;
// }

// var speed = 30
// var turn = 5
// let angle = degInRad(90)
// var player = { height: 1.8, speed: 10, turnSpeed: Math.PI * 0.02 };

// var direction = "forward"
// let x,y,z
// let x_rotation, y_rotation, z_rotation
// let alpha = 0, theta = 0.05
// const clock = new THREE.Clock();
// var i = 0, len = 0, jump = 2

// function lightMovement(){
//     len = lights.length
//     i = 0
//     while (i < len) {
//         x_rotation = lights[i].rotation.x
//         y_rotation = lights[i].rotation.y
//         z_rotation = lights[i].rotation.z
    
//         lights[i].rotation.x += theta
//         lights[i].rotation.y += theta
//         lights[i].rotation.z += theta
    
    
//         x = 2*Math.sin( x_rotation ) 
//         y = 2*Math.cos( y_rotation ) 
//         z = 2*Math.cos( z_rotation )
        
//         lights[i].position.x += x
//         lights[i].position.y += y
//         lights[i].position.z += z    
//         i += 1
//         // console.log(i%len, len)


//     }
// }

// // var geo = new THREE.BoxGeometry( 400, 300, 2 );

// // var textureLoader = new THREE.TextureLoader()

// // const customTexture2 = textureLoader.load('assets/images/hints/2.JPG')

// // const texture2 = new THREE.MeshBasicMaterial({ 
// //     map: customTexture2,
// //     // depthWrite: false,
// //     side: THREE.BackSide,
// // })

// // var two = new THREE.Mesh(geo, texture2);
// // two.position.set(-400,100,0)
// // // two.rotation.y += degInRad(90)
// // two.rotation.x += degInRad(90)
// // // two.rotation.z += degInRad(180)
// // scene.add(two)

// let status = false

// function animate() 
// {   
//     // light1.position.x -= 3
//     // two.rotation.x += 0.05
//     // two.rotation.x += 0.05
//     requestAnimationFrame( animate );  
//     TWEEN.update() 
//     if (keyboard[87]) { // W key

//         var move = intersection()
//         if(move === false){
//             camera.position.x -= Math.sin(camera.rotation.y) * player.speed
//             camera.position.z -= Math.cos(camera.rotation.y) * player.speed    
//         }

//     }

//     if (keyboard[83]) { // S key
//         var move = intersection()
        
//         if(move === false){
//             console.log(move, direction)    
//             camera.position.x += Math.sin(camera.rotation.y) * player.speed
//             camera.position.z += Math.cos(camera.rotation.y) * player.speed
//         }

//         // else{
//         //     direction = "back"
//         // }
//     }

//     if (keyboard[68]) { // A key
//         camera.rotation.y -= player.turnSpeed;
//     }

//     if (keyboard[65]) { // D key
//         camera.rotation.y += player.turnSpeed;
//     }

//     lightMovement()
//     // DoorClick()    
//     // console.log(document.getElementById("password").value)
//     // var pass = document.getElementById("password").value
//     // if(pass.length === 4){
//     //     if(pass === "1234"){
//     //         console.log("Correct")
//     //         removeDoor()
//     //         pass = ""
//     //         document.getElementById("message").style.visibility = "hidden";
//     //         document.getElementById("section").style.visibility = "hidden";
//     //         document.getElementById("password").type = "hidden";
//     //         document.getElementById("password").value = ""
//     //         doorModel = []
//     //     }
//     // }
//     renderer.render( scene, camera );
// };

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);


// window.onload = init;
