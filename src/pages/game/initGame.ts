import { Game, GameObject } from "@eva/eva.js";

import loadResources from "./loadResources";
import initSystem from "./initSystem";
import adaptor from "./adaptor";
import initLogic from "./initLogic";
import initEvents from "./initEvents";

export default async function (canvas: HTMLCanvasElement) {
  await loadResources();
  const game = initSystem(canvas);
  const root = adaptor(game);
  initLogic(root)
  initEvents(game);

  // @ts-ignore
  window.game = game;


  //   const bgSoundObj = new GameObject("sound");
  //   const bgSound = bgSoundObj.addComponent(
  //     new Sound({ resource: "樱之声_1", loop: true, autoplay: true, volume: 0.5 })
  //   );

  //   bgSound.play();
  //   console.log("!!!");
}
