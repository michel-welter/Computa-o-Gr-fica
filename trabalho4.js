var scene;
var camera;
var renderer;

var velocity = 0.1;


var createACube = function() {
    var geometry = new THREE.BoxGeometry( 2, 10, 2 );

    red = new THREE.Color(1, 0, 0);
    green = new THREE.Color(0, 1, 0);
    blue = new THREE.Color(0, 0, 1);
    var colors = [red, green, blue];

    for (var i = 0; i < 3; i++) {
        geometry.faces[4 * i].color = colors[i];
        geometry.faces[4 * i+1].color = colors[i];
        geometry.faces[4 * i+2].color = colors[i];
        geometry.faces[4 * i+3].color = colors[i];

    }
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: true } );
    braco1 = new THREE.Mesh( geometry, material );
    

    var geometry2 = new THREE.SphereGeometry(2, 32,32);
    var material2 = new THREE.MeshBasicMaterial( { color: new THREE.Color(0, 1, 0)} );
    cotovelo = new THREE.Mesh(geometry2, material2);
    cotovelo.position.y-=5;
    braco1.add(cotovelo);

    pivot = new THREE.Group();
    pivot.position.set(0,0,0);
    pivot.add(braco1);

    scene.add(pivot);
    braco1.position.y+=pivot.position.x+5;


    var geometry3 = new THREE.CylinderGeometry( 2, 2, 6, 32 );
    var cone = new THREE.ConeBufferGeometry(6, 8, 16);
    var geometry4 = new THREE.CylinderBufferGeometry(4, 4, 8, 12);

    caixa = new THREE.Mesh( geometry );
    esfera = new THREE.Mesh( geometry2 );
    cilindro = new THREE.Mesh( geometry3 );
    caixa2 = new THREE.Mesh( geometry );
    esfera2 = new THREE.Mesh( geometry2 );
    cilindro2 = new THREE.Mesh( geometry3 );
    cone = new THREE.Mesh( cone );
    coisa = new THREE.Mesh( geometry4);

    scene.add( caixa );

    caixa.position.x=50
    caixa.position.y=0
    caixa.position.z=12

    scene.add( cone );

    cone.position.x=-30
    cone.position.y=0
    cone.position.z=15

    scene.add( coisa );

    coisa.position.x=15
    coisa.position.y=10
    coisa.position.z=10
    

    scene.add( esfera );

    esfera.position.x=5
    esfera.position.y=-25
    esfera.position.z=25

    scene.add( cilindro );
    
    cilindro.position.x=23
    cilindro.position.y=18
    cilindro.position.z=40

    scene.add( caixa2 );
    
    caixa2.position.x=-45
    caixa2.position.y=20
    caixa2.position.z=19

    scene.add( esfera2 );
    
    esfera2.position.x=20
    esfera2.position.y=20
    esfera2.position.z=-20

    scene.add( cilindro2 );

    cilindro2.position.x=35
    cilindro2.position.y=22
    cilindro2.position.z=37
};

var init = function() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 

                                60                                          // angulo
                                ,window.innerWidth / window.innerHeight     //aspect
                                ,0.1                                       // Near
                                ,1000                                      // Far
                            );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.createACube();

   
	camera.position.set( 0, 20, 100 );

    

    //Essas linhas criam o gridView, lembrando que ele basicamente Ã© sÃ³ uma grade de linhas no eixo X
    //scene.add( new THREE.GridHelper( 400, 40 ) );
  

    
   /*Para criar o plano */
   const ground = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 100, 100, 10 ),
        new THREE.MeshBasicMaterial( { color: 'orange'})
    ); //Cria a forma plana

    ground.rotation.x = - Math.PI / 2; // rotaciona para que ela fique paralela ao eixo X
    ground.position.y-=6; // Posiciona o ground abaixo da nossa figura.
    scene.add( ground );


    render();

    document.addEventListener('keydown', onKeyDown ); 

    document.addEventListener('mousedown', onMouseDown ); //metodos de controle do mouser
    document.addEventListener('mouseup', onMouseUp ); 
    document.addEventListener('mousemove', onMouseMouse ); 
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

var rotationVelocity = 0.1;

var onKeyDown = function(e){

    if (e.keyCode == 38){ //Up
        camera.position.y+=0.5
    }
    if (e.keyCode == 40){ //Down
        camera.position.y-=0.5
    }
    if (e.keyCode == 39){ //direita
        camera.position.x+=0.5
    }
    if (e.keyCode == 37){ //esquerda
        camera.position.x-=0.5
    }
    if (e.keyCode == 81){ //Q
        camera.position.z+=0.5
    }
    if (e.keyCode == 65){ //A
        camera.position.z-=0.5
    }
    if (e.keyCode == 32){ //espaço
        //camera.position.applyQuaternion( new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), toRadians(5) ));
        camera.rotateY(toRadians(5))
    }
}


var posicaoMouser = { //controla a posiÃ§Ã£o do mouser
    x: 0,
    y: 0
};

var cliquePressionado = false; //para controlar o tempo que o cara esta pressionando o botao do mouser

var onMouseDown = function(e){
    cliquePressionado = true;
    //console.log("Apertou Clicou")
}


var onMouseUp = function(e){
    cliquePressionado = false;
  //  console.log("SOltou o clique");
}


var onMouseMouse = function (e){
    if (cliquePressionado){

        var deltaMovimento = {
            x: e.offsetX - posicaoMouser.x,
            y: e.offsetY - posicaoMouser.y,
        }

        //cube.position.x += deltaMovimento.x*0.01;
        //cube.position.y += deltaMovimento.y*0.01*-1;

        braco1.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
        braco1.rotation.y += toRadians(deltaMovimento.x*1)*0.5;
    }

    posicaoMouser = {  //nova posiÃ§Ã£o do mouser
        x : e.offsetX,
        y : e.offsetY
    };
}

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}