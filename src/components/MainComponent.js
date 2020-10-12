import React, { Component } from "react";
import Menu from "./MenuComponent";
import Header from "./HeaderComponet";
import Footer from "./FooterComponent";

import DISHDETAIL from "./DishdetailComponent";
import Home from "./HomeCompont";
import Contact from "./ContactComponent";
import AboutUs from "./AboutComponent";
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback
} from "../redux/ActionCreators";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchLeaders();
    this.props.fetchComments();
    this.props.fetchPromos();
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
        comments={this.props.comments.comments.filter(
          (comment) => comment.dishId === parseInt(match.params.dishId, 10)
        )}
        commentsErrMess={this.props.dishes.errMess}
        postComment={this.props.postComment}
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
 <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
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
                  this.props.promotions.promotions.filter(
                    (promo) => promo.featured
                  )[0]
                }
                promosLoading={this.props.promotions.isLoading}
                promosErrMess={this.props.promotions.errMess}

                leader={this.props.leaders.leaders.filter((lead) => lead.featured)[0]}
                leaderLoading={this.props.leaders.isLoading}
                leaderErrMess={this.props.leaders.errMess}

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
              <Contact resetFeedbackForm={this.props.resetFeedbackForm} 
              postFeedback={this.props.postFeedback} 
            />
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
        </CSSTransition>
        </TransitionGroup>
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
    leaders: state.leaders
    // feedback: state.feedback
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),

    postFeedback:(feedback)=>dispatch(postFeedback(feedback)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  fetchLeaders: ()=>{dispatch(fetchLeaders());},

  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },

  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),

  

});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
