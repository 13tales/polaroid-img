import { Component, Host, h, Prop, State } from '@stencil/core';
import * as CANNON from 'cannon-es';

@Component({
  tag: 'polaroid-img',
  styleUrl: 'polaroid-img.css',
  shadow: true,
})
export class PolaroidImg {
  world: CANNON.World;
  photoBody: CANNON.Body;
  groundBody: CANNON.Body;
  mappingFactor: number;

  @State() worldX: number = 0;
  @State() worldY: number = 0;
  @State() worldZ: number = 0;
  @State() orientation: CANNON.Quaternion | null;

  @State() running: boolean = false;

  @Prop() src: string;
  //File change

  constructor() {
    //Image dimensions
    // 88mm x 107mm
    // 330 x 375
    // Factor = 36
    this.mappingFactor = 36;

    this.simulate = this.simulate.bind(this);
    this.restartSimulation = this.restartSimulation.bind(this);

    this.setupSimulation();
  }

  setupSimulation() {
    // Setup our physics world
    this.world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.8, 0), // cm/s²
    });

    // Size the box using a vector that's half of the final dimensions
    const halfExtents = new CANNON.Vec3(4.4, 0.05, 5.3);
    const boxShape = new CANNON.Box(halfExtents);

    this.photoBody = new CANNON.Body({
      mass: 1,
      shape: boxShape,
    });

    this.photoBody.position.set(4.4, 2, -10.7);
    this.photoBody.velocity.set(0, 0, 20);
    this.world.addBody(this.photoBody);
    this.readBodyPosition();

    // Create a static plane for the ground
    this.groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC, // can also be achieved by setting the mass to 0
      shape: new CANNON.Plane(),
    });

    this.groundBody.position.set(0, 0, 0);
    this.groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up

    this.world.addBody(this.groundBody);
  }

  componentWillLoad() {
    /* this.simulate(); */
  }

  restartSimulation() {
    // Size the box using a vector that's half of the final dimensions
    const halfExtents = new CANNON.Vec3(4.4, 0.05, 5.3);
    const boxShape = new CANNON.Box(halfExtents);

    this.photoBody = new CANNON.Body({
      mass: 1,
      shape: boxShape,
    });

    this.photoBody.position.set(4.4, 2, -10.7);
    this.photoBody.applyTorque(new CANNON.Vec3(200, 200, 200));
    this.photoBody.velocity.set(0, 0, 40);

    this.world.addBody(this.photoBody);
    this.readBodyPosition();

    // Create a static plane for the ground
    this.groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC, // can also be achieved by setting the mass to 0
      shape: new CANNON.Plane(),
    });

    this.groundBody.position.set(0, 0, 0);
    this.groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up

    this.world.addBody(this.groundBody);

    this.running = true;

    if (this.running) {
      this.simulate();
    }
  }

  simulate() {
    if (this.running) {
      requestAnimationFrame(this.simulate);
      this.world.fixedStep();

      this.readBodyPosition();
    }
  }

  readBodyPosition() {
    this.worldX = this.photoBody.position.x;
    this.worldY = this.photoBody.position.y;
    this.worldZ = this.photoBody.position.z;
    this.orientation = this.photoBody.quaternion;
  }

  mapToStyle() {
    const finalX = this.worldX * this.mappingFactor;
    const finalY = this.worldZ * this.mappingFactor;
    const finalZ = this.worldY * this.mappingFactor;

    /* console.log("Coords x: ", finalX, " y: ", finalY, " z: ", finalZ); */

    const [{ x, y, z }, radians] = this.orientation.toAxisAngle();

    const translation = this.running ? `translate3d(${finalX}px, ${finalY}px, ${finalZ}px)` : `translate(40%, -100%)`;

    const rotation = `rotate3d(${x}, ${y}, ${z}, ${radians}rad)`;

    const boxShadow = `${finalZ}px ${finalZ * 2}px ${finalZ * 2}px hsl(0deg 0% 0% / ${0.35})`;

    return { transform: `${translation} ${rotation}`, boxShadow };
  }

  render() {
    return (
      <Host>
        <div class="container" onClick={this.restartSimulation}>
          <div class="frame" style={this.mapToStyle()}>
            <img src={this.src} />
          </div>
        </div>
        <div>{`World coords - x:${this.worldX.toFixed(2)}, y: ${this.worldY.toFixed(2)}, z: ${this.worldZ.toFixed(2)}`}</div>
        <div>{`Box velocity- x:${this.photoBody.velocity.x.toFixed(2)}, y: ${this.photoBody.velocity.y.toFixed(2)}, z: ${this.photoBody.velocity.z.toFixed(2)}`}</div>
        <div>{`Render coords - x:${(this.worldX * this.mappingFactor).toFixed()}, \
 y: ${(this.worldZ * this.mappingFactor).toFixed()}, \
 z: ${(this.worldY * this.mappingFactor).toFixed()}`}</div>
      </Host>
    );
  }
}
