import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import MyWelcome from "./components/MyWelcome";
import BookList from "./components/BookList";
import libri from "./components/books/scifi.json";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import CommentZone from "./components/CommentZone";

const App = () => {
  // state = {
  //   asinId: null,
  // };
  const [asinId, setAsinId] = useState("");

  const checkAsinId = (Id) => {
    setAsinId(Id);
  };

  return (
    <>
      <MyNav />
      <MyWelcome title="BENVENUTO!!!" subTitle="ehi tu che stai leggendo questa frase , ciao" />
      <Row>
        <Col xs={6}>
          <BookList lista={libri} checkAsinId={checkAsinId} selected={asinId} />
        </Col>
        <Col xs={6}>
          <CommentZone asinId={asinId} />
        </Col>
      </Row>

      <MyFooter />
    </>
  );
};

export default App;
