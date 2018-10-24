import * as THREE from "three";

interface ScreenSize {
  width: number;
  height: number;
}

export default ({ canvas, screenSize }: { canvas: HTMLDivElement, screenSize: ScreenSize }) => {
  const scene = buildScene();
  const renderer = buildRender(screenSize);
  const camera = buildCamera(screenSize);
  createSceneSubjects(scene);

  function buildScene(): THREE.Scene {
    return new THREE.Scene();
  }

  function buildRender({ width, height }: ScreenSize) {
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    canvas.innerHTML = "";
    canvas.appendChild(renderer.domElement);
    return renderer;
  }

  function buildCamera({ width, height }: ScreenSize) {
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(50, 0.5 * aspect, 1, 10000);
    camera.position.z = 100;
    return camera;
  }

  function createSceneSubjects(scene: THREE.Scene) {

    const light = new THREE.AmbientLight(0x404040);
    light.position.set(10, 0, 25);
    scene.add(light);

    return { light };
  }
  function update(time: number) {
    renderer.render(scene, camera);
  }
  return {
    update
  };
};
