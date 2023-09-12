import { useState } from "react";
import SingleBook from "./SingleBook";
import { Container, Row, Col } from "react-bootstrap";

const BookList = (props) => {
  // state = {
  //   search: "",
  // };
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState();

  const changeBook = (asin) => {
    setSelected(asin);
  };

  const filtra = (query) => {
    setSearch(query);
  };

  return (
    <>
      <Container>
        <h4>cerca un libro</h4>
        <input type="text" onChange={(Event) => filtra(Event.target.value)} placeholder="cerca" />
      </Container>
      <Row className="lista">
        {props.lista
          .filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))
          .map((book, index) => (
            <Col
              xs={6}
              md={4}
              key={`book-${index}`}
              onClick={() => {
                props.checkAsinId(book.asin);
                changeBook(book.asin);
              }}
              className="gy-2"
            >
              <SingleBook title={book.title} image={book.img} idDelLibro={book.asin} attivo={selected} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default BookList;
