import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck, listDecks } from "../../utils/api";
import { LinkButtonSecondary, SubmitButton, HomeNav } from "../common/Common";

export const CreateDeck = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deckLength, setDeckLength] = useState(0);
  const history = useHistory();

  useEffect(async () => {
    const abortController = new AbortController();
    const decks = await listDecks(abortController.signal);
    setDeckLength(decks.length);
    return () => abortController.abort();
  }, []);

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!event.target.name.value || !event.target.description.value) {
      event.target.name.value ? window.alert("Please enter a description") : window.alert("Please enter a name");
    } else {
      const newDeck = {
        id: deckLength + 1,
        name: event.target.name.value,
        description: event.target.description.value,
      };
      await createDeck(newDeck);
      history.push("/");
    }
  }

  return (
    <>
      <HomeNav additionalText="New Card" />
      <div class="pt-2">
        <h2>Create Deck</h2>
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

export default CreateDeck;
