import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import { LinkButtonSecondary, SubmitButton, HomeNav } from "../common/Common";
import NotFound from "../common/NotFound";

export const CreateCard = () => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState("Loading...");
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const route = useRouteMatch(); // get deckId from this
  const deckId = route.params.deckId;

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
      event.target.value.value ? window.alert("Please enter the Back text") : window.alert("Please enter the Front text");
    } else  {
      const card = {
        front: event.target.front.value,
        back: event.target.back.value,
        deckId: deckId,
      };
      await createCard(route.params.deckId, card);
      history.go(-1);
    }
  };

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
    </>
  );
};

export default CreateCard;
