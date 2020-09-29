import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";

const Menu = (props) => {
  //   note that when ever rendering a unique id in react we should give the key parameter's
  const menu = props.dishes.map((dish) => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <Card key={dish.id} onClick={() => props.onClick(dish.id)}>
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
    </div>
  );
};

export default Menu;
