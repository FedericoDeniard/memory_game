export type Score = {
    username: string;
    time: number;
    date: number;
}

export const save_score = (url: string, data: Score) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .catch(error => {
          const typedError = error as Error; 
  console.log(`${typedError.name}: ${typedError.message}`);
    });
}

export const get_scores = async (url: string): Promise<Score[]> => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export const BASE_URL = window.location.hostname === "localhost" ? "http://localhost:3000" : "https://api-memory-game-2.onrender.com";