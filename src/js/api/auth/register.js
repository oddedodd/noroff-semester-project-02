import { API_AUTH_REGISTER } from '../../api/constants.js';

export async function register(name, email, password) {
    const response = await fetch(API_AUTH_REGISTER, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json(); // Get the response data

    if (!response.ok) {
        throw new Error(json.errors?.[0]?.message || 'Error registering user');
    } else {
        console.log("User registered successfully!");
    }
    alert("User registered successfully!");
    window.location.href = "/auth/login/";
}