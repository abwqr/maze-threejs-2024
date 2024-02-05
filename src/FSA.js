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
scene.add(new THREE.AxesHelper(2000))

// function cameraControl(){
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 10000 );
    
    camera.position.set( 0, 200, -600 );
// }

// const camera = cameraControl()

// function orbitControl(){
    

    const controls = new orbit.OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 200, 410 );
    // controls.target.set( 0, 0, 0 );
    controls.update();
    controls.enableDamping = true
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.keys = [ 65, 83, 68 ];
    
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;

//     return controls
// }


function lighting(height, width, x, y, z){
    // const spot = new THREE.SpotLight()
    // const helper = new THREE.SpotLightHelper(spot)
    const spot = new THREE.RectAreaLight(0xffffff, 8, width, height)
    spot.position.set(x, y, z)
    spot.lookAt(0,0,0)

    scene.add(spot)
}


function floor(base){
    var geo = new THREE.BoxGeometry( base, base, 60 );
    var mat = new THREE.MeshStandardMaterial({color: 0x525252});
    var plane = new THREE.Mesh(geo, mat);
    plane.rotation.x=THREE.Math.degToRad(-90);
    plane.position.set(0, 0, 0)
    plane.receiveShadow = true;
    scene.add(plane)
    return plane
}


function sideWalls(height, width, type){
    var geo = new THREE.BoxGeometry( height, width, 5 );
    var mat = new THREE.MeshStandardMaterial({color: 0xa4396});
    var plane = new THREE.Mesh(geo, mat);
    plane.rotation.x=plane.rotation.y = Math.PI / 2;
    if(type)
        plane.position.set(height, width/4, 0)
    else    
        plane.position.set(-height, width/4, 0)
    // plane.receiveShadow = true;
    scene.add(plane)
}


function frontWalls(height, width, type){

    var geo = new THREE.BoxGeometry( height, width, 5 );
    var mat = new THREE.MeshStandardMaterial({color: 0xa4396});
    var plane = new THREE.Mesh(geo, mat);
    if(type)
        plane.position.set(0, height/4, width)
    else    
        plane.position.set(0, height/4, -width)
    // plane.receiveShadow = true;
    // camera.lookAt(plane.position.x, plane.position.y, plane.position.z)

    scene.add(plane)

}

// camera.rotation.set( 0.01,0,0 );
const loader = new gltf.GLTFLoader();
let model
let mixer, action
let face = 1
let modelPosZ = 0, modelPosX = 0

function structure(){
    const height = 2000
    const width = height/2
    const base = floor(height)



    sideWalls(width, height, 0)
    sideWalls(width, height, 1)
    frontWalls(height, width, 1)
    frontWalls(height, width, 0)

    lighting(height, width, 0, height, 0)

    function loadLogo(){
        loader.load( 'assets/models/logo.gltf', 
        function ( gltf ) {
                model = gltf.scene;
                scene.add(model)
                gltf.scene.scale.set(15,15,15)
                gltf.scene.position.set(0,250,100)
                gltf.scene.rotation.z=THREE.Math.degToRad(-90);
                gltf.scene.rotation.x=THREE.Math.degToRad(180);
                gltf.scene.rotation.y=THREE.Math.degToRad(-90);
            }
        )   


        loader.load( 'assets/models/logo.gltf', 
        function ( gltf ) {
                model = gltf.scene;
                scene.add(model)
                gltf.scene.scale.set(15,15,15)
                gltf.scene.position.set(0,250,100)
                gltf.scene.rotation.z=THREE.Math.degToRad(-90);
                gltf.scene.rotation.x=THREE.Math.degToRad(180);
                gltf.scene.rotation.y=THREE.Math.degToRad(90);
            }
        )
    }
    
    // loadLogo()

}

structure()

let currentIndex = 0
var temp = new THREE.Vector3;
const goal = new THREE.Object3D;
goal.position.set(0, 6, -15);

var clip
var animations
let flag = 0

function modelLoader(index, modelPosX, modelPosZ){
    loader.load( 'assets/textures/RobotExpressive.glb', 
        function ( gltf ) {
            console.log(flag)
            if(flag == 0){
                // console.log(modelPosZ, index)
                model = gltf.scene;
                gltf.scene.castShadow = true;
                model.add(goal)
                scene.add(model)
                gltf.scene.scale.set(40,40,40)
                gltf.scene.position.set(modelPosX,45,modelPosZ)
                flag++
            }

            // if(flag === 1){
                mixer = new THREE.AnimationMixer( model );
                animations = gltf.animations
            //     flag++
            // }

            clip = animations[index]
            action = mixer.clipAction( clip )
            action.play();
            // action.loop = THREE.LoopOnce
            action.fadeOut(1)
            // animateModel(index)


        }, undefined, function ( e ) {
            console.error( e );
        } 
    );
}


let modelState = 0
let keyPress = 0


modelLoader(2, modelPosX, modelPosZ)
// flag++

const mat = new THREE.BoxGeometry(100,100,100)
const mesh = new THREE.MeshBasicMaterial()
const obj = new THREE.Mesh(mat, mesh)
obj.position.set(0,0,0)
const box = new THREE.BoxHelper( obj, 0xffff00 );
// scene.add( box );


function changeFace(i, type){
    if(type === 'right'){
        if(i === 4)
            return 1
        
        else    
            i += 1
    }

    else{
        if(i === 1)
            return 4
        
        else    
            i -= 1
    }
    return i
}



document.onkeyup = (e) => {
    e = e || window.event;
    var tween = new TWEEN.Tween(model.position)
    

    if (e.keyCode === 38) {
        //   console.log('up arrow pressed')
        // keyPress++

        // if(keyPress > 1){
        //     setTimeout(() => {
        //         keyPress = 0
        //     }, 2000)
        // }
        
        modelLoader(10, modelPosX, modelPosZ)

        // action.loop = THREE.LoopOnce
        
        // keyPress++
        if(face === 1){
            tween.to(model.position.clone().setZ(model.position.z+60), 1000)
        }

        else if(face === 2)
            tween.to(model.position.clone().setX(model.position.x-60), 1000)
        
        else if(face === 3)
            tween.to(model.position.clone().setZ(model.position.z-60), 1000)

        else if(face === 4)
            tween.to(model.position.clone().setX(model.position.x+60), 1000)


        tween.start();
        // animateModel(0)
        // scene.remove(model)
        // modelLoader(10, modelPosX, modelPosZ, flag)
        // playAnimation();
        
        // setTimeout(animateModel(2), 1000)

    
    } else if (e.keyCode === 40) {
        //   console.log('down arrow pressed')
            // camera.position.z -= 10
            
        } else if (e.keyCode === 37) {
        //   console.log('left arrow pressed')
            model.rotation.y += degInRad(90)
            face = changeFace(face, 'left')
            console.log(face)
    
        } else if (e.keyCode === 39) {
        //   console.log('right arrow pressed')
            model.rotation.y += degInRad(-90)
            face = changeFace(face, 'right')
            console.log(face)
        }
        else if (e.keyCode === 65) {
        //   console.log('a')
            camera.rotation.y -= 0.05
        }
        else if (e.keyCode === 68) {
        //   console.log('d')
            camera.rotation.y += 0.05
        }    
        // action.fadeOut(2)


  }






// const materialParams = {
//     meshColor : base.material.color.getHex()
// };

// function datGUI(){
//     const gui = new dat.GUI()
//     const obj1 = gui.addFolder('base')

//     obj1.open()

//     gui
//     .addColor(materialParams, 'meshColor')
//     .onChange((value) => base.material.color.set(value))
// }

// datGUI()

// camera.rotateOnAxis += 6
// camera.rotateX(100)
const clock = new THREE.Clock()

function animate() {
    
    requestAnimationFrame( animate );
    // console.log(collision)
    TWEEN.update()

    
    const dt = clock.getDelta();
    if ( mixer ) mixer.update( dt );

    temp.setFromMatrixPosition(goal.matrixWorld);
    camera.position.lerp(temp, 0.015);
    camera.lookAt( model.position.clone() );


    renderer.render( scene, camera );

};

animate();
