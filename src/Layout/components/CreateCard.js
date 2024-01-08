import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api";
import { HomeNav } from "../common/Common";
import NotFound from "../common/NotFound";
import { CardForm } from "./CardForm";

export const CreateCard = () => {
  const [deck, setDeck] = useState("Loading...");
  const [error, setError] = useState(undefined);
  const route = useRouteMatch(); // get deckId from this
  const deckId = route.params.deckId;

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);
    return () => abortController.abort();
  }, []);

  if(error) {
    console.log(error);
    <NotFound />
  }

  return (
    <>
      <HomeNav additionalPath={`/decks/${deckId}`} additionalPathText={deck.name} additionalText="New Card" />
      <div class="pt-2">
        <h3>React Router: Add Card</h3>
      </div>
      <CardForm />
    </>
  );
};

export default CreateCard;
