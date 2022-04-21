import { Component, Host, h, Prop, State } from '@stencil/core';
import { Delaunay, Voronoi } from 'd3-delaunay';
import { min, max } from 'd3';
import * as CANNON from 'cannon-es';

type Poly = {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
  width: number;
  height: number;
  backgroundPosition: string;
  backgroundImage: string;
  clipPath: string;
};

const PIECES = 200;

@Component({
  tag: 'shatter-img',
  styleUrl: 'shatter-img.css',
  shadow: true,
})
export class ShatterImg {
  delaunay: Delaunay<number>;
  voronoi: Voronoi<number>;
  width = 900;
  height = 900;
  points: [number, number][] = [];
  polygons: [number, number][][] = [];
  world: CANNON.World;
  polys: Poly[] = [];
  polyMap: Map<number, Poly> = new Map();
  imageEl: HTMLImageElement;

  @State() stepNumber: number = 0;

  @Prop() src: string;

  constructor() {
    this.simulate = this.simulate.bind(this);
  }

  componentWillLoad() {
    this.points = Array.from({ length: PIECES }, () => [Math.random() * this.width, Math.random() * this.height]);
    this.delaunay = Delaunay.from(this.points);
    this.voronoi = this.delaunay.voronoi([0, 0, this.width, this.height]);
    this.world = new CANNON.World({gravity: new CANNON.Vec3(0, 0, 0)});

    const polyGenerator = this.voronoi.cellPolygons();

    let next;
    do {
      next = polyGenerator.next();

      if (!next.done && next.value) {
        this.polygons.push(next.value);
      }
    } while (!next.done);

    this.populateWorld(this.polygons);
  }

  calcPolyDimensionsAndStyles(voronoiCell: [number, number][]): Poly {
    const xMin = min(voronoiCell, (p: [number, number]) => p[0]);
    const yMin = min(voronoiCell, (p: [number, number]) => p[1]);

    const xMax = max(voronoiCell, (p: [number, number]) => p[0]);
    const yMax = max(voronoiCell, (p: [number, number]) => p[1]);

    const width = xMax - xMin;
    const height = yMax - yMin;
    const clipPath = `polygon(${voronoiCell.map(p => `${p[0] - xMin}px ${p[1] - yMin}px`).join()})`;
    const backgroundImage = `url(${this.src})`;
    const backgroundPosition = `left -${xMin}px top -${yMin}px`;

    return {
      xMin,
      yMin,
      xMax,
      yMax,
      width,
      height,
      clipPath,
      backgroundImage,
      backgroundPosition,
    };
  }

  populateWorld(voronoiCells: [number, number][][]) {
    voronoiCells.forEach(c => {
      /* console.log('Cell: ', c); */
      const newPoly = this.calcPolyDimensionsAndStyles(c);

      /* const bottomVertices = c.map(p => new CANNON.Vec3(p[0], p[1], 0));
       * const topVertices = c.map(p => new CANNON.Vec3(p[0], p[1], 10));
       * const allVertices = [...bottomVertices, ...topVertices];

       * const sides = c.length;

       * const surfaceFaces = allVertices.reduce((acc, v: CANNON.Vec3, idx) => {
       *   if (idx < sides) {
       *     if (acc[0]) {
       *       acc[0].push(idx);
       *     } else {
       *       acc[0] = [idx];
       *     }
       *   } else if (idx < 2 * sides) {
       *     if (acc[1]) {
       *       acc[1].push(idx);
       *     } else {
       *       acc[1] = [idx];
       *     }
       *   }

       *   return acc;
       * }, []);

       * let edgeFaces: number[][] = [];

       * for (let i = 0; i < sides - 1; i++) {
       *   const v1 = i;
       *   const v2 = i + 1;
       *   const v3 = i + sides;
       *   const v4 = i + sides + 1;

       *   edgeFaces.push([ v1, v2, v3, v4 ]);
       * }

       * const shape = new CANNON.ConvexPolyhedron({ vertices: allVertices, faces: [...surfaceFaces, ...edgeFaces] });
       */

      const shape = new CANNON.Box(new CANNON.Vec3(newPoly.width / 2, newPoly.height / 2, 5));
      const position = new CANNON.Vec3(newPoly.xMin, newPoly.yMin, 1);

      const body = new CANNON.Body({ shape, position, mass: 1, collisionFilterMask: 2, collisionFilterGroup: 1 });

      this.polyMap.set(body.id, newPoly);

      this.world.addBody(body);
    });

    const wreckingBaaaall = new CANNON.Body({ shape: new CANNON.Sphere(this.width / 2), mass: 100, collisionFilterGroup: 2 });
    wreckingBaaaall.position = new CANNON.Vec3(this.width / 2, this.height / 2, -this.width * 2);
    wreckingBaaaall.velocity = new CANNON.Vec3(0, 0, 1000);
    wreckingBaaaall.addEventListener("collide", (event: { body: CANNON.Body, target: CANNON.Body }) => {
      this.imageEl.hidden = true;

      event.target.collisionFilterGroup = 2;
    });

    this.world.addBody(wreckingBaaaall);
  }

  /* polyToElement(poly: [ number, number ][]) {
   *   const { xMin, yMin, width, height } = this.calcPolyDimensionsAndStyles(poly);

   *   const bottomVertices = poly.map(p => new CANNON.Vec3(p[0], p[1], 0));
   *   const topVertices = poly.map(p => new CANNON.Vec3(p[0], p[1], 10));

   *   const shape = new CANNON.ConvexPolyhedron({ vertices: [...bottomVertices, ...topVertices] });

   *   const position = new CANNON.Vec3(xMin, yMin, 5);

   *   const body = new CANNON.Body({ shape, position, type: CANNON.Body.STATIC });

   *   this.world.addBody(body);

   *   const style = {
   *     position: 'absolute',
   *     width: `${width}px`,
   *     height: `${height}px`,
   *     transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`,
   *   };

   * }
   */
  renderBodyToCSS(body: CANNON.Body) {
    const finalX = body.position.x;
    const finalY = body.position.y;
    const finalZ = body.position.z;

    const [{ x, y, z }, radians] = body.quaternion.toAxisAngle();

    const translation = `translate3d(${finalX}px, ${finalY}px, ${finalZ}px)`;

    const rotation = `rotate3d(${x}, ${z}, ${y}, ${radians}rad)`;

    const boxShadow = `${finalZ + 1}px ${finalZ * 2 + 1}px ${finalZ * 2 + 1}px black`;

    return { transform: `${translation} ${rotation}`, zIndex: `${Math.trunc(finalZ)}`, boxShadow };
  }

  simulate() {
    requestAnimationFrame(this.simulate);
    /* console.log('Running'); */

    this.world.fixedStep();
    this.stepNumber = this.world.stepnumber;
  }

  render() {
    return (
      <Host>
        <div class="container" style={{ width: `${this.width}px`, height: `${this.height}px` }} onClick={this.simulate}>
          {this.world.bodies.map(b => {
            if (this.polyMap.has(b.id)){
              const style = this.renderBodyToCSS(b);
              const { clipPath, backgroundImage, backgroundPosition, width, height } = this.polyMap.get(b.id)!;

              const finalStyle = {
                ...style,
                clipPath,
                backgroundImage,
                backgroundPosition,
                width: `${width}px`,
                height: `${height}px`,
              };

              return <div class="poly" style={finalStyle} />;
            } else {
              return null;
            }
          })}
          <img ref={(el: HTMLImageElement) => this.imageEl = el} src={this.src} />
        </div>
      </Host>
    );
  }
}
