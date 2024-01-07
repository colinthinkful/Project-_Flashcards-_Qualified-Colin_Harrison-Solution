import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./common/Header";
import NotFound from "./common/NotFound";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import CreateDeck from "./components/CreateDeck";
import CreateCard from "./components/CreateCard";
import EditDeck from "./components/EditDeck";
import EditCard from "./components/EditCard";
import Study from "./components/Study";
import { LinkButtonSecondary } from "./common/Common";

function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        {
          <Switch>
            <Route exact path="/">
              <LinkButtonSecondary path="/decks/new" text="+ Create Deck" />
              <DeckList />
            </Route>
            <Route exact path="/decks/new">
              <CreateDeck />
            </Route>
            <Route exact path="/decks/:deckId/edit">
              <EditDeck />
            </Route>
            <Route exact path="/decks/:deckId/cards/new">
              <CreateCard />
            </Route>
            <Route exact path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
            </Route>
            <Route exact path="/decks/:deckId/study">
              <Study />
            </Route>
            <Route path="/decks/:deckId">
              <Deck />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        }
      </div>
    </>
  );
}

export default Layout;
