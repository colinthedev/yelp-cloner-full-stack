import { useState, useEffect } from 'react';

function getStorageValue(key, defaultValue) {
    const saved = localStorage.getItem(key);
    // console.log(key, defaultValue, saved)
    const currentVal = JSON.parse(saved); 
    // console.log(currentVal)
    if (currentVal === null || currentVal === undefined) {
        return key
    } else {
        return currentVal
    }
}

export const useLocalStorage = (key, defaultValue) => {
    // console.log(key, defaultValue)
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

