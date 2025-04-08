export const registerUser = async (name, password) => {
    const response = await fetch('http://localhost:8080/register', {
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
    return fetch('http://localhost:8080/login', {
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
    return fetch("http://localhost:8080/ai/cards", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify({text: aiText})
    });
}