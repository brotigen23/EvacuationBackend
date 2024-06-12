import * as THREE from 'three';



import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pathfinding } from './libs/pathfinding/three-pathfinding.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


let container;

let camera, controls, scene, renderer, loader;

let pathfinding;

let navmesh;
const ZONE = 'Main';

let gui, obj;

let arrowPath = [];

const points = [
    'A114',
    'A115',
    'A116',
    'A117',
    'A118',
    'A119',
    'A120',

    'A121',
    'A122',
    'A123',
    'A124',
    'A125',
    'A126',
    'A127',
    'A128',
    'A129',

    'A201',
    'A202',
    'A203',
    'A204',
    'A205',
    'A214',
    'A215',
    'A226',
    'A227',
    'A218',
    'A219',
    'A220',
    'A221',
    'A222',
    'A223',
    'A224',
    'A225',
    'A226',
    'A227',
    'A228',
    'A229',
    'A230',


    'A301',
    'A302',
    'A303',
    'A304',
    'A305',
    'A306',
    'A307',
    'A308',
    'A309',
    'A310',
    'A311',
    'A312',
    'A313',
    'A314',
    'A315',
    'A316',
    'A317',
    'A318',
    'A319',
    'A320',
    'A321',
    'A322',
    'A323',
    'A324',
    'A325',
    'A326',
    'A327',
    'A328',
    'A329',

    'A401',
    'A402',
    'A403',
    'A404',
    'A405',
    'A406',
    'A407',
    'A408',
    'A409',
    'A410',
    'A411',
    'A412',
    'A413',
    'A414',
    'A415',
    'A416',
    'A417',
    'A418',
    'A419',
    'A420',
    'A421',
    'A422',
    'A423',
    'A424',
    'A425',
    'A426',
    'A427',
    'A428',
    'A429'
]

const exits = [
    'MainExit',
    'LeftExit',
    'RigthExit'
]

const floors = [
    'FirstFloor',
    'SecondFloor',
    'ThirdFloor',
    'FourthFloor'
]

var floor = 0;

main();

function loadModel(model, visible = true, name = ''){
    const loader = new GLTFLoader();
    loader.load('models/' + model + '.glb' , function ( gltf ) {
        scene.add( gltf.scene );
        scene.children[scene.children.length - 1].visible = visible;
        scene.children[scene.children.length - 1].name = name;
        console.log(model + ' is loaded');
    }, undefined, function ( error ) {
        console.error( error );
    } );
}

function initNavmesh(){
    // Настройка зоны поиска
    const navmesh = scene.getObjectByName("Navmesh", true);
    pathfinding = new Pathfinding();
    pathfinding.setZoneData(ZONE, Pathfinding.createZone(navmesh.geometry));
}

function initScene(){
   console.log("Loading models...");
    loadModel('FirstFloor', true, 'FirstFloor');
    loadModel('SecondFloor', false, 'SecondFloor');
    loadModel('ThirdFloor', false, 'ThirdFloor');
    loadModel('FourthFloor', false, 'FourthFloor');
    loadModel('Points', false);
    loadModel('Navmesh', false);
}

function setupGUI(){
    gui = new GUI( {title : 'Маршрут'} );
    obj = {
        pointsDropdown: points[0],
        drawPath: drawPath,
        clearPath: clearPath,
        upFloor: upFloor,
        downFloor: downFloor
    }
    gui.add( obj, 'pointsDropdown', points ).name('Аудитория'); 	// number field
    gui.add( obj, 'drawPath' ).name('Построить маршрут'); 	// button
    gui.add( obj, 'clearPath' ).name('Очистить'); 	// button
    gui.add( obj, 'upFloor' ).name('Этаж выше'); 	// button
    gui.add( obj, 'downFloor' ).name('Этаж ниже'); 	// button
}

function changeFloor(){
    for(var i = 0; i <= floor; i++){
        scene.getObjectByName(floors[i]).visible = true;
    }
    for(var i = floor + 1; i < floors.length; i++){
        scene.getObjectByName(floors[i]).visible = false;
    }
}

function upFloor(){
    if(floor < floors.length - 1)
        floor++;
    changeFloor();
}

function downFloor(){
    if(floor > 0)
        floor--;
    changeFloor();
}
function init() {
    container = document.getElementById('map');
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcccccc );
    scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

    initScene()

    setupGUI();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( container.offsetWidth, container.offsetHeight );
    container.appendChild( renderer.domElement );

    window.addEventListener('resize', onWindowResize, false);

    camera = new THREE.PerspectiveCamera( 60, container.offsetWidth / container.offsetHeight, 1, 1000 );
    camera.position.set( 400, 200, 0 );

    // controls

    controls = new OrbitControls( camera, renderer.domElement );
    controls.listenToKeyEvents( window ); // optional


    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 1;
    controls.maxDistance = 200;

    controls.maxPolarAngle = Math.PI / 2;

    // lights
    const dirLight1 = new THREE.DirectionalLight( 0xffffff, 3 );
    dirLight1.position.set( 1, 1, 1 );
    scene.add( dirLight1 );

    const dirLight2 = new THREE.DirectionalLight( 0x002288, 3 );
    dirLight2.position.set( - 1, - 1, - 1 );
    scene.add( dirLight2 );

    const ambientLight = new THREE.AmbientLight( 0x555555 );
    scene.add( ambientLight );

    window.addEventListener( 'resize', onWindowResize );
}

function draw(verts){
    for(let i = 0; i < verts.length - 1; i++){
        var from = verts[i];
        var to = verts[i+1];
        var direction = to.clone().sub(from);
        var length = direction.length();
        var arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, 0xff0000);
        scene.add( arrowHelper );
        arrowPath.push(scene.children[scene.children.length - 1]);
    }
}

function findPaths(){
    var paths = [];
    for(var i = 0; i < exits.length; i++){
        let a = scene.getObjectByName(obj.pointsDropdown, true).position;
        let b = scene.getObjectByName(exits[i], true).position;
        console.log(a);
        console.log(b);

        // Поиск пути
        let groupID = pathfinding.getGroup(ZONE, a);
        let path = pathfinding.findPath(a, b, ZONE, groupID);
        var distance = 0;
        for(let j = 0; j < path.length - 1; j++)
            distance += path[j].distanceTo(path[j + 1]);
        paths.push(distance);
    }
    return exits[paths.indexOf(Math.min(...paths))];
}

function drawPath(){
    clearPath();

    initNavmesh();
    const exit = findPaths();

    // ГЛАВНЫЙ ВЫХОД
    // Считывание начальной и конечной точки пути 
    let a = scene.getObjectByName(obj.pointsDropdown, true).position;
    let b = scene.getObjectByName(exit, true).position;

    // Поиск пути
    let groupID = pathfinding.getGroup(ZONE, a);
    let path = pathfinding.findPath(a, b, ZONE, groupID);
    // Если путь найден
    if(path){
        var arrows = [];
        arrows.push(a);
        for(var i of path)
            arrows.push(i);
        draw(arrows);
    }
}

function clearPath(){
    for(var i of arrowPath)
        scene.remove(i);
}

function onWindowResize() {
    camera.aspect =   container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(  container.offsetWidth,  container.offsetHeight);
}


function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
}

function render() {
    renderer.render( scene, camera );
}


function main(){
    init();
    animate();
}