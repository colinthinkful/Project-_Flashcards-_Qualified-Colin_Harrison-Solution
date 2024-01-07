import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";
import NotFound from "../common/NotFound";
import { HomeNav, LinkButtonSecondary, SubmitButton } from "../common/Common";

export const EditDeck = () => {
  const [deck, setDeck] = useState("Loading...");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const route = useRouteMatch();
  const deckId = route.params.deckId;

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    if(deck != "Loading...") {
      setName(deck.name);
      setDescription(deck.description);
    }
    return () => abortController.abort();
  }, [deck]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!event.target.name.value || !event.target.description.value) {
      event.target.name.value ? window.alert("Please enter a description") : window.alert("Please enter a name");
    } else {
      const newDeck = {
        id: deck.id,
        name: event.target.name.value,
        description: event.target.description.value,
      };
      await updateDeck(newDeck);
      history.go(-1);
    }
  }

  const handleCancel = (event) => {
    event.preventDefault();
    history.go(-1);
  }

  if(error) {
    console.log(error);
    return <NotFound />;
  }

  return (
    <>
      <HomeNav additionalPath={`/decks/${deckId}`} additionalPathText={`${deck.name}`} additionalText="Edit Deck" />
      <div class="pt-3">
        <h3>Edit Deck</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label htmlFor="name" class="form-label">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            onChange={handleNameChange} 
            value={name}
            class="form-control"
            placeholder="Deck Name"
          />
        </div>
        <div class="form-group">
          <label htmlFor="description" class="form-label">Description</label>
          <textarea 
            id="description" 
            name="description" 
            onChange={handleDescriptionChange} 
            value={description}
            class="form-control"
            rows="3"
            placeholder="Brief description of the deck"
          />
        </div>
        <div>
          <LinkButtonSecondary path="/" text="Cancel" />
          <SubmitButton />
        </div>
      </form>
    </>
  );
}

export default EditDeck;
