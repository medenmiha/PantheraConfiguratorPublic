import * as THREE from 'https://threejs.org/build/three.module.js';

import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://threejs.org/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from 'https://threejs.org/examples/jsm/utils/RoughnessMipmapper.js';

var container, controls, controls1;
var camera, scene, renderer, mixer, clock, camera1;
var exteriorCamera, interiorCamera, selectedCamera, selectedControls;
var action1, action2, action3, action4, clip1, clip2, clip3, clip4;
var cameraPosition = { x : 0, y: 0, z: 0 };
var pogoj = false;
var cameraLook = new THREE.Vector3(0, 0, 0);  //

var partsArray = []; //

var Sedezi_modro_crni, Sedezi_oranzno_sivo_beli, Sedezi_rdece_crni, Sedezi_zeleno_crni;


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

// NAVIGACIJA SPLETNE STRANI
var isScrollSnapSupported = 'scrollSnapType' in document.documentElement.style ||
        'webkitScrollSnapType' in document.documentElement.style;

if (!isScrollSnapSupported) {
  var elem = document.createElement('p'),
      txt  = document.createTextNode('Your browser does not support CSS Scroll Snap Points :( '),
      local = document.body;
  
  elem.appendChild(txt);
  elem.classList.add('warning');
  local.insertBefore(elem, local.firstChild);
}


//LOGIKA 3D PREMDETA
new RGBELoader()
  .setDataType( THREE.UnsignedByteType )
  .setPath( 'https://threejs.org/examples/textures/equirectangular/' )
  .load( 'venice_sunset_1k.hdr', function ( texture ) {

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
loader.load( 'datoteke/PantheraFinal - 2.gltf', 
function ( gltf ) {

      gltf.scene.traverse( function ( child ) {

        partsArray.push(child);  //

        if ( child.isMesh ) {
          roughnessMipmapper.generateMipmaps( child.material );                      
          }
        } );
        
        scene.add( gltf.scene );


        Sedezi_modro_crni = scene.getObjectByName("Sedezi_modro-crni");
        Sedezi_oranzno_sivo_beli = scene.getObjectByName("Sedezi_oranzno-sivo-beli");
        Sedezi_rdece_crni = scene.getObjectByName("Sedezi_rdece-crni");
        Sedezi_zeleno_crni = scene.getObjectByName("Sedezi_zeleno-crni");

        Sedezi_modro_crni.visible = true;
        Sedezi_oranzno_sivo_beli.visible = false;
        Sedezi_rdece_crni.visible = false;
        Sedezi_zeleno_crni.visible = false;



        //console.log(partsArray.length) // 
        roughnessMipmapper.dispose();
        
        mixer = new THREE.AnimationMixer( gltf.scene );
        clip1 = gltf.animations[ 1 ];
        action1 = mixer.clipAction(clip1);
		
		    clip2 = gltf.animations[ 0 ];
		    action2 = mixer.clipAction(clip2);
		        
        clip3 = gltf.animations[ 2 ];
		    action3 = mixer.clipAction(clip3);

        //Podvozje
        clip4 = gltf.animations[ 3 ];
		    action4 = mixer.clipAction(clip4);
		  },

      function ( xhr ) {
        console.log(xhr.loaded); //ne zazna koncne velicine datoteke zato samo to zaenkrat
        
    
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
  action1.loop = true;
  action1.timeScale = -1;
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


function instrumentConfiguration(){
  
  pogoj = true;

  var target1 =  { x : 1.27, y: 2.3, z: 0.62 };
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
  controls.target.set( 0, 0, 1);
	
  cameraLook.x=0;
  cameraLook.y=0;
  cameraLook.z=1;

  action4.clampWhenFinished = true;
  action4.loop = THREE.LoopOnce;
  action4.play();
  
}


//NAVIGATION BUTTONS

document.getElementById("exteriorSection").onclick = function() {
  exteriorConfiguration();
};

document.getElementById("seatsSection").onclick = function() {
  seatsConfiguration();
};

document.getElementById("instrumentSection").onclick = function() {
  instrumentConfiguration();
};


introConfiguration()
animate();


// VIZUALIZACIJA SEDEZEV




// SLIDER SEATS  // slide index se uredi

  document.getElementById("nextSlide").onclick = function() {
    plusSlides(1);
  };

  document.getElementById("prevSlide").onclick = function() {
    plusSlides(-1);
  };

  document.getElementById("currentSlideT").onclick = function() {
    currentSlide(n)
  };

  var slideIndex = 1;
  showSlides(slideIndex);
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
    console.log( slideIndex);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";

    if(slideIndex==1){
      Sedezi_modro_crni.visible = true;
      Sedezi_oranzno_sivo_beli.visible = false;
      Sedezi_rdece_crni.visible = false;
      Sedezi_zeleno_crni.visible = false;
    }

    if(slideIndex==2){
      Sedezi_modro_crni.visible = false;
      Sedezi_oranzno_sivo_beli.visible = true;
      Sedezi_rdece_crni.visible = false;
      Sedezi_zeleno_crni.visible = false;
    }

    if(slideIndex==3){
      Sedezi_modro_crni.visible = false;
      Sedezi_oranzno_sivo_beli.visible = false;
      Sedezi_rdece_crni.visible = true;
      Sedezi_zeleno_crni.visible = false;
    }
  }

  