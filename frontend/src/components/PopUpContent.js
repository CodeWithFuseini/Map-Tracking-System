import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Button,
  CardText,
  CardTitle,
  Input,
  Form,
  FormGroup,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import { user } from "../slices/user";
import { useAddPinMutation } from "../api/pinEndpoints";
import { useNavigate } from "react-router-dom";
import Star from "./stars/Star";

const PopUpContent = ({ lat, lng, view, title, desc, userPin, rating }) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const ratingRef = useRef();

  const currentUser = useSelector((state) => user(state));

  const [addPin] = useAddPinMutation();

  const navigate = useNavigate();

  console.log(view);

  async function submitHandler(e) {
    e.preventDefault();

    const user = currentUser.id;

    const title = titleRef.current?.value;
    const desc = descriptionRef.current?.value;
    const rating = Number(ratingRef.current?.value);

    const res = await addPin({ user, title, desc, rating, lat, lng });

    if (res?.error?.originalStatus === 400) {
      alert("Added Already");
      return;
    }

    navigate("/");
    alert("added");
    return res;
  }

  return (
    <Card
      body
      className="my-2"
      style={{ backgroundColor: "#d0f8e8", width: "200px" }}
    >
      {view && (
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardText>{desc}</CardText>
          <CardText
            tag="h5"
            style={{
              backgroundColor: "rgb(3 108 121)",
              color: "white",
              padding: "5px 10px",
            }}
          >
            {userPin}
          </CardText>
          <ListGroup>
            <ListGroupItem className="d-flex ">
              <Star star={rating} />
            </ListGroupItem>
          </ListGroup>{" "}
          <Button block className="btn btn-danger my-1">remove</Button>
        </CardBody>
      )}

      {!view && (
        <form
          onSubmit={submitHandler}
          style={{ backgroundColor: "transparent" }}
        >
          <input
            className="form-control"
            ref={titleRef}
            placeholder="title"
            type="text"
            required
          />
          <br />
          <input
            className="form-control"
            ref={descriptionRef}
            type="text"
            placeholder="description"
            required
          />
          <br />
          <CardText
            tag="h5"
            style={{
              backgroundColor: "rgb(3 108 121)",
              color: "white",
              padding: "5px 10px",
            }}
          >
            {currentUser?.user}
          </CardText>
          <select ref={ratingRef} className="form-control">
            <option value={1}>Rating</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <br />
          <Button style={{ backgroundColor: "rgb(19 156 187)" }} block>
            Submit
          </Button>
        </form>
      )}
    </Card>
  );
};

export default PopUpContent;
