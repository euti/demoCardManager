const emtpyState = {
    cards: [],
}

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return emtpyState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return emtpyState;
    }
};

export const saveState = state => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
};