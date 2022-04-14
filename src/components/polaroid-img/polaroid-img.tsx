import { Component, h, Host, getAssetPath, Prop, State } from '@stencil/core';
import * as CANNON from 'cannon-es';

const MAPPING_FACTOR = 36;

@Component({
  tag: 'polaroid-img',
  styleUrl: 'polaroid-img.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class PolaroidImg {
  world: CANNON.World;
  photoBody: CANNON.Body;
  groundBody: CANNON.Body;
  images: string[] = [];
  audioEl!: HTMLAudioElement;

  @State() nextIdx: number = 0;
  @State() orientation: CANNON.Quaternion | null;

  @State() stepNumber: number = 0;

  @State() photos: Map<number, { imgSrc: string; developed: boolean; styles: { [k: string]: number } }> = new Map();

  @Prop() data: string | string[] = [];

  constructor() {
    //Image dimensions
    // 88mm x 107mm
    // 330 x 375
    // Factor = 36

    this.simulate = this.simulate.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.addPhoto = this.addPhoto.bind(this);

    this.parseImageData(this.data);

    this.setupSimulation();
  }

  parseImageData(data: string | string[]) {
    if (typeof data === 'string') {
      this.images = data.split(/,\s?/);
    } else if (Array.isArray(data)) {
      this.images = data;
    } else {
      throw new Error('Invalid data provided');
    }
  }

  addPhoto(imgSrc: string) {
    // Size the box using a vector that's half of the final dimensions
    const halfExtents = new CANNON.Vec3(4.4, 0.01, 5.3);
    const boxShape = new CANNON.Box(halfExtents);

    const body = new CANNON.Body({
      mass: 1,
      shape: boxShape,
      collisionFilterGroup: this.nextIdx + 1,
      collisionFilterMask: 99,
    });

    const spin = Math.random() * 20 - 10;
    const velocity = Math.random() * 30 + 150;

    body.position.set(4.4, 5, -10.7);
    body.angularVelocity.set(0, Math.random() * 2 - 1, spin);
    body.velocity.set(0, 0, velocity);

    /* const newPhoto: [string, CANNON.Body] = [imgSrc, body]; */
    const contrast = Math.random() * 20 - 10 + 100;
    const saturation = Math.random() * 60 + 100;
    const brightness = Math.random() * 60 - 30 + 100;
    const blur = Math.random() * 0.25 + 0.25;
    const hue = Math.random() * 50 - 25;

    const styles = {
      contrast,
      saturation,
      brightness,
      blur,
      hue
    };

    this.world.addBody(body);

    this.photos = new Map([...this.photos.entries(), [body.id, { imgSrc, developed: false, styles }]]);
  }

  setupSimulation() {
    // Setup our physics world
    this.world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -400, 0), // cm/s²
    });

    // Create a static plane for the ground
    this.groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC, // can also be achieved by setting the mass to 0
      shape: new CANNON.Plane(),
      collisionFilterGroup: 99,
    });

    this.groundBody.position.set(0, 0, 0);
    this.groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up

    this.world.addBody(this.groundBody);

    this.simulate();
  }

  simulate() {
    requestAnimationFrame(this.simulate);

    this.world.fixedStep();

    this.world.bodies.forEach((b: CANNON.Body) => {
      if (this.photos.has(b.id) && b.velocity.almostZero(0.1)) {
        b.type = CANNON.Body.STATIC;
        const prevPhoto = this.photos.get(b.id);

        this.photos.set(b.id, { imgSrc: prevPhoto!.imgSrc, developed: true, styles: prevPhoto!.styles });
      }
    });

    this.stepNumber = this.world.stepnumber;
  }

  renderBodyToCSS(body: CANNON.Body) {
    const finalX = body.position.x * MAPPING_FACTOR;
    const finalY = body.position.z * MAPPING_FACTOR;
    const finalZ = body.position.y * MAPPING_FACTOR;

    const [{ x, y, z }, radians] = body.quaternion.toAxisAngle();

    const translation = `translate3d(${finalX}px, ${finalY}px, ${finalZ}px)`;

    const rotation = `rotate3d(${x}, ${z}, ${y}, ${radians}rad)`;

    const boxShadow = `${finalZ}px ${finalZ * 2}px ${finalZ * 2}px hsl(0deg 0% 0% / ${0.35})`;

    const { styles } = this.photos.get(body.id)!;

    return { transform: `${translation} ${rotation}`, boxShadow };
  }

  nextImage() {
    const speed = 1 + (Math.random() * 0.4 - 0.2);
    const photoTimeout = speed * 1000 + 300;
    this.audioEl.playbackRate = speed;
    this.audioEl.play();

    setTimeout(() => {
      if (this.photos.size < this.images.length) {
        this.addPhoto(this.images[this.nextIdx]);

        this.nextIdx += 1;
      } else {
        if (this.nextIdx === this.images.length) {
          this.nextIdx = 0;
        }

        setTimeout(() => {
          this.addPhoto(this.images[this.nextIdx]);

          this.nextIdx += 1;
        }, 100);

        const [key] = this.photos.entries().next().value;

        const bodyToRemove: CANNON.Body = this.world.bodies.find((b: CANNON.Body) => b.id == key);

        this.world.removeBody(bodyToRemove);

        this.photos.delete(key);
      }
    }, photoTimeout);
  }

  render() {
    const audioSrc = getAssetPath('./assets/polaroid.mp3');

    return (
      <Host>
        <audio ref={el => (this.audioEl = el as HTMLAudioElement)} src={audioSrc} />
        <div class="container" onClick={this.nextImage}>
          {this.world.bodies.map((b: CANNON.Body) => {
            if (this.photos.has(b.id)) {
              const { imgSrc, developed, styles: imgStyles } = this.photos.get(b.id)!;

              const styles = this.renderBodyToCSS(b);

              return (
                <div class="frame" ref={(el: HTMLImageElement) => {
                  if (developed) {
                    el.style.setProperty("--saturation", `${imgStyles.saturation}%`);
                    el.style.setProperty("--contrast", `${imgStyles.contrast}%`);
                    el.style.setProperty("--hue", `${imgStyles.hue}deg`);
                    el.style.setProperty("--brightness", `${imgStyles.brightness}%`);
                    el.style.setProperty("--blur", `${imgStyles.blur}px`);
                  }
                }} style={styles}>
                  <img class={developed ? "develop" : ""}  src={imgSrc} />
                </div>
              );
            }
          })}
        </div>
      </Host>
    );
  }
}
