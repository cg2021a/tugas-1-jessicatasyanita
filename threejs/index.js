/**
 *
 * @param {THREE.Scene} scene
 */

/// <reference types="three" />
let scene; 
function addObjects(arr) {
    arr.forEach((obj) => scene.add(obj));
}

let cylinder, torus, torusK, sphere, cone;
let objects;

let defineObject = function(){
    cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(2.1, 2.1, 4.0, 36),
        new THREE.MeshLambertMaterial({ color: 0x49ef4, wireframe: true, })
    );
    cylinder.position.x = 0;
    
    torus = new THREE.Mesh(
        new THREE.TorusGeometry(2.1, 0.9, 8, 24),
        new THREE.MeshLambertMaterial({ color: 'lavender' })
    );
    torus.position.x = -10;
    torus.position.y = 4;

    torusK = new THREE.Mesh(
        new THREE.TorusKnotGeometry(2, 0.7, 81, 23, 2, 3),
        new THREE.MeshNormalMaterial()
    );
    torusK.position.x = 10;
    torusK.position.y = 4;

    /* ----- Sphere ------ */
    const radius =  2.5;  

    const widthSegments = 21;  

    const heightSegments = 19;  

    const phiStart = Math.PI * 1.38;  

    const phiLength = Math.PI * 2.00;  

    const thetaStart = Math.PI * 0.50;  

    const thetaLength = Math.PI * 0.28;  

    
    sphere = new THREE.Mesh(
        new THREE.SphereGeometry(
            radius,
            widthSegments, heightSegments,
            phiStart, phiLength,
            thetaStart, thetaLength),
            new THREE.MeshLambertMaterial({ color: 'yellow', wireframe: true, } )
    );
    sphere.position.x = 10;
    sphere.position.y = -4;

    /* ----- Cone -----*/
    cone = new THREE.Mesh(
        new THREE.ConeGeometry(2.0, 3.7, 50),
        new THREE.MeshLambertMaterial({ color: '#FF5C58' })
    );
    cone.position.x = -10;
    cone.position.y = -4;

    objects = [cylinder, torus, torusK, sphere, cone];
    addObjects(objects);

}

let setupLights = function() {
    //Light Settings
    const color = 0xFFFFFF;
    const intensity = 1;
    const dLight = new THREE.DirectionalLight(color, intensity);
    dLight.position.set(5, -5, 5);
    const aLight = new THREE.AmbientLight(color, intensity);
    aLight.position.set(0, 0, 10);
    const pLight = new THREE.PointLight(color, intensity, 100);
    pLight.position.set(20, 20, 20);
    const hLight = new THREE.HemisphereLight(color, '#2C2891', 1);
    hLight.position.set(0, 10, 0);
    const sLight = new THREE.SpotLight(color, intensity, 50);
    sLight.position.set(5, 10, 10);
    
    const lights = [dLight, aLight, pLight, hLight, sLight];
    addObjects(lights);

    lights.forEach((light) => {
        light.visible = false;
    });
    lights[0].visible = true;
    
    const selectedLight = document.getElementById('light');
    selectedLight.addEventListener('change', (e) => {
        const activeLight = e.target.value;
        lights.forEach((light) => {
            light.visible = false;
        });
        lights[activeLight].visible = true;
    });
}

let camera, renderer;  

let init = function() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
      
  
    camera = new THREE.PerspectiveCamera(90, 
        window.innerWidth / window.innerHeight, 
        1, //near
        10000 //far
        );
    camera.position.x = 1;
    camera.position.z = 10;
         

    defineObject();
    setupLights();
  
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement); 
};
  
    
let speed = 0.03
let mainLoop = function() {
    objects.forEach((obj) => {
        if(obj === sphere){
            obj.rotation.x += 0.03;
            obj.rotation.y += 0.01;
            obj.rotation.z += 0.01;
        }
        else if(obj === cylinder){
            obj.rotation.x += -0.01;
            obj.rotation.y += -0.01;
            obj.rotation.z += -0.01;
        }
        else{
            obj.rotation.x += 0.01;
            obj.rotation.y += 0.01;
            obj.rotation.z += 0.01;
        }
      });

      const currentPos = cylinder.position.y;
      if (currentPos >= 5 || currentPos <= -3) speed = -speed;
      cylinder.position.y += speed;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};
    
init();
mainLoop();