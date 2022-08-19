import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BoxGeometry, BufferGeometry, MeshPhongMaterial, Scene } from 'three';

export default class BasicScene extends THREE.Scene {

    debugger: GUI = new GUI();
    camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
    renderer: THREE.Renderer = new THREE.WebGLRenderer();
    orbitals: OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    lights: Array<THREE.Light> = [];
    lightCount: number = 6;
    lightDistance: number = 3;
    width = window.innerWidth;
    height = window.innerHeight;

    constructor() {
        super();
        this.background = new THREE.Color("#333333");
    }

    initialize(debug: boolean = true, addGridHelper: boolean = true){
        
        this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, .1, 1000);
        this.camera.position.z = 5;
        this.camera.position.y = 0;
        this.camera.position.x = 0;
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("app") as HTMLCanvasElement,
            alpha: true
        });
        this.renderer.setSize(this.width, this.height);
        BasicScene.addWindowResizing(this.camera, this.renderer);
        this.orbitals = new OrbitControls(this.camera, this.renderer.domElement);
        const light = new THREE.DirectionalLight(0xffffff, 0.05);
        light.position.set(0, 0, 2);
        this.add(light);

        const geometry: BufferGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0,
             1.0,  1.0,  1.0,
        
             1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0, -1.0,  1.0
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material = new THREE.MeshBasicMaterial({color: 0xff0000});
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }

    static addWindowResizing(camera: THREE.PerspectiveCamera, renderer: THREE.Renderer){
        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }
    }
};