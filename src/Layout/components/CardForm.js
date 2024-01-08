import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { createCard, readCard, updateCard } from "../../utils/api";
import { LinkButtonSecondary, SubmitButton } from "../common/Common";

export const CardForm = () => {
  const [card, setCard] = useState(undefined);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const history = useHistory();
  const route = useRouteMatch(); // get deckId from this
  const deckId = route.params.deckId;
  const cardId = route.params.cardId;

  useEffect(() => {
    const abortController = new AbortController();
    if(cardId) {
      readCard(cardId, abortController.signal)
        .then(setCard);
    }
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


  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!event.target.front.value || !event.target.back.value) {
      event.target.value.value ? window.alert("Please enter the Back text") : window.alert("Please enter the Front text");
    } else  {
      const card = {
        id: Number(cardId) ?? undefined,
        front: event.target.front.value,
        back: event.target.back.value,
        deckId: Number(deckId),
      };
      if(cardId) {
        console.log(card);
        const res = await updateCard(card);
        console.log("updated card:", res);
      } else {
        console.log(card);
        const res = await createCard(deckId, card);
        console.log("added card:", res);
      }
      history.go(-1);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="form-group">
        <label htmlFor="front">Front</label>
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
        <label htmlFor="back">Back</label>
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
  )  
};