import { Component, useState } from "react";
import { Card } from "react-bootstrap";

const SingleBook = (props) => {
  // state = { selected: false, commenti: [], asin: "" };
  const [selected, setSelected] = useState(false);
  const [commenti, setCommenti] = useState([]);
  const [asinId, setAsinId] = useState("");

  return (
    <Card style={{ border: props.idDelLibro === props.attivo ? "2px solid blue" : "2px solid red" }} height={"100%"}>
      <img src={props.image} className="card-img-top" alt={props.title} />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
      </div>
      <span>
        <p>{props.idDelLibro}</p>
        {commenti.map((com, index) => (
          <span key={`comment-${index}`}>
            <p style={{ border: "solid black 1px" }}>
              {com.comment} | {com.rate} stelle / 5
            </p>
          </span>
        ))}
      </span>
    </Card>
  );
};

export default SingleBook;
