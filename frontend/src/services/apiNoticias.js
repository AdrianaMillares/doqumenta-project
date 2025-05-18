const API_URL = "/api/prensa/noticias";

export async function getNoticias() {
    const res = await fetch(API_URL);
    return await res.json();
}

export async function createNoticia(data) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await res.json();
}

export async function updateNoticia(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await res.json();
}

export async function deleteNoticia(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}
