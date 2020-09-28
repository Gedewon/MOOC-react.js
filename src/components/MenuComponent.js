import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import DISHDETAIL from "./DishdetailComponent";

class Menu extends Component {
  state = {
    selectedDish: null,
  };

  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }

  render() {
    //   note that when ever rendering a unique id in react we should give the key parameter's
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row">
          <div className="col-12 ">
            <DISHDETAIL dish={this.state.selectedDish} />
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
