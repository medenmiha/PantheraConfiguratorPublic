import * as THREE from 'https://threejs.org/build/three.module.js';

import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://threejs.org/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from 'https://threejs.org/examples/jsm/utils/RoughnessMipmapper.js';

var container, controls, controls1;
var camera, scene, renderer, mixer, clock, camera1;
var exteriorCamera, interiorCamera, selectedCamera, selectedControls;
var action1, action2, action3, clip1, clip2, clip3;
var cameraPosition = { x : 0, y: 0, z: 0 };
var pogoj = false;
var cameraLook = new THREE.Vector3(0, 0, 0);  //

var partsArray = []; //

var DesniPrednjiSedez_modro_crni, DesniPrednjiSedez_oranzno_sivo_beli, DesniPrednjiSedez_zeleno_crni, LeviPrednjiSedez_modro_crni, LeviPrednjiSedez_oranzno_sivo_beli, LeviPrednjiSedez_zeleno_crni, ZadnjiSedezi_modro_crni, ZadnjiSedezi_oranzno_sivo_beli, ZadnjiSedezi_zeleno_crni, DesniPrednjiSedez_rdece_crni, LeviPrednjiSedez_rdece_crni, ZadnjiSedezi_rdece_crni;


scene = new THREE.Scene();
clock = new THREE.Clock();

//CAMERAS
exteriorCamera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
interiorCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.25, 20 );

selectedCamera = exteriorCamera;

container = document.createElement( 'div' );
document.body.appendChild( container );

renderer = new THREE.WebGLRenderer( { antialias: false } );  //true
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.8;
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild( renderer.domElement );

controls = new OrbitControls( selectedCamera, renderer.domElement );
controls.minDistance = 2;
controls.maxDistance = 10
controls.target.set( 0, 0, 0 );

//exteriorConfiguration(); //Default start from outside configuration

new RGBELoader()
  .setDataType( THREE.UnsignedByteType )
  .setPath( 'https://download.polyhaven.com/HDRIs/2k/' )
  .load( 'abandoned_tank_farm_04_2k.hdr', function ( texture ) {

    var envMap = pmremGenerator.fromEquirectangular( texture ).texture;

    scene.background = envMap;
    scene.environment = envMap;

    texture.dispose();
    pmremGenerator.dispose();

    // model

    // use of RoughnessMipmapper is optional

    } );

var roughnessMipmapper = new RoughnessMipmapper( renderer );

var loader = new GLTFLoader();
loader.load( 'datoteke/PantheraFinalKomad-Baked - brezProblema.gltf', 
function ( gltf ) {

      gltf.scene.traverse( function ( child ) {

        partsArray.push(child);  //

        if ( child.isMesh ) {
          roughnessMipmapper.generateMipmaps( child.material );                      
          }
        } );
        
        scene.add( gltf.scene );


        //console.log(partsArray.length) // 
        roughnessMipmapper.dispose();
        
        mixer = new THREE.AnimationMixer( gltf.scene );
        clip1 = gltf.animations[ 1 ];
        action1 = mixer.clipAction(clip1);
		
		    clip2 = gltf.animations[ 0 ];
		    action2 = mixer.clipAction(clip2);
		        
        clip3 = gltf.animations[ 2 ];
		    action3 = mixer.clipAction(clip3);
		  },

      function ( xhr ) {

        console.log(xhr);
    
      }
      
      
      );
 
var pmremGenerator = new THREE.PMREMGenerator( renderer );
pmremGenerator.compileEquirectangularShader();
  
controls.update();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {

  selectedCamera.aspect = window.innerWidth / window.innerHeight;
  selectedCamera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
  
  requestAnimationFrame( animate );
  
  var delta = clock.getDelta();
  
  if ( mixer ) mixer.update( delta );
	
  TWEEN.update();

  //console.log(cameraPosition);

  if ( pogoj ){
     selectedCamera.position.set( cameraPosition.x, cameraPosition.y, cameraPosition.z );
     selectedCamera.lookAt(cameraLook);
  }
  renderer.render( scene, selectedCamera );
}

function introConfiguration(){

  pogoj = true;
  selectedCamera = exteriorCamera;

  cameraLook.x=0;
  cameraLook.y=0;
  cameraLook.z=2;

  controls.target.set( 0, 0, 2 );

  var target2 =  { x : -5, y:1.3, z: -5 };
  cameraPosition.x = selectedCamera.position.x
  cameraPosition.y = selectedCamera.position.y
  cameraPosition.z = selectedCamera.position.z

  const tween = new TWEEN.Tween(cameraPosition ).to(target2, 2000); //
  selectedCamera.aspect = window.innerWidth / window.innerHeight;
  selectedCamera.updateProjectionMatrix();
  tween.start();
  setTimeout(() => {
    pogoj = false;
  }, 2000)
   
}

function exteriorConfiguration(){

  pogoj = true;
  selectedCamera = exteriorCamera;

  cameraLook.x=0;
  cameraLook.y=0;
  cameraLook.z=2;

  controls.target.set( 0, 0, 2 );

  var target2 =  { x : -5, y:1.3, z: -5 };
  cameraPosition.x = selectedCamera.position.x
  cameraPosition.y = selectedCamera.position.y
  cameraPosition.z = selectedCamera.position.z

  const tween = new TWEEN.Tween(cameraPosition ).to(target2, 2000); //
  selectedCamera.aspect = window.innerWidth / window.innerHeight;
  selectedCamera.updateProjectionMatrix();
  tween.start();
  setTimeout(() => {
    pogoj = false;
  }, 2000)
   
}

function seatsConfiguration(){

  action1.clampWhenFinished = true;
  action1.loop = THREE.LoopOnce;
  action1.play();

  action2.clampWhenFinished = true;
  action2.loop = THREE.LoopOnce;
  action2.play();

  action3.clampWhenFinished = true;
  action3.loop = THREE.LoopOnce;
  action3.play();

  pogoj = true;
 

  var target1 =  { x : -0.73, y: 0.41, z: 2.1 };
  cameraPosition.x = selectedCamera.position.x
  cameraPosition.y = selectedCamera.position.y
  cameraPosition.z = selectedCamera.position.z
  const tween = new TWEEN.Tween(cameraPosition ).to(target1, 2000); //
  selectedCamera.aspect = window.innerWidth / window.innerHeight;
  selectedCamera.updateProjectionMatrix();
  tween.start();
  setTimeout(() => {
    pogoj = false;
  }, 2000)

  selectedCamera = interiorCamera;
  controls = new OrbitControls( selectedCamera, renderer.domElement );
  controls.minDistance = 0.5;
  controls.maxDistance = 5
  controls.target.set( 0, 0, 2.5);
	
  cameraLook.x=0;
  cameraLook.y=0;
  cameraLook.z=2.5;
  
}


//Trenutno za rezervo
function interiorConfiguration(){
  interiorCamera.position.set( - 1, 0.6, -4 );
}

//NAVIGATION BUTTONS

document.getElementById("exteriorSection").onclick = function() {
  exteriorConfiguration();
};

document.getElementById("seatsSection").onclick = function() {
  seatsConfiguration();
};

document.getElementById("testIzbireSedezev").onclick = function() {

};

document.getElementById("slikaZadnjiSedezi_modro-crni").onclick = function() {
  
};

document.getElementById("slikaZadnjiSedezi_oranzno-sivo-beli").onclick = function() {
  
};

document.getElementById("slikaZadnjiSedezi_rdece-crni").onclick = function() {
  
};

document.getElementById("slikaZadnjiSedezi_zeleno-crni").onclick = function() {
  
};

document.getElementById("oranznaPanthera").onclick = function() {
 
};

document.getElementById("zelenaPanthera").onclick = function() {
  
};

document.getElementById("modraPanthera").onclick = function() {
  
};

document.getElementById("vijolicnaPanthera").onclick = function() {

};

animate();


  //var target =  { x : 0, y: 0, z: 0 };
  //const tween = new TWEEN.Tween(position).to(target, 2000); //
  //tween.start();
