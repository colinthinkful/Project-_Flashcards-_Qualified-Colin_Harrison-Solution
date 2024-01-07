import React, { useEffect, useState } from "react";
import { useRouteMatch, Switch, Route, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import NotFound from "../common/NotFound";
import CardList from "./CardList";
import { AddCardsButton, HomeNav, LinkButtonSecondary, StudyButton } from "../common/Common";

export const Deck = () => {
  const [deck, setDeck] = useState({ cards: [] });
  const [error, setError] = useState(undefined);
  const route = useRouteMatch();
  const deckId = route.params.deckId;

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);

    return () => abortController.abort();
  }, [deckId])

  if(error) {
    console.log(error);
    return <NotFound />;
  }

  return (
      <section className="container">
        {
        <>
          <HomeNav additionalText={`${deck.name}`} />
          <div class="pt-2">
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            <LinkButtonSecondary path={`/decks/${deck.id}/edit`} text="Edit" />
            <StudyButton path={`/decks/${deck.id}/study`} />
            <span class="ml-2">
              <AddCardsButton path={`/decks/${deck.id}/cards/new`} />
            </span>
          </div>
          <div class="pt-4">
            <h2>Cards</h2>
              {deck.id ? (
                <Switch>
                  <Route path={`${route.url}`}>
                    <CardList cards={deck.cards} />
                  </Route>
                </Switch>
                ) : (
                  <NotFound />
                )
              }
          </div>
        </>
        }
      </section>
  );
};

export default Deck;
