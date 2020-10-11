import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  state = {
    isModalOpen: false,
  };
  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  handleSubmit = (values) => {
    // console.log("Current State is: " + JSON.stringify(this.state));
    // alert("Current State is: " + JSON.stringify(this.state));
    // event.preventDefault();
    console.log(values);
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.name,
      values.comment
    );
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    // const errors = this.validate(this.state.name);
    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-comment fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <FormGroup>
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  model=".rating"
                  name="rating"
                  id="rating"
                  className="form-control"
                >
                  <option>1.00</option>
                  <option>2.00</option>
                  <option>3.00</option>
                  <option>4.00</option>
                  <option>5.00</option>
                </Control.select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Your Name</Label>

                <Control.text
                  model=".name"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                ></Control.text>

                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  rows="6"
                  className="form-control"
                />
              </FormGroup>

              <Button type="submit" value="submit" color="primary">
                submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const dishDetail = (props) => {
  const renderComments = (comments, postComment, dishId) => {
    let comment = null;
    if (comments) {
      comment = comments.map((comment) => {
        return (
          <Fade in>

          <div key={comment.id}>
            <li>{comment.comment}</li>
            <li>
              --{comment.author},{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
            </li>
          </div>
          </Fade>
          

        );
      });
      return (
        <React.Fragment>
          <h4>Comments</h4>
          <ul className="list-unstyled">
          <Stagger in>
            {comment}
            </Stagger>
            </ul>
          <CommentForm dishId={dishId} postComment={postComment} />
        </React.Fragment>
      );
    } else return <div></div>;
  };
  const renderDish = (dish) => {
    return (

      <FadeTransform
      in
      transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
      }}>
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
      </FadeTransform>
    );
  };

  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row ">
          <div className="col-12 col-md-5 m-1">{renderDish(props.dish)}</div>

          <div className="col-12 col-md-5 m-1">
            {renderComments(props.comments, props.postComment, props.dish.id)}
            {/* <CommentForm /> */}
          </div>
        </div>
      </div>
    );
  else return <div></div>;
};

export default dishDetail;
