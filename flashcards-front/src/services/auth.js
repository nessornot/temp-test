import {IPADR} from "./ipname";

export const registerUser = async (name, password) => {
    const response = await fetch(`${IPADR}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password })
    });

    console.log("(registerUser)", name, password)
    return response;
};

export const loginUser = async (name, password) => {
    return fetch(`${IPADR}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    });

    // const data = await response.json();
    // return data.token; // JWT-токен
};

export const logout = () => {
    localStorage.removeItem('jwtToken');
};

export const createAI = async (token, aiText) => {
    return fetch(`${IPADR}/ai/cards`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify({text: aiText})
    });
}