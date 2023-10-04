const KEYS: { [key: string]: boolean } = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    " ": false
}

export const handleCrossKeyboard = () => {
    const handleKeyDown = (event: KeyboardEvent) => {
        KEYS[event.key] = true;
    }

    const handleKeyUp = (event: KeyboardEvent) => {
        KEYS[event.key] = false;
    }

    window.addEventListener('keydown', (event) => handleKeyDown(event as KeyboardEvent));
    window.addEventListener('keyup', (event) => handleKeyUp(event as KeyboardEvent));
    return KEYS
}
