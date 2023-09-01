import { useState, useEffect } from "react";
import {
  postNewJoke,
  getJokes,
  editJoke,
  deleteJoke,
} from "./services/jokeService";
import "./App.css";
import stevePic from "./assets/steve.png";

export const App = () => {
  //This state variable holds the user's input in the joke input field. 1.1
  const [inputValue, setInputValue] = useState([]);
  //This state variable holds an array of all jokes retrieved from the API. 2.1
  const [allJokes, setAllJokes] = useState([]);
  //This state variable is to hold an array of jokes that have been "told" 2.1
  const [toldJokes, setToldJokes] = useState([]);
  //This state variable is to hold an array of jokes that have been "untold" 2.1
  const [untoldJokes, setUntoldJokes] = useState([]);

  // 1.4
  // function that happens when user clicks button to add joke. Posts to API
  // inside the function, postNewJoke is called. This is the function that adds a new joke
  // the (inputValue) is the text of the joke typed in
  // the .then is like saying "After you're finished add the joke, do this.."
  // newJoke is the result or response that comes back from postNewJoke, it is the outcome of the process
  // if newJoke has a value, setInputValue is called. This clears the input field.
  //It's saying "Since the joke was added successfully, let's clear the box for the next one"

  // newJoke is a variable that holds the result of a promise returned by postNewJoke

  const handleAddJoke = () => {
    postNewJoke(inputValue).then((newJoke) => {
      if (newJoke) {
        setInputValue("");
        setAllJokes((prevAllJokes) => [...prevAllJokes, newJoke]);
      } else {
        console.error("Error adding joke");
      }
    });
  };

  const handleDeleteJoke = (jokeToDelete) => {
    deleteJoke(jokeToDelete.id).then(() => {
      // Remove the deleted joke from state
      const updatedAllJokes = allJokes.filter(
        (joke) => joke.id !== jokeToDelete.id
      );
      setAllJokes(updatedAllJokes);

      // Refresh the jokes from the database
      getJokes().then((jokesData) => setAllJokes(jokesData));
    });
  };

  // 2.2 Getting jokes from the db and storing them in state
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

  /* 5. Toggle Buttons 
  1. Create a function that you'll pass to the onClick. This function should 
  accept a single parameter, which is the joke that needs it's told property toggled.
  2. Determine new value. Create an object that will be used for updating the joke. 
  3. Use the editJoke function to tell the serve to update the joke with the new told joke value 
  4. Pass the 'editedJoke' object as an argument to the editJoke function, this will
  tell the server to update the joke with the new 'told' value
  */

  //5.1
  // Responsible for toggling the 'told' property of a joke when called
  const handleToggleJoke = (jokeToToggle) => {
    const editedJoke = {
      ...jokeToToggle,
      told: jokeToToggle.told ? false : true,
    };

    // Update state to reflect the changes
    const updatedJokes = allJokes.map((joke) =>
      joke.id === jokeToToggle.id ? editedJoke : joke
    );
    setAllJokes(updatedJokes);

    // Update the joke in the database
    editJoke(editedJoke).catch((error) => {
      console.error("Error toggling joke:", error);
    });
  };

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

        <div className="joke-add-form">
          <input
            className="joke-input"
            type="text"
            value={inputValue}
            placeholder="New One Liner"
            // 1.2 Add 'onChange'
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button className="joke-input-submit" onClick={handleAddJoke}>
            Add
          </button>
        </div>

        <div className="joke-lists-container">
          <div className="joke-list-container untold-count">
            <h2>
              Untold <span className="untold-count">{untoldJokes.length}</span>
            </h2>
            <ul>
              {untoldJokes.map(
                // 3.1 displaying the jokes
                (joke) => (
                  <li key={joke.id} className="joke-list-item">
                    <p className="joke-list-item-text">{joke.text}</p>
                    <button onClick={() => handleToggleJoke(joke)}>
                      <i className="fa-regular fa-face-meh"></i>
                    </button>
                    <div
                      className="joke-list-action-delete"
                      onClick={() => handleDeleteJoke(joke)}
                    >
                      <button>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="joke-list-container told-count">
            <h2>
              Told <span className="told-count">{toldJokes.length}</span>
            </h2>
            <ul>
              {toldJokes.map(
                //3.1 displaying the jokes
                (joke) => (
                  <li key={joke.id} className="joke-list-item">
                    <p className="joke-list-item-text">{joke.text}</p>
                    <button
                      className="button"
                      onClick={() => handleToggleJoke(joke)}
                    >
                      <i className="fa-regular fa-face-smile"></i>
                    </button>
                    <div
                      className="joke-list-action-delete"
                      onClick={() => handleDeleteJoke(joke)}
                    >
                      <button>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
