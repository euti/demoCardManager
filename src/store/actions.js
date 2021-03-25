export function addCard(card) {
    return {
        type: 'ADD_CARD',
        data: card,
    }
}

export function editCard(card) {
    return {
        type: 'EDIT_CARD',
        data: card,
    }
}

export function deleteCard(id) {
    return {
        type: 'DELETE_CARD',
        data: id,
    }
}

export function setSort(newState) {
    return {
        type: 'SET_SORT',
        data: newState,
    }
}

