
var scene = new THREE.Scene();

//CAMERA
const fov = 35;
    const aspect = window.innerWidth/window.innerHeight;
    const near = 0.1;
    const far = 1000; //(meters) if further than this, we cannot see

var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 15;
camera.rotation.x = Math.PI/2;



//RENDERER
const canvas = document.querySelector('#c');
var renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias:true,
});
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);

      //change viewport responsive
window.addEventListener( 'resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height)

    camera.aspect = width/height;
    camera.updateProjectionMatrix();

});

window.addEventListener( 'mousemove', onclick, false );

//CONTROL
var controls = new THREE.OrbitControls( camera, renderer.domElement);

controls.target.set(0,0,0);
controls.enablePan = false;
//controls.maxPolarAngle = Math.PI/2;
controls.maxDistance = 20;
controls.minDistance = 10;
controls.enableDamping = true;
//controls.update();

//==========================MUSIC
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );
// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( '/bg_music.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.3 );
	sound.play();
});

const soundEffect = new THREE.Audio( listener );


//GEOMETRY
const texture1 = new THREE.TextureLoader().load('./image/moon.jpg')
const geometry1 = new THREE.SphereGeometry( 1, 32, 16 );
const material1 = new THREE.MeshPhongMaterial( { color: 0xFFFFFF, map: texture1 , wireframe: false} );
const sphere1 = new THREE.Mesh( geometry1, material1 );

sphere1.userData = { URL: "https://github.com/minklim47"};
scene.add( sphere1 );
sphere1.name = 'bulb';



//LIGHT
var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 1);
scene.add(ambientLight)

//var light1 = new THREE.PointLight( 0xFF0040, 2, 50);
//scene.add(light1)



const pointLight = new THREE.PointLight( 0xFFFFFF, 2, 25 );
pointLight.position.set( 10, 10, 10 );
scene.add( pointLight );

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
//scene.add( pointLightHelper );


//Raycasting and mouse effects

//const red_color = new THREE.color(0x57554f);

const mmi = new MouseMeshInteraction(scene, camera);
mmi.addHandler('bulb','click', function(mesh){
    console.log("bulb has been clicked");
    window.open(sphere1.userData.URL);
    soundEffect.pause ()
});

const mmi2 = new MouseMeshInteraction(scene, camera);
mmi.addHandler('bulb','mouseenter', function(mesh){
    console.log("bulb has been entered");
   // mesh.material.color = red_color;
        audioLoader.load( '/sound_effect.mp3', function( buffer ) {
        soundEffect.setBuffer( buffer );
        soundEffect.setVolume( 0.5 );
        soundEffect.play();
});
    
});
const mmi3 = new MouseMeshInteraction(scene, camera);
mmi.addHandler('bulb','mouseleave', function(mesh){
    console.log("bulb has left");
   // mesh.material.color = red_color;
   soundEffect.pause ()
});






//GAME LOGIC
var update = function() {
    sphere1.rotation.x += 0.01;
    sphere1.rotation.y += 0.01;
    sphere1.rotation.z += 0.01;
    
    

};

//DRAW SCENE
var render = function(){
    mmi.update();
    
    renderer.render( scene, camera)
   // console.log(dataArray );
   

};


//run game loop (update, render, repeat)

var GameLoop = function(){

    requestAnimationFrame( GameLoop );
    
    update();
    render();
};

GameLoop();