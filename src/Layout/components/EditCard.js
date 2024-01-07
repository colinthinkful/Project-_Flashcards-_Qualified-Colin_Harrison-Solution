import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../../utils/api";
import NotFound from "../common/NotFound";
import { LinkButtonSecondary, SubmitButton, HomeNav } from "../common/Common";

export const EditCard = () => {
  const [card, setCard] = useState(undefined);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState("Loading...");
  const [error, setError] = useState(undefined);
  const history = useHistory();
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
    if(card) {
      setFront(card.front);
      setBack(card.back);
    }
    return () => abortController.abort();
  }, [card]);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);
    return () => abortController.abort();
  }, []);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!event.target.front.value || !event.target.back.value) {
      event.target.front.value ? window.alert("Please enter Back text") : window.alert("Please enter Front text");
    } else {
      const newCard = {
        id: card.id,
        front: event.target.front.value,
        back: event.target.back.value,
        deckId: card.deckId,
      };
      await updateCard(newCard);
      history.go(-1);
    }
  }

  if(error) {
    console.log(error);
    return <NotFound />;
  }

  return (
    <>
      <HomeNav additionalPath={`/decks/${deckId}`} additionalPathText={deck.name} additionalText={`Edit Card ${cardId}`} />
      <form onSubmit={handleSubmit} class="pt-2">
        <div class="form-group">
          <label htmlFor="front" class="form-label">Front</label>
          <textarea 
            id="front" 
            name="front" 
            onChange={handleFrontChange} 
            value={front}
            class="form-control"
            rows="3"
            placeholder="Front side of card"
          />
        </div>
        <div class="form-group">
          <label htmlFor="back" class="form-label">Back</label>
          <textarea 
            id="back" 
            name="back" 
            onChange={handleBackChange} 
            value={back}
            class="form-control"
            rows="3"
            placeholder="Back side of card"
          />
        </div>
        <div>
          <LinkButtonSecondary path={`/decks/${deckId}`} text="Cancel" />
          <SubmitButton />
        </div>
      </form>
    </>
  );
};

export default EditCard;