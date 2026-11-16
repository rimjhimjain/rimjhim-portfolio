"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Vec3 = readonly [number, number, number];
type Rgb = readonly [number, number, number];

type Geometry = {
  positions: Float32Array;
  normals: Float32Array;
  indices: Uint16Array;
};

type SceneMesh = {
  geometry: Geometry;
  color: Rgb;
  position: Vec3;
  rotation: Vec3;
  vertexOffset: number;
  indexOffset: number;
  indexCount: number;
};

const point = (x: number, y: number, z: number): Vec3 => [x, y, z];
const color = (r: number, g: number, b: number): Rgb => [r / 255, g / 255, b / 255];

function normalize([x, y, z]: Vec3): Vec3 {
  const length = Math.hypot(x, y, z) || 1;
  return point(x / length, y / length, z / length);
}

function cross([ax, ay, az]: Vec3, [bx, by, bz]: Vec3): Vec3 {
  return point(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
}

function createTorusKnot(): Geometry {
  const rings = 192;
  const sides = 12;
  const positions = new Float32Array((rings + 1) * (sides + 1) * 3);
  const normals = new Float32Array(positions.length);
  const indices: number[] = [];
  const centerAt = (t: number): Vec3 => {
    const radial = 0.66 * (2 + Math.cos(3 * t));
    return point(radial * Math.cos(2 * t), radial * Math.sin(2 * t), 0.66 * Math.sin(3 * t));
  };

  for (let ring = 0; ring <= rings; ring++) {
    const t = (ring / rings) * Math.PI * 2;
    const center = centerAt(t);
    const tangent = normalize(
      point(
        centerAt(t + 0.001)[0] - centerAt(t - 0.001)[0],
        centerAt(t + 0.001)[1] - centerAt(t - 0.001)[1],
        centerAt(t + 0.001)[2] - centerAt(t - 0.001)[2],
      ),
    );
    const reference = Math.abs(tangent[1]) > 0.9 ? point(1, 0, 0) : point(0, 1, 0);
    const frameNormal = normalize(cross(tangent, reference));
    const binormal = normalize(cross(tangent, frameNormal));

    for (let side = 0; side <= sides; side++) {
      const angle = (side / sides) * Math.PI * 2;
      const normal = normalize(
        point(
          frameNormal[0] * Math.cos(angle) + binormal[0] * Math.sin(angle),
          frameNormal[1] * Math.cos(angle) + binormal[1] * Math.sin(angle),
          frameNormal[2] * Math.cos(angle) + binormal[2] * Math.sin(angle),
        ),
      );
      const offset = ring * (sides + 1) + side;
      positions.set(
        [
          center[0] + normal[0] * 0.15,
          center[1] + normal[1] * 0.15,
          center[2] + normal[2] * 0.15,
        ],
        offset * 3,
      );
      normals.set(normal, offset * 3);
    }
  }

  for (let ring = 0; ring < rings; ring++) {
    for (let side = 0; side < sides; side++) {
      const a = ring * (sides + 1) + side;
      const b = a + sides + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  return { positions, normals, indices: new Uint16Array(indices) };
}

function createTorus(radius: number, tube: number, segments = 160, sides = 7): Geometry {
  const positions = new Float32Array((segments + 1) * (sides + 1) * 3);
  const normals = new Float32Array(positions.length);
  const indices: number[] = [];

  for (let segment = 0; segment <= segments; segment++) {
    const u = (segment / segments) * Math.PI * 2;
    for (let side = 0; side <= sides; side++) {
      const v = (side / sides) * Math.PI * 2;
      const normal = point(Math.cos(v) * Math.cos(u), Math.cos(v) * Math.sin(u), Math.sin(v));
      const offset = segment * (sides + 1) + side;
      positions.set(
        [
          (radius + tube * Math.cos(v)) * Math.cos(u),
          (radius + tube * Math.cos(v)) * Math.sin(u),
          tube * Math.sin(v),
        ],
        offset * 3,
      );
      normals.set(normal, offset * 3);
    }
  }

  for (let segment = 0; segment < segments; segment++) {
    for (let side = 0; side < sides; side++) {
      const a = segment * (sides + 1) + side;
      const b = a + sides + 1;
      indices.push(a, a + 1, b, b, a + 1, b + 1);
    }
  }

  return { positions, normals, indices: new Uint16Array(indices) };
}

function createSphere(radius: number, segments = 18, rings = 12): Geometry {
  const positions = new Float32Array((segments + 1) * (rings + 1) * 3);
  const normals = new Float32Array(positions.length);
  const indices: number[] = [];

  for (let ring = 0; ring <= rings; ring++) {
    const latitude = (ring / rings) * Math.PI;
    for (let segment = 0; segment <= segments; segment++) {
      const longitude = (segment / segments) * Math.PI * 2;
      const normal = point(
        Math.sin(latitude) * Math.cos(longitude),
        Math.cos(latitude),
        Math.sin(latitude) * Math.sin(longitude),
      );
      const offset = ring * (segments + 1) + segment;
      positions.set(normal.map((value) => value * radius), offset * 3);
      normals.set(normal, offset * 3);
    }
  }

  for (let ring = 0; ring < rings; ring++) {
    for (let segment = 0; segment < segments; segment++) {
      const a = ring * (segments + 1) + segment;
      const b = a + segments + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  return { positions, normals, indices: new Uint16Array(indices) };
}

function shader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const result = gl.createShader(type);
  if (!result) return null;
  gl.shaderSource(result, source);
  gl.compileShader(result);
  if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) {
    gl.deleteShader(result);
    return null;
  }
  return result;
}

function rotate([x, y, z]: Vec3, [rx, ry, rz]: Vec3): Vec3 {
  const x1 = x;
  const y1 = y * Math.cos(rx) - z * Math.sin(rx);
  const z1 = y * Math.sin(rx) + z * Math.cos(rx);
  const x2 = x1 * Math.cos(ry) + z1 * Math.sin(ry);
  const y2 = y1;
  const z2 = -x1 * Math.sin(ry) + z1 * Math.cos(ry);
  return point(
    x2 * Math.cos(rz) - y2 * Math.sin(rz),
    x2 * Math.sin(rz) + y2 * Math.cos(rz),
    z2,
  );
}

function makeMeshes() {
  const mainKnot = createTorusKnot();
  const innerOrbit = createTorus(1.58, 0.012);
  const outerOrbit = createTorus(1.83, 0.008);
  const satellites = [createSphere(0.075), createSphere(0.06), createSphere(0.07)];
  const meshes: SceneMesh[] = [
    { geometry: mainKnot, color: color(129, 158, 187), position: point(0, 0, 0), rotation: point(0, 0, 0), vertexOffset: 0, indexOffset: 0, indexCount: 0 },
    { geometry: innerOrbit, color: color(243, 215, 53), position: point(0, 0, 0), rotation: point(1.08, 0.16, 0.2), vertexOffset: 0, indexOffset: 0, indexCount: 0 },
    { geometry: outerOrbit, color: color(237, 81, 63), position: point(0, 0, 0), rotation: point(-0.64, 0.38, -0.4), vertexOffset: 0, indexOffset: 0, indexCount: 0 },
    { geometry: satellites[0], color: color(243, 215, 53), position: point(-1.18, 0.65, 0.4), rotation: point(0, 0, 0), vertexOffset: 0, indexOffset: 0, indexCount: 0 },
    { geometry: satellites[1], color: color(237, 81, 63), position: point(1.32, 0.12, -0.25), rotation: point(0, 0, 0), vertexOffset: 0, indexOffset: 0, indexCount: 0 },
    { geometry: satellites[2], color: color(129, 158, 187), position: point(-0.48, -1.25, 0.18), rotation: point(0, 0, 0), vertexOffset: 0, indexOffset: 0, indexCount: 0 },
  ];

  let vertexOffset = 0;
  let indexOffset = 0;
  for (const mesh of meshes) {
    mesh.vertexOffset = vertexOffset;
    mesh.indexOffset = indexOffset;
    mesh.indexCount = mesh.geometry.indices.length;
    vertexOffset += mesh.geometry.positions.length / 3;
    indexOffset += mesh.indexCount;
  }
  return { meshes, vertexCount: vertexOffset, indexCount: indexOffset };
}

export function SignalObject() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const host = root.current;
    const element = canvas.current;
    if (!host || !element) return;

    const gl = element.getContext("webgl", {
      alpha: true,
      antialias: true,
      depth: true,
      powerPreference: "low-power",
    });
    if (!gl) {
      host.classList.add("scene-fallback");
      return;
    }

    const vertex = shader(
      gl,
      gl.VERTEX_SHADER,
      "attribute vec3 a_position; attribute vec3 a_color; varying vec3 v_color; void main(){ gl_Position=vec4(a_position,1.0); v_color=a_color; }",
    );
    const fragment = shader(
      gl,
      gl.FRAGMENT_SHADER,
      "precision mediump float; varying vec3 v_color; void main(){ gl_FragColor=vec4(v_color,1.0); }",
    );
    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      host.classList.add("scene-fallback");
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      host.classList.add("scene-fallback");
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      host.classList.add("scene-fallback");
      return;
    }

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const colorLocation = gl.getAttribLocation(program, "a_color");
    const vertexBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    if (positionLocation < 0 || colorLocation < 0 || !vertexBuffer || !indexBuffer) {
      gl.deleteBuffer(vertexBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
      host.classList.add("scene-fallback");
      return;
    }

    const scene = makeMeshes();
    const packed = new Float32Array(scene.vertexCount * 6);
    const indices = new Uint16Array(scene.indexCount);
    for (const mesh of scene.meshes) {
      for (let index = 0; index < mesh.geometry.indices.length; index++) {
        indices[mesh.indexOffset + index] = mesh.vertexOffset + mesh.geometry.indices[index];
      }
    }

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, packed, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.disable(gl.CULL_FACE);
    gl.enableVertexAttribArray(positionLocation);
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 24, 0);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 24, 12);

    let frameId = 0;
    let visible = true;
    let fallbackOnly = false;
    let width = 1;
    let height = 1;
    let rotationX = 0.12;
    let rotationY = -0.24;
    let targetX = rotationX;
    let targetY = rotationY;

    const resize = () => {
      const bounds = element.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(bounds.width * ratio));
      height = Math.max(1, Math.round(bounds.height * ratio));
      if (element.width !== width || element.height !== height) {
        element.width = width;
        element.height = height;
        gl.viewport(0, 0, width, height);
      }
      draw(reduced ? 0 : performance.now());
    };

    const draw = (now: number) => {
      if (fallbackOnly || gl.isContextLost()) {
        fallbackOnly = true;
        host.classList.add("scene-fallback");
        return;
      }
      const time = reduced ? 0 : now * 0.00016;
      rotationX += (targetX - rotationX) * 0.055;
      rotationY += (targetY - rotationY) * 0.055;
      const aspect = width / Math.max(1, height);
      const light = normalize(point(-0.42, 0.72, 0.78));

      for (const mesh of scene.meshes) {
        const vertexTotal = mesh.geometry.positions.length / 3;
        for (let vertexIndex = 0; vertexIndex < vertexTotal; vertexIndex++) {
          const source = vertexIndex * 3;
          const destination = (mesh.vertexOffset + vertexIndex) * 6;
          const rawPosition = point(
            mesh.geometry.positions[source] + mesh.position[0],
            mesh.geometry.positions[source + 1] + mesh.position[1],
            mesh.geometry.positions[source + 2] + mesh.position[2],
          );
          const localPosition = rotate(rawPosition, mesh.rotation);
          const rotatedPosition = rotate(
            localPosition,
            point(rotationX + Math.sin(time * 0.7) * 0.05, rotationY + time, Math.sin(time * 0.5) * 0.04),
          );
          const distance = 5.3 - rotatedPosition[2];
          const perspective = 2.0 / distance;
          packed[destination] = (rotatedPosition[0] * perspective) / Math.max(0.82, aspect);
          packed[destination + 1] = rotatedPosition[1] * perspective;
          packed[destination + 2] = Math.max(-0.98, Math.min(0.98, ((distance - 2) / 6) * 2 - 1));

          const rawNormal = point(
            mesh.geometry.normals[source],
            mesh.geometry.normals[source + 1],
            mesh.geometry.normals[source + 2],
          );
          const transformedNormal = normalize(
            rotate(rotate(rawNormal, mesh.rotation), point(rotationX, rotationY + time, 0)),
          );
          const diffuse = Math.max(0, transformedNormal[0] * light[0] + transformedNormal[1] * light[1] + transformedNormal[2] * light[2]);
          const rim = Math.pow(Math.max(0, 1 - Math.abs(transformedNormal[2])), 3) * 0.15;
          const intensity = 0.28 + diffuse * 0.68 + rim;
          packed[destination + 3] = Math.min(1, mesh.color[0] * intensity);
          packed[destination + 4] = Math.min(1, mesh.color[1] * intensity);
          packed[destination + 5] = Math.min(1, mesh.color[2] * intensity);
        }
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, packed);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      for (const mesh of scene.meshes) {
        gl.drawElements(gl.TRIANGLES, mesh.indexCount, gl.UNSIGNED_SHORT, mesh.indexOffset * 2);
      }
    };

    const render = (now: number) => {
      frameId = 0;
      if (!visible) return;
      draw(now);
      if (!reduced && !fallbackOnly) frameId = window.requestAnimationFrame(render);
    };

    const requestRender = () => {
      if (!visible || fallbackOnly || frameId) return;
      frameId = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reduced || event.pointerType !== "mouse") return;
      const bounds = element.getBoundingClientRect();
      targetY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.8;
      targetX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -0.55;
      requestRender();
    };

    const onContextLost: EventListener = (event) => {
      event.preventDefault();
      fallbackOnly = true;
      host.classList.add("scene-fallback");
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(element);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) requestRender();
      else {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    });
    visibilityObserver.observe(host);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("webglcontextlost", onContextLost);
    resize();
    requestRender();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteBuffer(vertexBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
      host.classList.remove("scene-fallback");
    };
  }, [reduced]);

  return (
    <div
      className="webgl-scene"
      ref={root}
      role="img"
      aria-label="A three-dimensional signal knot rotates among orbiting rings and connected color nodes, representing the connections between AI, backend systems, and people."
    >
      <canvas ref={canvas} aria-hidden="true" />
      <span className="webgl-fallback" aria-hidden="true" />
    </div>
  );
}
