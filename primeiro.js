var scene;
var camera;
var renderer;

var cube;
var velocidadeEsferaX = 1;
var velocidadeEsferaY = 1;

var criaEsfera = function(){
    var geometria = new THREE.SphereGeometry(20, 20, 20);
    var material = new THREE.MeshBasicMaterial({color: "blue"});

    esfera = new THREE.Mesh(geometria, material);

    scene.add(esfera);
};

var render = function(){
    requestAnimationFrame(render);

    animaEsfera();

    renderer.render(scene, camera);
}

var animaEsfera = function(){
    if(this.esfera.position.x >= 210 || this.esfera.position.x <= -215 ){
        velocidadeEsferaX = velocidadeEsferaX * -1;
    }
    if(this.esfera.position.y >= 88 || this.esfera.position.y <= -89){
        velocidadeEsferaY = velocidadeEsferaY * -1;
    }
    this.esfera.position.x += velocidadeEsferaX;
    this.esfera.position.y += velocidadeEsferaY;}

var init = function (){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z= 300;

    criaEsfera();

    render();


    
};


window.onload = this.init;