import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import NotFound from "../common/NotFound";
import { Card } from "./Card";

export const CardList = ({ cards }) => {
  const route = useRouteMatch();

  const cardList = cards.map((card) => (
    <Card key={card.id} deckId={card.deckId} card={card} />
  ));

  return (
    <>
      <div>
        <ul className="list-group">{cardList}</ul>
      </div>
      <div>
        {
          cards ? (
            <Switch>
              <Route exact path={`${route.url}/:cardId`}>
                <Card cards={cards} />
              </Route>
            </Switch>
          ) : (
            <NotFound />
          )
        }
      </div>
    </>
  );
};

export default CardList;
