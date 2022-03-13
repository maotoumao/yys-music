import { Game } from "@eva/eva.js";
import { RendererSystem } from "@eva/plugin-renderer";
import { EventSystem } from "@eva/plugin-renderer-event";
import { ImgSystem } from "@eva/plugin-renderer-img";
import { SoundSystem } from "@eva/plugin-sound";

export default function initSystem(canvas: HTMLCanvasElement): Game {
  return new Game({
    systems: [
      new RendererSystem({
        canvas,
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true
      }),
      new ImgSystem(),
      new EventSystem(),
      new SoundSystem(),
    ],
    autoStart: true,
  });
}
