import { createStore } from 'redux';
import reducer from './reducers';
import { saveState } from "../utils/localStorage";

let store = createStore(reducer);

store.subscribe(() => {
    saveState({
        cards: store.getState().cards,
        sort: store.getState().sort,
    });
});

export default store;