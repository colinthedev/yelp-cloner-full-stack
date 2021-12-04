import { useState, useEffect } from 'react';

function getStorageValue(key, defaultValue) {
    // getting stored value
    const saved = localStorage.getItem(key);
    // This fucker below was causing a very annoying bug 
    // const initial = JSON.parse(saved); // unexpected character @ line 1 column 1 
    return saved || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        // storing input name: key: "images/" value: url of img
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};