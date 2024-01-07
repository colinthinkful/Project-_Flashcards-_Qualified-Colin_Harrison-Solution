import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { deleteDeck } from "../../utils/api";
import EditDeck from "./EditDeck";
import { AddCardsButton, DeleteButton, LinkButtonSecondary, ViewButton, StudyButton } from "../common/Common";

export const DeckItem = ({ deck = {} }) => {
  const history = useHistory();
  const route = useRouteMatch();

  const handleDelete = async () => {
    const abortController = new AbortController();
    const result = window.confirm(`Delete the '${deck.name}' deck?\n\nYou will not be able to recover it.`);
    
    if(result) {
      await deleteDeck(deck.id, abortController.signal);
      history.go(0);
    }

    return () => abortController.abort();
  };

  return (
    <article>
      <div>
        {
          route.url === `/decks/${deck.id}` ? (
            <>
              <div>
                <div className="row pb-3">
                  <div className="col-md"><h3>{deck.name}</h3></div>
                  <div className="col-md text-right"><p>{deck.cards.length} cards</p></div>
                </div>
                <p>{deck.description}</p>
              </div>
              <LinkButtonSecondary path={`${route.url}/edit`} text="Edit" />
              <StudyButton path={`${route.url}/study`} />
              <AddCardsButton path={`${route.url}/cards/new`} />
            </>
          ) : route.url === `${route.url}/edit` ? (
            <EditDeck deck={deck} />
          ) : (
            <>
              <div className="row pb-3">
                <div className="col-md"><h3>{deck.name}</h3></div>
                <div className="col-md text-right"><p>{deck.cards.length} cards</p></div>
              </div>
              <ViewButton path={`/decks/${deck.id}`} text="View" />
              <StudyButton path={`/decks/${deck.id}/study`} />
              <DeleteButton onClickHandler={handleDelete} />
            </>
          )
        }
      </div>
    </article>
  );
};

export default DeckItem;
