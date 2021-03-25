import { loadState } from '../utils/localStorage';

export default function reducer (state = loadState(), action) {
    switch (action.type) {
        case 'ADD_CARD': {
            return {
                cards: [...state.cards, action.data],
                sort: state.sort,
            }
        }
        case 'EDIT_CARD': {
            const newCards = [...state.cards];
            const index = newCards.findIndex(c=>c.id===action.data.id);
            newCards[index].title = action.data.title;
            newCards[index].description = action.data.description;
            newCards[index].img = action.data.img;

            return {
                cards: newCards,
                sort: state.sort,
            }
        }
        case 'DELETE_CARD': {
            return {
                cards: [...state.cards].filter(c=>c.id !== action.data),
                sort: state.sort,
            }
        }
        case 'SET_SORT': {
            return {
                cards: state.cards,
                sort: action.data,
            }
        }
        default:
            return state
    }
};