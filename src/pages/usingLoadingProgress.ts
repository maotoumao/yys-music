import { GameEvents } from "@/common/constants";
import event from "@/common/event";
import { useEffect, useState } from "react";

export default function useLoadingProgress() {
    const [loadingProgress, setLoadingProgress] = useState<number>(0);

    useEffect(() => {
        event.on(GameEvents.UpdateLoadingProgress, (progress) => {
            setLoadingProgress(progress);
        });
        return () => {
            event.off(GameEvents.UpdateLoadingProgress);
        }
    }, [])

    return loadingProgress;
}