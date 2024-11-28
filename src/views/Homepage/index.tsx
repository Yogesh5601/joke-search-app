"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Alert, Col } from "react-bootstrap";
import SearchForm from "@/components/SearchCard";
import LoadingSpinner from "@/components/Loder";
import JokeCard from "@/components/JokeCard";

const HomePage = () => {
  const [term, setTerm] = useState("");
  const [jokes, setJokes] = useState<any[]>([]); // Type jokes as an array of any
  const [loading, setLoading] = useState(false); // Loading state for joke fetch
  const [favoriteLoading, setFavoriteLoading] = useState<string | null>(null); // Loading state for favorite button
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch jokes when the component mounts or when the term changes
  useEffect(() => {
    const fetchJokes = async () => {
      setLoading(true); // Set loading to true when fetching jokes
      setError(null); // Reset error
      const searchTerm = term || "dad"; // Default to "dad" if no term is provided
      try {
        const response = await axios.post("/api/jokes", { term: searchTerm });
        setJokes(response.data.result);
      } catch (error) {
        setError("Error fetching jokes. Please try again."); // Set error if request fails
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

    fetchJokes();
  }, [term]); // Fetch jokes whenever `term` changes

  const handleSearch = async (e: any) => {
    e.preventDefault();
    const searchTerm = term || "dad"; // Default to "dad" if no term is provided
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post("/api/jokes", { term: searchTerm });
      setJokes(response.data.result);
    } catch (error) {
      setError("Error fetching jokes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (id: string, joke: string, image_url: string) => {
    setFavoriteLoading(id); // Start loading for the specific joke's favorite button
    try {
      const response = await axios.post("/api/favorites", {
        id,
        joke,
        image_url,
      });
      console.log("Favorite added:", response.data);
    } catch (error) {
      console.error("Error adding favorite:", error);
    } finally {
      setFavoriteLoading(null); // Reset loading state after request completes
    }
  };

  return (
    <Container>
      {/* Search Form */}
      <SearchForm
        term={term}
        setTerm={setTerm}
        handleSearch={handleSearch}
        loading={loading}
      />

      {/* Error Message */}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {/* Display Jokes in a Card Layout */}
      <Row className="mt-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          jokes.map((joke) => (
            <Col md={4} key={joke.id}>
              <JokeCard
                id={joke.id}
                joke={joke.joke}
                image_url={
                  joke.image_url ||
                  "https://via.placeholder.com/300x200.png?text=No+Image"
                }
                favoriteLoading={favoriteLoading}
                addFavorite={addFavorite}
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
