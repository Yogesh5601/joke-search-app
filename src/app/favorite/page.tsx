"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap"; // Importing necessary components

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get("/api/favorites");
        if (response.data.success) {
          setFavorites(response.data.result); // Set the favorite jokes
        } else {
          setError("Error fetching favorite jokes");
        }
      } catch (err) {
        setError("Error fetching favorite jokes");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Container>
      <h1 className="my-4">Favorite Jokes</h1>

      {/* Display loading spinner if fetching */}
      {loading && <Spinner animation="border" variant="primary" />}

      {/* Display error message if any */}
      {error && <p className="text-danger">{error}</p>}

      {/* Display the favorite jokes */}
      <Row className="mt-4">
        {favorites.map((joke: any) => (
          <Col md={4} key={joke.id}>
            <Card className="mb-3">
              <Card.Img
                variant="top"
                src={
                  joke.image_url ||
                  "https://via.placeholder.com/300x200.png?text=No+Image"
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavoritesPage;
