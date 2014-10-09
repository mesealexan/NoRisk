var container, scene, camera, renderer, controls, stats;
var mesh;
var jsonLoader = new THREE.JSONLoader(); 
var loader = new THREE.DDSLoader();
var mesh, sphere, geometry, lod, collector;
var DisplacementTexture;
var projector = new THREE.Projector(), 
    mouse_vector = new THREE.Vector3(),
    mouse = { x: 0, y: 0, z: 1 },
    ray = new THREE.Raycaster( new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0) );

var cameraLight;

function initWorld()
    {
    scene = new THREE.Scene();

    var SCREEN_WIDTH = window.innerWidth; 
    var SCREEN_HEIGHT = window.innerHeight; 
    var VIEW_ANGLE = 15, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 10, FAR = 6600;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR); 
    camera.position.set(-500,500,500); 
    camera.lookAt(scene.position);   
    scene.add(camera); 
    collector = new THREE.Object3D();
    // RENDERER
    if (window.WebGLRenderingContext) 
        renderer = new THREE.WebGLRenderer({antialias:true, alpha: true });
    else
        renderer = new THREE.CanvasRenderer({antialias:true, alpha: true });

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT); 
    //renderer.setClearColorHex( 0x000000, 1 );

    renderer.domElement.addEventListener( 'mousemove', onMouseMove, false );
    container = document.getElementById( 'ThreeJS' ); 
    container.appendChild( renderer.domElement ); 

    controls = new THREE.OrbitControls( camera, renderer.domElement ); 
    controls.target.set(0,0,0);
    controls.noPan = true;
    controls.minDistance = 500;
    controls.maxDistance = 1160;
    //controls.noZoom = true;
    controls.noKeys = true;
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.3;

    jsonLoader.load("art/earth.js", loadEarth);

  //  var myTexture = new THREE.ImageUtils.loadTexture("art/Earth_Disp.jpg");
/*
    var ambient = 0x111111, diffuse = 0xbbbbbb, specular = 0x060606, shininess = 60;
    var shader = THREE.ShaderLib[ "normalmap" ];

    jsonLoader.load("art/africa.js", loadRayObjects);

    scene.add(collector);
    DisplacementTexture = new THREE.ImageUtils.loadCompressedTexture( 'art/Earth_Disp.dds' );
    var DiffuseTexture = new THREE.ImageUtils.loadCompressedTexture("art/EARTH.dds");
    var NormalTexture = new THREE.ImageUtils.loadCompressedTexture("art/earth_normal.dds")

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

    //geometry = new THREE.SphereGeometry(150, 60, 60);
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

*/




    cameraLight = new THREE.PointLight( 0xfffff3, 1.16, 5900 );
    cameraLight.position.set( camera.position );
    scene.add( cameraLight );
    scene.fog = new THREE.Fog(0x111111, 600, 1160);
    animate();

    }

function animate() 
    {
    requestAnimationFrame( animate ); 
    scene.updateMatrixWorld();
    /*
    scene.traverse( function ( object ) {

        if ( object instanceof THREE.LOD ) {

            object.update( camera );

        }

    } );
    lod.children[0].rotation.y += 0.001; 
    */
    renderer.render( scene, camera );  
    cameraLight.position.copy( camera.position );
    controls.update(); 
    update();
    }

function update(){
}
function loadEarth( geometry, materials ) 
    {   

    var DiffuseTexture = new THREE.ImageUtils.loadCompressedTexture("art/EARTH2.dds");
    var NormalTexture = new THREE.ImageUtils.loadCompressedTexture("art/earth_normal.dds");
    var SpecularTexture = new THREE.ImageUtils.loadCompressedTexture("art/Earth_Spec.dds")
    var ambient = 0x050500, diffuse = 0x141F1F, specular = 0x2E2E1F, shininess =50, scale = 23;

    var material = new THREE.MeshPhongMaterial( {
                    map: DiffuseTexture,
                    specularMap: SpecularTexture,
                    ambient: ambient,
                    normalMap: NormalTexture,
                    shininess: shininess
                } ); 
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    mesh = new THREE.Mesh( geometry, material); 
    scene.add( mesh ); 
    }  




function onMouseMove( event_info ) 
{
    event_info.preventDefault();  
    mouse.x = ( event_info.clientX / (window.innerWidth) ) * 2 - 1;
    mouse.y = - ( event_info.clientY / window.innerHeight ) * 2 + 1;   
    mouse_vector.set( mouse.x, mouse.y, mouse.z );
    projector.unprojectVector( mouse_vector, camera );
    var direction = mouse_vector.sub( camera.position ).normalize();
    ray.set( camera.position, direction );
    intersects = ray.intersectObjects(collector.children, true );
    if(intersects.length>0)
        {   
            var intersected = intersects[0].object;
            intersected.material.materials[0].opacity = 0.75;
        }
    else
    {
        for(i=0; i<collector.children.length;i++)
        {
            collector.children[i].material.materials[0].opacity = 0;
        }
    }
}