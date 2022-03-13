import config from "@/common/config";
import { GameEvents } from "@/common/constants";
import event from "@/common/event";
import store from "@/common/store";
import { GameObject, resource } from "@eva/eva.js";
import { Event, HIT_AREA_TYPE } from "@eva/plugin-renderer-event";
import { Img } from "@eva/plugin-renderer-img";
import { Sound } from "@eva/plugin-sound";

function initNotes(root: GameObject) {
    const noteObjects: GameObject[] = [];
    for(let i = 0; i < 21; ++i) {
        const go = new GameObject(`note_${i + 1}`, {
            size: {
                width: 110,
                height: 110
            },
            position: {
                x: 428 + 201 * (i % 7),
                y: 375.5 + 204.5 * Math.floor(i / 7)
            },
            origin: {
                x: 0.5,
                y: 0.5
            }
        });
        
        // 局部响应事件
        const evt = go.addComponent(new Event({
            hitArea: {
                type: HIT_AREA_TYPE.Circle,
                style: {
                    x: 55,
                    y: 55,
                    radius: 55
                }
            }
        }));
        evt.on('touchstart', () => {
            event.emit(GameEvents.PressNote, i + 1);
        })

        evt.on('touchend', () => {
            event.emit(GameEvents.ReleaseNote, i + 1);
        })

        noteObjects.push(go);
        root.addChild(go);
    }

    return noteObjects;
}

// function update

export default function initLogic(root: GameObject) {
    // 标牌
    const noteTypeImg = new GameObject('noteTypeImg', {
        position: {
            x: 176,
            y: 962
        },
        size: {
            width: 219,
            height: 83
        }
    });
    noteTypeImg.addComponent(new Img({
        resource: '樱'
    }));
    root.addChild(noteTypeImg);



    // 初始化音符
    const noteObjects = initNotes(root);
    // 初始时刻，记录状态
    store.init('noteType', config[0], (newValue) => {
        // 每当这个值变化的时候，执行回调；更新声音
        noteObjects.forEach((noteObject, index) => {
            noteObject.removeComponent('Sound');
            noteObject.addComponent(new Sound({
                resource: `${newValue.name}_${index + 1}`,
                loop: false,
                autoplay: false
            }));
        })

    })
    store.set('noteObjects', noteObjects);

    
}