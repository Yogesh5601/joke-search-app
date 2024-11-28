import axios from "axios";

// Function to fetch jokes based on search term
export async function fetchJokes(term: string) {
  const url = `https://icanhazdadjoke.com/search?term=${term}`;

  try {
    const response = await axios.get(url, {
      headers: { Accept: "application/json" },
    });

    // Include image_url for each joke
    return response.data.results.map((joke: any) => ({
      id: joke.id,
      joke: joke.joke,
      image_url: `https://icanhazdadjoke.com/j/${joke.id}.png`, // Image URL
    }));
  } catch (error) {
    console.error("Error fetching jokes:", error);
    throw error;
  }
}
