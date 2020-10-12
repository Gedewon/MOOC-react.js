import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from 'react-animation-components';

import { Loading } from "./LoadingComponent";
const RenderCard = (props) => {
  if (props.isLoading) {
    return <Loading />;
  } else if (props.errMessage) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMessage}</h4>
        </div>
      </div>
    );
    // console.log(errMessage);
    // return <h4>{errMessage}</h4>;
  } else
    return (
      <FadeTransform
      in
      transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
      }}>
      <Card>
        <CardImg src={baseUrl + props.item.image} alt={props.item.name} />
        <CardBody>
          <CardTitle>{props.item.name}</CardTitle>
          {props.item.designation ? (
            <CardSubtitle>{props.item.designation}</CardSubtitle>
          ) : null}
          <CardText>{props.item.description}</CardText>
        </CardBody>
      </Card>
      </FadeTransform>
    );
};
const Home = (props) => {
  // console.log(props);

  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errMess={props.dishesErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.promotion}
            isLoading={props.promosLoading}
            errMess={props.promosErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.leader}
                isLoading={props.leaderLoading}
                errMess={props.leaderErrMess} />
        </div>
       
      </div>
    </div>
  );
};

export default Home;
