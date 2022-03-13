import { Consts, GameEvents } from "@/common/constants";
import event from "@/common/event";
import store from "@/common/store";
import { Game, GameObject } from "@eva/eva.js";
import { Sound } from "@eva/plugin-sound";
import { Easing, Tween } from "@tweenjs/tween.js";

const keyPressed = new Array(27);

export default function (game: Game) {
  /** 初始化键盘事件 */
  window.addEventListener("keydown", (evt) => {
    event.emit(GameEvents.PressNote, Consts.keyboard.indexOf(evt.key) + 1);
  });

  window.addEventListener("keyup", (evt) => {
    event.emit(GameEvents.ReleaseNote, Consts.keyboard.indexOf(evt.key) + 1);
  });

  event.on(GameEvents.PressNote, (k) => {
    if (keyPressed[k - 1] || k === 0) {
      return;
    }
    keyPressed[k - 1] = true;
    const sound = (store.get("noteObjects")[k - 1] as GameObject)?.getComponent(
      "Sound"
    ) as Sound;
    sound.volume = 1;

    sound?.play();
  });

  event.on(GameEvents.ReleaseNote, (k) => {
    if (k === 0) {
      return;
    }
    keyPressed[k - 1] = false;
    const sound = (store.get("noteObjects")[k - 1] as GameObject)?.getComponent(
      "Sound"
    ) as Sound;
    if (store.get("noteType").withDelay === true) {
      const tween = new Tween(sound)
        .to(
          {
            volume: 0,
          },
          1000
        )
        .easing(Easing.Cubic.In)
        .start();
      function updateTween() {
        if (!tween.update() || keyPressed[k - 1]) {
          game.ticker.remove(updateTween);
        }
      }
      game.ticker.add(updateTween);
    } else {
      sound?.stop();
    }
  });
}
