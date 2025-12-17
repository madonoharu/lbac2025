import { range } from "es-toolkit";
import { FpsImpl, TARGET_FPS } from "./fps";

const SPEED = 0.001;
const OPTIONS = { fill: "both", duration: 1000 / TARGET_FPS } as const;

const getColor = () => {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
};

export class Dot {
  color = getColor();
  r = Math.random() * Math.PI * 2;
  x = Math.random();
  y = Math.random();
  vx = Math.cos(this.r) * SPEED;
  vy = Math.sin(this.r) * SPEED;
  id: number;
  elem: Element | undefined;

  constructor(id: number) {
    this.id = id;
  }

  setElem(elem: Element) {
    this.elem = elem;
    (elem as HTMLElement).style.backgroundColor = this.color;
  }

  walk() {
    const { x, y, vx, vy } = this;

    this.x = x + vx;
    this.y = y + vy;

    if (this.x >= 1) {
      this.x = 2 - this.x;
      this.vx = -vx;
    } else if (this.x < 0) {
      this.x += Math.abs(this.x);
      this.vx = -vx;
    }

    if (this.y >= 1) {
      this.y = 2 - this.y;
      this.vy = -vy;
    } else if (this.y < 0) {
      this.y += Math.abs(this.y);
      this.vy = -vy;
    }

    return this;
  }

  animate() {
    this.elem?.animate(
      {
        top: `calc(${this.y * 100}% - 16px)`,
        left: `calc(${this.x * 100}% - 16px)`,
      },
      OPTIONS
    );

    return this;
  }
}

export class Universe {
  list: Dot[];
  fps: FpsImpl;

  constructor(list: Dot[], fps: FpsImpl) {
    this.list = list;
    this.fps = fps;
  }

  async update() {
    const { list, fps } = this;

    await fps.tick(() => {
      list.forEach((d) => d.walk().animate());
    });

    return new Universe(list, fps);
  }
}

export const createUniverse = (size: number) => {
  return new Universe(
    range(size).map((n) => new Dot(n)),
    new FpsImpl()
  );
};
