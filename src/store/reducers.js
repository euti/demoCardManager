import defaultState from '../utils/mockData';

export default function reducer (state = defaultState(), action) {
    switch (action.type) {
        case 'ADD_CARD': {
            return {
                cards: [...state.cards, action.data],
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
            }
        }
        case 'DELETE_CARD': {
            return {
                cards: [...state.cards].filter(c=>c.id !== action.data),
            }
        }
        default:
            return state
    }
};