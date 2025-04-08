
export const saveDeck = async (deck) => {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch('http://localhost:8080/decks', {
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

    const response = await fetch('http://localhost:8080/decks', {
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

    const response = await fetch(`http://localhost:8080/decks/${id}`, {
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

    const response = await fetch(`http://localhost:8080/decks/${id}`, {
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

    const response = await fetch(`http://localhost:8080/decks/${id}`, {
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
    return fetch("http://localhost:8080/ai/reword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(cards)
    });
};