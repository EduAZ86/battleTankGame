import {useState, useEffect } from 'react'
interface stateKeysProperties {
    ArrowLeft:boolean;
    ArrowRight:boolean;
    ArrowUp:boolean;
    ArrowDown:boolean;
}


const initialState = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
  };
  

export const useKeyboard = () => {
    const [stateKeys, setStateKeys] = useState<stateKeysProperties>(initialState)

    const handleKeyDown = (event:any) => {
        setStateKeys({...stateKeys, [event.key] : true })
      };
      const handleKeyUp = (event:any) => {
        setStateKeys({...stateKeys, [event.key] : false})
        };
      
      useEffect(() => {
        window.addEventListener('keydown', (event) => handleKeyDown(event));
        window.addEventListener('keyup', (event) => handleKeyUp(event));
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('keyup', handleKeyUp);
        };
      }, []);
    
      return stateKeys;

}