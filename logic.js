import * as THREE from 'https://threejs.org/build/three.module.js';

import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://threejs.org/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from 'https://threejs.org/examples/jsm/utils/RoughnessMipmapper.js';

var container, controls, controls1;
var camera, scene, renderer, mixer, clock, camera1;
var exteriorCamera, interiorCamera, selectedCamera, selectedControls;
var action1, action2, action3, action4, action5, action6, action7, action8, action9, action10, action11, action12, action13, action14, action15;
var clip1, clip2, clip3, clip4, clip5, clip6, clip7, clip8, clip9, clip10, clip11, clip12, clip13, clip14, clip15;
var cameraPosition = { x : 0, y: 0, z: 0 };
var pogoj = false;
var podvozjeZunaj = true;
var doorsOpened = false;
var cameraLook = new THREE.Vector3(0, 0, 0);  //
var c;

var partsArray = []; //

var Sedezi_modro_crni, Sedezi_oranzno_sivo_beli, Sedezi_rdece_crni, Sedezi_zeleno_crni, Sphere_;


scene = new THREE.Scene();
clock = new THREE.Clock();

//CAMERAS
exteriorCamera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 100 );
interiorCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.25, 100 );

selectedCamera = exteriorCamera;

container = document.createElement( 'div' );
document.body.appendChild( container );

renderer = new THREE.WebGLRenderer( { antialias: false } );  //true
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.toneMapping = THREE.ACESFilmicToneMapping;  //komot brises
renderer.toneMappingExposure = 1;  //komot brises
renderer.outputEncoding = THREE.sRGBEncoding; //ful temnejs ce zbrises
container.appendChild( renderer.domElement );

controls = new OrbitControls( selectedCamera, renderer.domElement );
controls.maxPolarAngle = Math.PI/2; 
controls.minDistance = 2;
controls.maxDistance = 20;
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

new RGBELoader()
  .setDataType( THREE.UnsignedByteType )
  .setPath( '' )
  .load( 'nad_oblaki.hdr', function ( texture ) {

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

        const light = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
        scene.add( light )


        Sedezi_modro_crni = scene.getObjectByName("Sedezi_modro-crni");
        Sedezi_modro_crni.layers.set(1);

        Sedezi_oranzno_sivo_beli = scene.getObjectByName("Sedezi_oranzno-sivo-beli");
        Sedezi_oranzno_sivo_beli.layers.set(2);

        Sedezi_rdece_crni = scene.getObjectByName("Sedezi_rdece-crni");
        Sedezi_rdece_crni.layers.set(3);

        Sedezi_zeleno_crni = scene.getObjectByName("Sedezi_zeleno-crni");
        Sedezi_zeleno_crni.layers.set(4);

        Sphere_ = scene.getObjectByName("Sphere")
        Sphere_.layers.set(5);

        //Sedezi_modro_crni.visible = true;
        //Sedezi_oranzno_sivo_beli.visible = false;
        //Sedezi_rdece_crni.visible = false;
        //Sedezi_zeleno_crni.visible = false;



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

        clip5 = gltf.animations[ 4 ];
		    action5 = mixer.clipAction(clip5);

        clip6 = gltf.animations[ 5 ];
		    action6 = mixer.clipAction(clip6);
        
        clip7 = gltf.animations[ 6 ];
		    action7 = mixer.clipAction(clip7);

        clip8 = gltf.animations[ 7 ];
		    action8 = mixer.clipAction(clip8);

        clip9 = gltf.animations[ 8 ];
		    action9 = mixer.clipAction(clip9);

        clip10 = gltf.animations[ 9 ];
		    action10 = mixer.clipAction(clip10);

        clip11 = gltf.animations[ 10 ];
		    action11 = mixer.clipAction(clip11);

        clip12 = gltf.animations[ 11 ];
		    action12 = mixer.clipAction(clip12);

        clip13 = gltf.animations[ 12 ];
		    action13 = mixer.clipAction(clip13);

        clip14 = gltf.animations[ 13 ];
		    action14 = mixer.clipAction(clip14);

        clip15 = gltf.animations[ 14 ];
		    action15 = mixer.clipAction(clip15);

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

function openDoors(){
  if(doorsOpened==false){
    action1.reset();
    action1.clampWhenFinished = true;
    action1.timeScale = 1;
    action1.setLoop(THREE.LoopOnce, 1);
    action1.play();

    action2.reset();
    action2.clampWhenFinished = true;
    action2.timeScale = 1;
    action2.setLoop(THREE.LoopOnce, 1);
    action2.play();

    action3.reset();
    action3.clampWhenFinished = true;
    action3.timeScale = 1;
    action3.setLoop(THREE.LoopOnce, 1);
    action3.play();
  } 
}

function closeDoors(){
  if(doorsOpened==true){
    action1.timeScale = -1;
    action1.paused = false;

    action2.timeScale = -1;
    action2.paused = false;

    action3.timeScale = -1;
    action3.paused = false;
  }
}

function podvozjeNot(){
  if(podvozjeZunaj==true){
    action4.reset();
    action4.clampWhenFinished = true;
    action4.timeScale = 1;
    action4.setLoop(THREE.LoopOnce, 1);
    action4.play();

    action5.reset();
    action5.clampWhenFinished = true;
    action5.timeScale = 1;
    action5.setLoop(THREE.LoopOnce, 1);
    action5.play();

    action6.reset();
    action6.clampWhenFinished = true;
    action6.timeScale = 1;
    action6.setLoop(THREE.LoopOnce, 1);
    action6.play();

    action7.reset();
    action7.clampWhenFinished = true;
    action7.timeScale = 1;
    action7.setLoop(THREE.LoopOnce, 1);
    action7.play();

    action8.reset();
    action8.clampWhenFinished = true;
    action8.timeScale = 1;
    action8.setLoop(THREE.LoopOnce, 1);
    action8.play();

    action9.reset();
    action9.clampWhenFinished = true;
    action9.timeScale = 1;
    action9.setLoop(THREE.LoopOnce, 1);
    action9.play();

    action10.reset();
    action10.clampWhenFinished = true;
    action10.timeScale = 1;
    action10.setLoop(THREE.LoopOnce, 1);
    action10.play();

    action11.reset();
    action11.clampWhenFinished = true;
    action11.timeScale = 1;
    action11.setLoop(THREE.LoopOnce, 1);
    action11.play();

    action12.reset();
    action12.clampWhenFinished = true;
    action12.timeScale = 1;
    action12.setLoop(THREE.LoopOnce, 1);
    action12.play();

    action13.reset();
    action13.clampWhenFinished = true;
    action13.timeScale = 1;
    action13.setLoop(THREE.LoopOnce, 1);
    action13.play();

    action14.reset();
    action14.clampWhenFinished = true;
    action14.timeScale = 1;
    action14.setLoop(THREE.LoopOnce, 1);
    action14.play();

    action15.reset();
    action15.clampWhenFinished = true;
    action15.timeScale = 1;
    action15.setLoop(THREE.LoopOnce, 1);
    action15.play();
  }
}

function podvozjeVen(){
  if(podvozjeZunaj==false){
    action4.timeScale = -1;
    action4.paused = false;

    action5.timeScale = -1;
    action5.paused = false;

    action6.timeScale = -1;
    action6.paused = false;

    action7.timeScale = -1;
    action7.paused = false;

    action8.timeScale = -1;
    action8.paused = false;

    action9.timeScale = -1;
    action9.paused = false;

    action10.timeScale = -1;
    action10.paused = false;

    action11.timeScale = -1;
    action11.paused = false;

    action12.timeScale = -1;
    action12.paused = false;

    action13.timeScale = -1;
    action13.paused = false;

    action14.timeScale = -1;
    action14.paused = false;

    action15.timeScale = -1;
    action15.paused = false;
  }
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

  podvozjeVen();
  podvozjeZunaj = true;

  closeDoors();
  doorsOpened = false;

  selectedCamera.layers.enable(5);

   
}

function seatsConfiguration(){

  pogoj = true;
 

  var target1 =  { x : -0.93, y: 0.6, z: 1.6 };
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
  controls.target.set( 0, 0, 2);
	
  cameraLook.x=0;
  cameraLook.y=0;
  cameraLook.z=2;

  podvozjeVen();
  podvozjeZunaj = true;

  openDoors();
  doorsOpened = true;

  selectedCamera.layers.enable(1);

  selectedCamera.layers.enable(5);
  
}


function instrumentConfiguration(){
  
  pogoj = true;

  var target1 =  { x : 0, y: 0.4, z: 1.7 };
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


  podvozjeVen();
  podvozjeZunaj = true;

  selectedCamera.layers.enable(5);
  
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

  podvozjeVen();
  podvozjeZunaj = true;

  closeDoors();
  doorsOpened = false;

  selectedCamera.layers.enable(5);

   
}


function configuratuionResult(){

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

  podvozjeVen();
  podvozjeZunaj = true;

  podvozjeNot();
  podvozjeZunaj=false;

  closeDoors();
  doorsOpened = false;

  selectedCamera.layers.disable(5);
   
}


//NAVIGATION BUTTONS

document.getElementById("introSection").onclick = function() {
  introConfiguration();
};

document.getElementById("seatsSection").onclick = function() {
  seatsConfiguration();
};

document.getElementById("instrumentSection").onclick = function() {
  instrumentConfiguration();
};

document.getElementById("exteriorSection").onclick = function() {
  exteriorConfiguration();
};

document.getElementById("resultSection").onclick = function() {
  configuratuionResult();
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
      selectedCamera.layers.enable(1);
      selectedCamera.layers.disable(2);
      selectedCamera.layers.disable(3);
      selectedCamera.layers.disable(4);
      //Sedezi_modro_crni.visible = true;
      //Sedezi_oranzno_sivo_beli.visible = false;
      //Sedezi_rdece_crni.visible = false;
      //Sedezi_zeleno_crni.visible = false;
    }

    if(slideIndex==2){
      selectedCamera.layers.disable(1);
      selectedCamera.layers.enable(2);
      selectedCamera.layers.disable(3);
      selectedCamera.layers.disable(4);
      //Sedezi_modro_crni.visible = false;
      //Sedezi_oranzno_sivo_beli.visible = true;
      //Sedezi_rdece_crni.visible = false;
      //Sedezi_zeleno_crni.visible = false;
    }

    if(slideIndex==3){
      selectedCamera.layers.disable(1);
      selectedCamera.layers.disable(2);
      selectedCamera.layers.enable(3);
      selectedCamera.layers.disable(4);
      //Sedezi_modro_crni.visible = false;
      //Sedezi_oranzno_sivo_beli.visible = false;
      //Sedezi_rdece_crni.visible = true;
      //Sedezi_zeleno_crni.visible = false;
    }

    if(slideIndex==4){
      selectedCamera.layers.disable(1);
      selectedCamera.layers.disable(2);
      selectedCamera.layers.disable(3);
      selectedCamera.layers.enable(4);
      //Sedezi_modro_crni.visible = false;
      //Sedezi_oranzno_sivo_beli.visible = false;
      //Sedezi_rdece_crni.visible = false;
      //Sedezi_zeleno_crni.visible = true;
    }
  }

  