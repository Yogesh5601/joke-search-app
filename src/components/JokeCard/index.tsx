import { Card, Button, Spinner } from "react-bootstrap";

interface JokeCardProps {
  id: string;
  joke: string;
  image_url: string;
  favoriteLoading: string | null;
  addFavorite: (id: string, joke: string, image_url: string) => void;
}

const JokeCard = ({
  id,
  joke,
  image_url,
  favoriteLoading,
  addFavorite,
}: JokeCardProps) => {
  return (
    <Card className="mb-3">
      <Card.Img
        variant="top"
        src={
          image_url || "https://via.placeholder.com/300x200.png?text=No+Image"
        }
        alt={joke}
      />
      <Card.Body>
        <Card.Text>{joke}</Card.Text>
        <Button
          variant="success"
          onClick={() => addFavorite(id, joke, image_url)}
          disabled={favoriteLoading === id} // Disable button while loading
        >
          {favoriteLoading === id ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Favorite"
          )}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default JokeCard;
