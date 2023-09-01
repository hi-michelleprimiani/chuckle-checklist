import { useState, useEffect } from "react";
import { getJokes } from "./services/jokeService";
import "./App.css";
import stevePic from "./assets/steve.png";
import { AddJokesList } from "./components/Add-Jokes/AddJokesList";
import { ListJokes } from "./components/List-Jokes/ListJokes";
import { ToldJokesList } from "./components/told-jokes/ToldJokesList";
import { UntoldJokeList } from "./components/untold-jokes/UntoldJokesList";

export const App = () => {
  //This state variable holds an array of all jokes retrieved from the API. 2.1
  const [allJokes, setAllJokes] = useState([]);
  //This state variable is to hold an array of jokes that have been "told" 2.1
  const [toldJokes, setToldJokes] = useState([]);
  //This state variable is to hold an array of jokes that have been "untold" 2.1
  const [untoldJokes, setUntoldJokes] = useState([]);

  // getJokes fetches the data and stores it in setAllJokes
  useEffect(() => {
    getJokes().then((jokeArr) => {
      setAllJokes(jokeArr);
    });
  }, []);

  // Responsible for running the provided function when certain dependencies change
  useEffect(() => {
    if (allJokes) {
      const toldJokes = allJokes.filter((joke) => joke.told === true);
      const untoldJokes = allJokes.filter((joke) => joke.told !== true);

      // 2.4
      setToldJokes(toldJokes);
      setUntoldJokes(untoldJokes);
    }
  }, [allJokes]);

  return (
    <>
      <div className="app-container">
        <div className="app-heading">
          <div className="app-heading-circle">
            <img className="app-logo" src={stevePic} alt="Good job Steve" />
          </div>
          <div className="app-heading-text">
            <h1>Chuckle Checklist</h1>
          </div>
          <h2>Add Joke</h2>
        </div>
        <AddJokesList setAllJokes={setAllJokes} />
        <div className="joke-lists-container">
          <UntoldJokeList
            untoldJokes={untoldJokes}
            ListJokes={ListJokes}
            allJokes={allJokes}
            setAllJokes={setAllJokes}
          />
          <ToldJokesList
            toldJokes={toldJokes}
            ListJokes={ListJokes}
            allJokes={allJokes}
            setAllJokes={setAllJokes}
          />
        </div>
      </div>
    </>
  );
};
