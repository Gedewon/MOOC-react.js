import React, { Component } from "react";
import Menu from "./MenuComponent";
import Header from "./HeaderComponet";
import Footer from "./FooterComponent";
import { DISHES } from "../shared/dishes";
import DISHDETAIL from "./DishdetailComponent";
import Home from "./HomeCompont";
import { Switch, Route, Redirect } from "react-router-dom";
class Main extends Component {
  state = {
    dishes: DISHES,
    selectedDish: null,
  };

  // onDishSelect(dishId) {
  //   this.setState({ selectedDish: dishId });
  // }
  render() {
    return (
      <div>
        <Header />
        {/* <Menu
          dishes={this.state.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
        />
        <DISHDETAIL
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === this.state.selectedDish
            )[0]
          }
        /> */}

        <Switch>
          <Route path="/home" component={() => <Home />} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.state.dishes} />}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
