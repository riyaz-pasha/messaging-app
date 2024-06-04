'use client'

import { Dispatch, useEffect, useState } from "react";

const PREFIX = "messaging-client-"

export default function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<T>] {
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (!jsonValue) return initialValue;
        return JSON.parse(jsonValue);
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value])

    return [value, setValue];
}
