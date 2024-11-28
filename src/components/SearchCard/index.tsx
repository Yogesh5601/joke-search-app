import { Form, Button, Spinner } from "react-bootstrap";

interface SearchFormProps {
  term: string;
  setTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  loading: boolean;
}

const SearchForm = ({
  term,
  setTerm,
  handleSearch,
  loading,
}: SearchFormProps) => {
  return (
    <Form onSubmit={handleSearch}>
      <Form.Group className="mb-3">
        <Form.Label>Search for Jokes</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a keyword"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : "Search"}
      </Button>
    </Form>
  );
};

export default SearchForm;
