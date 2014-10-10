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
var rendererStats  = new THREEx.RendererStats()
var regions = new THREE.Object3D();
var stats;
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
    renderer.domElement.addEventListener( 'mousedown', onMouseDown, false );
    container = document.getElementById( 'ThreeJS' ); 
    container.appendChild( renderer.domElement ); 

    document.getElementById('stats').appendChild( rendererStats.domElement )

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '-50px';
    document.getElementById('stats').appendChild( stats.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement ); 
    controls.target.set(0,0,0);
    /*
    controls.noPan = true;
    controls.minDistance = 500;
    controls.maxDistance = 1160;
    //controls.noZoom = true;
    controls.noKeys = true;
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.3;
*/
    jsonLoader.load("art/earth.js", loadEarth);
    jsonLoader.load("art/madagascar.js", loadRegions);  

    scene.add(regions)
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
stats.update();
    renderer.render( scene, camera );  
    cameraLight.position.copy( camera.position );
    rendererStats.update(renderer);
    controls.update(); 
    update();
    }

function update(){
}
function loadEarth( geometry, materials ) 
    {   
/*
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
    */
    var material = new THREE.MeshFaceMaterial( materials );
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    mesh = new THREE.Mesh( geometry, material); 
    scene.add( mesh ); 
    }  

function loadRegions( geometry, materials ) 
    {   
    var material = new THREE.MeshLambertMaterial( {
                    color: 0xff0000,
                    ambient: 0xaaaaaa,
                    specular: 0xfffff2,
                    opacity: 0.0,
                    transparent: true
                } ); 
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    var mesh = new THREE.Mesh( geometry, material); 
    regions.add( mesh ); 
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
    intersects = ray.intersectObjects(regions.children, true );
    if(intersects.length>0)
        {   
            var intersected = intersects[0].object;
            intersected.material.opacity = 0.75;
        }
    else
    {
        for(i=0; i<regions.children.length;i++)
        {
            regions.children[i].material.opacity = 0;
        }
    }
}
function onMouseDown( event_info ) 
{
    event_info.preventDefault();  
    mouse.x = ( event_info.clientX / (window.innerWidth) ) * 2 - 1;
    mouse.y = - ( event_info.clientY / window.innerHeight ) * 2 + 1;   
    mouse_vector.set( mouse.x, mouse.y, mouse.z );
    projector.unprojectVector( mouse_vector, camera );
    var direction = mouse_vector.sub( camera.position ).normalize();
    ray.set( camera.position, direction );
    intersects = ray.intersectObjects(scene.children, true );
    if(intersects.length>0)
        {   
            console.log(intersects[0].face.materialIndex);
            if(intersects[0].face.materialIndex>0){
            intersects[0].object.material.materials[intersects[0].face.materialIndex].emissive = new THREE.Color( 0xff0000 );
        }
        }
}