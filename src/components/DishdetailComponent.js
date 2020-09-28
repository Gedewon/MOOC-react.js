import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
class dishDetail extends Component {
  state = {};

  renderComments(comments) {
    let comment = null;
    if (comments) {
      comment = comments.map((comment) => {
        return (
          <div key={comment.id}>
            <li>{comment.comment}</li>
            <li>
              --{comment.author}, {comment.date}`
            </li>
          </div>
        );
      });
      return (
        <React.Fragment>
          <h4>Comments</h4>
          <ul className="list-unstyled">{comment}</ul>
        </React.Fragment>
      );
    } else return <div></div>;
  }
  renderDish(dish) {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  render() {
    if (this.props.dish != null)
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.props.dish)}
          </div>

          <div className="col-12 col-md-5 m-1">
            {this.renderComments(this.props.dish.comments)}
          </div>
        </div>
      );
    else return <div></div>;
  }
}

export default dishDetail;
