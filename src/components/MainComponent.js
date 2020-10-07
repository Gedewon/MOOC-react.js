import React, { Component } from "react";
import Menu from "./MenuComponent";
import Header from "./HeaderComponet";
import Footer from "./FooterComponent";

import DISHDETAIL from "./DishdetailComponent";
import Home from "./HomeCompont";
import Contact from "./ContactComponent";
import AboutUs from "./AboutComponent";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment, fetchDishes } from "../redux/ActionCreators";
import { actions } from "react-redux-form";
class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
  }

  DishWithId = ({ match }) => {
    return (
      <DISHDETAIL
        dish={
          this.props.dishes.dishes.filter(
            (dish) => dish.id === parseInt(match.params.dishId, 10)
          )[0]
        }
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.filter(
          (comment) => comment.dishId === parseInt(match.params.dishId, 10)
        )}
        addComment={this.props.addComment}
      />
    );
  };
  render() {
    return (
      <div>
        <Header />
        {/* <Menu
          dishes={this.props.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
        />
        <DISHDETAIL
          dish={
            this.props.dishes.filter(
              (dish) => dish.id === this.props.selectedDish
            )[0]
          }
        /> */}

        <Switch>
          <Route
            path="/home"
            component={() => (
              <Home
                dish={
                  this.props.dishes.dishes.filter((dish) => dish.featured)[0]
                }
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={
                  this.props.promotions.filter((promo) => promo.featured)[0]
                }
                leader={this.props.leaders.filter((lead) => lead.featured)[0]}
              />
            )}
          />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={this.DishWithId} />
          <Route
            exact
            path="/contactus"
            component={() => (
              <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
            )}
          />

          {/* the new route l added for the aboutus component  */}
          <Route
            exact
            path="/aboutus"
            component={() => <AboutUs leaders={this.props.leaders} />}
          />

          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
