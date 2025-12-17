import { delay } from "es-toolkit";

export const requestAnimationFramePromise = () => {
  return new Promise<number>((resolve) => {
    globalThis.requestAnimationFrame(resolve);
  });
};

export const TARGET_FPS = 60;
export const SAMPLE_SIZE = 120;

export class FpsImpl {
  count = 0;
  targetFps = TARGET_FPS;
  samples = new Float64Array(SAMPLE_SIZE);

  set(v: number) {
    this.samples[this.count % SAMPLE_SIZE] = v;
  }

  async tick(f: () => void) {
    const start = await requestAnimationFramePromise();
    f();
    const end = await requestAnimationFramePromise();
    let elapsed = end - start;

    let fps = 1000 / elapsed;

    if (fps > TARGET_FPS) {
      await delay(1000 / TARGET_FPS - elapsed);
      fps = TARGET_FPS;
    }

    this.set(fps);
    this.count += 1;
  }

  average() {
    const len = Math.min(this.count, SAMPLE_SIZE);
    return this.samples.reduce((a, b) => a + b) / len;
  }

  display() {
    const avg = this.average().toFixed(2);

    return `FPS: ${avg}`;
  }
}
