import React, { useEffect, useState } from "react";
import DeckItem from "./DeckItem";

import { listDecks } from "../../utils/api";
import NotFound from "../common/NotFound";

export const DeckList = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks).catch(setError);
    return () => abortController.abort();
  }, []);

  if (error) {
    console.log(error);
    return <NotFound />;
  }

  const deckList = decks.map((deck) => <li key={deck.id} class="list-group-item bg-light"><DeckItem key={deck.id} deck={deck} /></li>);

  return (
    <main>
      <ul class="list-group pt-2">{deckList}</ul>
    </main>
  );
};

export default DeckList;
