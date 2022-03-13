import { useEffect, useState } from "react";

const store: Record<string, any> = {};
const cbs: Record<string, (value: any) => void> = {}

const get = (key: string) => {
    return store[key];
}

const set = (key: string, value: any) => {
    store[key] = value;
    cbs[key] && cbs[key](value);
}

const init = <T>(key: string, value?: T, onChange?: (value: T) => void) => {
    if(onChange) {
        cbs[key] = onChange;
    }
    set(key, value);
}


export default {
    init,
    get,
    set
}