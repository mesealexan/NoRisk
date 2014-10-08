var container, scene, camera, renderer, controls, stats;
var mesh;
var jsonLoader = new THREE.JSONLoader(); 
var mesh, sphere, geometry, lod;
var DisplacementTexture;

function initWorld()
    {
    scene = new THREE.Scene();

    var SCREEN_WIDTH = window.innerWidth; 
    var SCREEN_HEIGHT = window.innerHeight; 
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 10, FAR = 6600;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR); 
    camera.position.set(-200,200,200); 
    camera.lookAt(scene.position);   
    scene.add(camera); 

    // RENDERER
    if (window.WebGLRenderingContext) 
        renderer = new THREE.WebGLRenderer({antialias:true, alpha: true });
    else
        renderer = new THREE.CanvasRenderer({antialias:true, alpha: true });

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT); 
    renderer.setClearColorHex( 0x000000, 1 );
    container = document.getElementById( 'ThreeJS' ); 
    container.appendChild( renderer.domElement ); 

    controls = new THREE.OrbitControls( camera, renderer.domElement ); 

  //  var myTexture = new THREE.ImageUtils.loadTexture("art/Earth_Disp.jpg");

    var ambient = 0x111111, diffuse = 0xbbbbbb, specular = 0x060606, shininess = 60;
    var shader = THREE.ShaderLib[ "normalmap" ];

    var loader = new THREE.DDSLoader();


    DisplacementTexture = new THREE.ImageUtils.loadCompressedTexture( 'art/Earth_Disp.dds' );
    var DiffuseTexture = new THREE.ImageUtils.loadCompressedTexture("art/EARTH.dds");
    var NormalTexture = new THREE.ImageUtils.loadCompressedTexture("art/earth_normal.dds")

console.log(DisplacementTexture)

    var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
    uniforms[ "enableDisplacement" ].value = true;
    uniforms[ "enableDiffuse" ].value = true;
    uniforms[ "tDisplacement"].value = DisplacementTexture;
    uniforms[ "tDiffuse" ].value = DiffuseTexture;
    uniforms[ "tNormal" ].value = NormalTexture;
    uniforms[ "uNormalScale" ].value.y = 2;
    uniforms[ "uDisplacementScale" ].value = 8;
    var parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms, lights: true, wireframe: false };
    var NormalMaterial = new THREE.ShaderMaterial( parameters );
    NormalMaterial.wrapAround = true;


   // var material = new THREE.MeshPhongMaterial( {map: myTexture} );

    geometry = new THREE.SphereGeometry(150, 60, 60);
    var geometry = [

        [ new THREE.SphereGeometry(150, 150, 150), 200 ],
        [  new THREE.SphereGeometry(150, 100, 100), 250 ],
        [  new THREE.SphereGeometry(150, 50, 50), 300 ]
    ];

    

    var i, j, mesh;
    lod = new THREE.LOD();

    for ( i = 0; i < geometry.length; i ++ ) {
        geometry[i][0].computeTangents();
        mesh = new THREE.Mesh( geometry[ i ][ 0 ], NormalMaterial );
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        lod.addLevel( mesh, geometry[ i ][ 1 ] );

    }


    lod.updateMatrix();
    lod.matrixAutoUpdate = false;
    scene.add( lod );







    var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(100, 100, 50);
    scene.add(dirLight);
animate();

    }

function animate() 
    {
    requestAnimationFrame( animate ); 
    scene.updateMatrixWorld();
    scene.traverse( function ( object ) {

        if ( object instanceof THREE.LOD ) {

            object.update( camera );

        }

    } );
    lod.children[0].rotation.y += 0.001; 
    renderer.render( scene, camera );   
    controls.update(); 
    update();
    }

function update(){
}
function callBackFunction( geometry, materials ) 
    {   
    var material = new THREE.MeshFaceMaterial( materials ); 
    mesh = new THREE.Mesh( geometry, material); 
    scene.add( mesh ); 
    }  