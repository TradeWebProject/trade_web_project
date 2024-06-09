import React from 'react';
import { useEffect } from "react";

const useClickOutside = (ref, callback) => {
    useEffect(() => {
        const handleClick = event => {
          if (ref.current && !ref.current.contains(event.target)) {
            callback?.();
          }
        };
    
        window.addEventListener("mousedown", handleClick);
         return () => window.removeEventListener("mousedown", handleClick);
    },[ref, callback]);
}

export default useClickOutside;