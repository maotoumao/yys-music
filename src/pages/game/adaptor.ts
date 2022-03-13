import { Game, GameObject } from "@eva/eva.js";
import { Img } from "@eva/plugin-renderer-img";

/** 适配 */
export default function adaptor(game: Game): GameObject {
  const { innerWidth, innerHeight } = window;
  const isLandscape = innerWidth < innerHeight;
  const scaleRate = Math.min(innerHeight, innerWidth) / 1080;

  const root = new GameObject("root", {
    size: {
      width: 1920,
      height: 1080,
    },
    rotation: isLandscape ? Math.PI / 2 : 0,
    position: {
      x: isLandscape ? innerWidth : (innerWidth - 1920 * scaleRate) / 2,
      y: isLandscape ? (innerHeight - 1920 * scaleRate) / 2 : 0,
    },
    scale: {
      x: scaleRate,
      y: scaleRate,
    },
  });

  // const img = new GameObject("img", {
  //   size: {
  //     width: 1920,
  //     height: 1080,
  //   },
  // });
  // img.addComponent(
  //   new Img({
  //     resource: "bg",
  //   })
  // );
  // root.addChild(img);
  game.scene.addChild(root);
  return root;
}
