import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";
import NotFound from "../common/NotFound";
import { HomeNav, AddCardsButton, ButtonSecondary, ButtonPrimary } from "../common/Common";

export const Study = () => {
  const [deck, setDeck] = useState(undefined);
  const [isFront, setIsFront] = useState(true);
  const [cardPosition, setCardPosition] = useState(0);
  const [error, setError] = useState(undefined);
  const params = useParams();
  const history = useHistory();
  const deckId = params.deckId;

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);
    return () => abortController.abort();
  }, [deckId]);

  const handleFlip = () => setIsFront(!isFront);

  const handleNext = () => {
    if(cardPosition + 1 === deck.cards.length) {
      const result = window.confirm("Would you like to reset the deck?\n\nClick 'cancel' to return to the home page.");
      if(result) {
        history.go(0);
      } else {
        history.push("/");
      }
    } else {
      setCardPosition(cardPosition + 1);
      setIsFront(!isFront);
    }
  };

  if(error) {
    console.log(error);
    return <NotFound />;
  }

  if(deck) {
    if(deck.cards.length > 2) {
      return (
        <section>
          <HomeNav additionalPath={`/decks/${deck.id}`} additionalPathText={deck.name} additionalText="Study" />
          <h2 class="pt-3">{deck.name}</h2>
          {
            isFront ? (
              <div class="container border rounded p-3">
                <h4>Card {cardPosition + 1} of {deck.cards.length}</h4>
                <p>{deck.cards[cardPosition].front}</p>
                <ButtonSecondary onClickHandler={handleFlip} text="Flip" />
              </div>
            ) : (
              <div class="container border rounded p-3">
                <h4>Card {cardPosition + 1} of {deck.cards.length}</h4>
                <p>{deck.cards[cardPosition].back}</p>
                <ButtonSecondary onClickHandler={handleFlip} text="Flip" />
                <span class="pl-2">
                  <ButtonPrimary onClickHandler={handleNext} text="Next" />
                </span>
              </div>
            )

          }
        </section>
      );
    } else {
      return (
        <>
          <HomeNav additionalPath={`/decks/${deck.id}`} additionalPathText={deck.name} additionalText="Study" />
          <h2 class="pt-3">{deck.name}</h2>
          <h3>Not enough cards.</h3>
          <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
          <AddCardsButton path={`/decks/${deck.id}/cards/new`} />
        </>
      )
    }
  }
  return <p>LOADING...</p>
};

export default Study;