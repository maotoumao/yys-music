import event from "@/common/event";
import { LOAD_EVENT, resource, ResourceBase, RESOURCE_TYPE } from "@eva/eva.js";
import { GameEvents } from "@/common/constants";
import config from "@/common/config";

/** 获取音符资源 */
async function getNoteResources(name: string): Promise<ResourceBase[]> {
  const urls = [];
  for (let i = 0; i < 21; ++i) {
    urls.push(`${name}_${i + 1}.mp3`);
  }

  return urls.map((url, index) => ({
    name: `${name}_${index + 1}`,
    type: RESOURCE_TYPE.AUDIO,
    src: {
      audio: {
        type: "audio",
        url,
      },
    },
    preload: true,
  }));
}

/** 加载资源 */
export default async function loadResources() {
  let noteResources: ResourceBase[] = [];

  for(let i = 0; i < config.length; ++i){
    noteResources = [...noteResources, ...(await getNoteResources(config[i].name))]
  }

  return new Promise((resolve) => {
    resource.addResource([
      {
        name: "bg",
        type: RESOURCE_TYPE.IMAGE,
        src: {
          image: {
            type: "gif",
            url: 'bg.gif',
          },
        },
        preload: true,
      },

      {
        name: "樱",
        type: RESOURCE_TYPE.IMAGE,
        src: {
          image: {
            type: "png",
            url: '樱.png',
          },
        },
        preload: true,
      },
      ...noteResources,
    ]);

    resource.preload();
    resource.on(LOAD_EVENT.START, () => {
      event.emit(GameEvents.UpdateLoadingProgress, 0);
    });
    resource.on(LOAD_EVENT.PROGRESS, (e) => {
      event.emit(GameEvents.UpdateLoadingProgress, e.progress);
    });
    resource.on(LOAD_EVENT.COMPLETE, () => {
      event.emit(GameEvents.UpdateLoadingProgress, 1);
      resolve(1);
    });
  });
}
