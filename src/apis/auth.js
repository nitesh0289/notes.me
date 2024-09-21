import client from "./_client";

const endpoint = "/users";

export const login = (details) => client.post(endpoint + "/login", details);

export const register = (details) => client.post(endpoint + "/signup", details);
