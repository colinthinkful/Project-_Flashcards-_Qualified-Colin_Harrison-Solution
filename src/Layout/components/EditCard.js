import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { readCard, readDeck } from "../../utils/api";
import NotFound from "../common/NotFound";
import { HomeNav } from "../common/Common";
import { CardForm } from "./CardForm";

export const EditCard = () => {
  const [card, setCard] = useState(undefined);
  const [deck, setDeck] = useState("Loading...");
  const [error, setError] = useState(undefined);
  const route = useRouteMatch();
  const cardId = route.params.cardId;
  const deckId = route.params.deckId;

  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal)
      .then(setCard)
      .catch(setError);
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);
    return () => abortController.abort();
  }, []);

  if(error) {
    console.log(error);
    return <NotFound />;
  }

  return (
    <>
      <HomeNav additionalPath={`/decks/${deckId}`} additionalPathText={deck.name} additionalText={`Edit Card ${cardId}`} />
      <CardForm />
    </>
  );
};

export default EditCard;