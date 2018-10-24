import * as THREE from "three";
import vertexShader from "./vertexShader";

interface ScreenSize {
  width: number;
  height: number;
}

const uniforms = {
  time: { type: "f", value: 0 },
  color: { value: new THREE.Color(0xffffff) }
};

const fragmentShader = `
uniform mediump vec3 color;
void main() {
    gl_FragColor = vec4( color, 1.0);
}`;

export default ({ canvas, screenSize }: { canvas: HTMLDivElement, screenSize: ScreenSize }) => {
  const scene = buildScene();
  const renderer = buildRender(screenSize);
  const camera = buildCamera(screenSize);
  const sceneObjects = createSceneSubjects(scene);

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
    const lineDiff = 0.2;
    const rowDiff = 0.05;
    const multiplier = 64.1;
    const material = new THREE.RawShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader({ lineDiff, rowDiff, multiplier }),
      fragmentShader
    });

    const lines = [];
    for (let x = 0; x < 30; x++) {
      var curve = new THREE.SplineCurve([
        new THREE.Vector2(-25, 3 * x - 50),
        new THREE.Vector2(25, 3 * x - 25)
      ]);
      var points = curve.getPoints(150);
      var geometry = new THREE.BufferGeometry().setFromPoints(points);

      // Create the final object to add to the scene
      var splineObject = new THREE.Line(geometry, material);
      scene.add(splineObject);
      lines.push(splineObject);
    }

    const light = new THREE.AmbientLight(0x404040);
    light.position.set(10, 0, 25);
    scene.add(light);

    return { material, lines, light };
  }
  function update(time: number) {
    sceneObjects.material.uniforms.time.value = time / 10000;
    renderer.render(scene, camera);
  }
  return {
    update
  };
};
