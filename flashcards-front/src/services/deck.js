import {IPADR} from "./ipname";

export const saveDeck = async (deck) => {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch(`http://${IPADR}/decks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(deck)
    });

    if (!response.ok) {
        throw new Error('Ошибка при сохранении набора');
    }

    return await response.json();
}

export const getUserDecks = async () => {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch(`http://${IPADR}/decks`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Ошибка при получении наборов');
    }

    return await response.json() || [];
};

export const deleteDeck = async (id) => {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch(`http://${IPADR}/decks/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Ошибка при удалении набора');
    }
};

export const getDeckById = async (id) => {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch(`http://${IPADR}/decks/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Ошибка при загрузке набора');
    }

    return await response.json();
};

export const updateDeck = async (id, deck) => {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch(`http://${IPADR}/decks/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deck)
    });

    if (!response.ok) {
        throw new Error('Ошибка при обновлении');
    }

    return await response.json();
};

export const rewordCards = async (token, cards) => {
    return fetch(`http://${IPADR}/ai/reword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(cards)
    });
};