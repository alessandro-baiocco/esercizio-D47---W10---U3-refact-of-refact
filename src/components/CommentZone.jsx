import { useEffect, useState } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import FormComment from "./FormComment";

const CommentZone = (props) => {
  // state = { comment: "", loading: true, error: false, alert: true };
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(true);
  const [status, setStatus] = useState("");

  const elimina = async (id) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
        headers: {
          method: "DELETE",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGZhMDFiOWU4NDIyNzAwMTRjMzI2NzgiLCJpYXQiOjE2OTQxMDYwNDEsImV4cCI6MTY5NTMxNTY0MX0._hgr0vEr6UjtJtfjfmSqCU3Cl0ZLLLXpFwWscccB2NI",
        },
      });
      if (response.ok) {
        alert("eliminato correttamente");
      } else {
        alert("nope");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchatutto = async () => {
    setLoading(true);

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/books/${props.asinId}/comments`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGZhMDFiOWU4NDIyNzAwMTRjMzI2NzgiLCJpYXQiOjE2OTQxMDYwNDEsImV4cCI6MTY5NTMxNTY0MX0._hgr0vEr6UjtJtfjfmSqCU3Cl0ZLLLXpFwWscccB2NI",
        },
      });
      if (response.ok) {
        const Data = await response.json();
        setComment(Data);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
        setStatus(response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.asinId !== prevProps.asinId) {
  //     this.fetchatutto();
  //     console.log(this.props.asinId, prevProps.asinId);
  //   }}
  useEffect(() => {
    if (props.asinId !== "") {
      fetchatutto();
    }
  }, [props.asinId]);

  return (
    <span>
      {props.asinId && loading && (
        <div className="text-center my-3">
          <Spinner variant="info" />
        </div>
      )}
      {error && alert && props.asinId && (
        <Alert variant="danger" onClose={() => setAlert(false)} className="mt-4" dismissible>
          <Alert.Heading>something wrong</Alert.Heading>
          <p>you got error: {status}</p>
        </Alert>
      )}

      {comment && (
        <>
          <h1> commenti </h1>
          {comment &&
            props.asinId &&
            comment
              .filter((comm) => comm.elementId === props.asinId)
              .map((comm, index) => (
                <p style={{ border: "solid black 1px" }} key={`comm-${index}`}>
                  {comm.comment} | {comm.rate} stelle / 5
                  <Button onClick={() => elimina(comm._id)} variant="danger" className="ms-2">
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </p>
              ))}
          {comment.filter((comm) => comm.elementId === props.asinId) === 0 && props.asinId && (
            <p>non sono stati trovati commenti</p>
          )}
          <FormComment id={props.asinId} />
        </>
      )}
    </span>
  );
};

export default CommentZone;
