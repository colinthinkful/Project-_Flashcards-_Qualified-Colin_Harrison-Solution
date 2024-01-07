import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { deleteCard } from "../../utils/api";
import NotFound from "../common/NotFound";
import { DeleteButton, EditCardButton } from "../common/Common";

export const Card = ({ card }) => {
  const route = useRouteMatch();
  const history = useHistory();

  const handleDelete = async () => {
    console.log(card.id);
    const result = window.confirm("Are you sure you want to delete this card?");
    if (result) {
      await deleteCard(card.id);
      history.go(0);
    } 
  };

  return (
    <li className="list-group-item">
      <div class="container">
        <div class="row">
          <div class="col-md text-secondary">{card.front}</div>
          <div class="col-md text-secondary">{card.back}</div>
        </div>
      </div>
      <div class="float-right pt-2">
        <span class="mr-2">
          <EditCardButton path={`${route.url}/cards/${card.id}/edit`} text="Edit" />
        </span>
        <DeleteButton onClickHandler={handleDelete} />
      </div>
    </li>
  );
}

export default Card;
