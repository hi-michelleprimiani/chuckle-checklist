import { useState, useEffect } from "react";
import { postNewJoke, getJokes, editJoke } from "./services/jokeService";
import "./App.css";
import stevePic from "./assets/steve.png";

/* #1 Input Field
What needs to happen when a user wants to add a joke to db 
1. Input field - This element will allow users to type in their new one-liner
2. Event Handling- Attach an on-Change event handler to input field 
3. Create a Post Request
4. Add the button that user can click to submit joke
5. Button Event Handling, attach an onClick handler. Call the function handleAddJoke

ALSO, Clearing the input field 
- After the user clicks the 'Add Joke' Button, set the state variable to an empty string. 
- Since the input fields value is bound to this state variable, the input field will display empty value
*/

/* #2 Joke State. Three new state variable
1. Initial State - Created 3 state variables - allJokes, untoldJokes & toldJokes
2. Use a side effect hook, useEffect, to fetch the jokes from db, make sure you 
fetch the data once using an empty dependency array to prevent infinite fetching
3. Filtering Jokes - Loop thru allJokes array and categorize jokes into 'told'
and 'untold' jokes based on whether their told property is true or false
4. Set the untold jokes and told jokes state variables with appropriate arrays after filtering
5. useEffect hook with dependency arrays to control when side effects should run.

- Fetch the jokes using useEffect (2.2) with an empty dependency array, 
ensuring the fetch happens only once the component mounts 
- Then filter through the fetched jokes (2.3). You end up with two arrays
'told' jokes and 'untold' jokes. 
- These filtered arrays can be set to the respective state variables. (2.1)
*/

/* #3 Displaying the Jokes
1. I now have an array called 'untoldJokes' containing jokes that have not been told yet
2. use the 'map' function to iterate thru untold jokes array
3. Inside the 'map' function, create JSX element (HTML <div></div>) to represent
each untold joke. This could include joke text or any relevant info.
4. Render and style with css 
*/

/* WHATS AN INFINITE LOOP?!
An infinite loop occurs when you have a chain of actions that trigger each other
in a loop without any exit condition. In React, this often happens when you
update state within a component, which triggers a re-render, which
updates the state again, leading to another re-render and so on. 

PREVENTING INFINITE LOOPS...
Imagine if you placed the data fetching logic (getJokes) inside the component's 
render function. Every time the component renders, it fetches data, which causes 
a re-render, leading to another fetch, and so on. This would create an 
infinite loop of fetching and re-rendering.

Solution: Fetch the data in a controlled manner, such as in the useEffect
 hook with an empty dependency array ([]). This ensures that the data is 
 fetched only once, when the component mounts, and not every time it re-renders.
*/

export const App = () => {
  //This state variable holds the user's input in the joke input field. 1.1
  const [inputValue, setInputValue] = useState([]);
  //This state variable holds an array of all jokes retrieved from the API. 2.1
  const [allJokes, setAllJokes] = useState([]);
  //This state variable is to hold an array of jokes that have been "told" 2.1
  const [toldJokes, setToldJokes] = useState([]);
  //This state variable is to hold an array of jokes that have been "untold" 2.1
  const [untoldJokes, setUntoldJokes] = useState([]);

  // 2.2 Getting jokes from the db and storing them in state
  // getJokes fetches the data and stores it in setAllJokes
  useEffect(() => {
    getJokes().then((jokeArr) => {
      setAllJokes(jokeArr);
    });
  }, []);

  // Setting jokes to either Told or Untold 2.3
  useEffect(() => {
    if (allJokes) {
      const toldJokes = allJokes.filter((joke) => joke.told === true);
      const untoldJokes = allJokes.filter((joke) => joke.told !== true);

      // 2.4
      setToldJokes(toldJokes);
      setUntoldJokes(untoldJokes);
    }
  }, [allJokes]);

  // 1.4
  // function that happens when user clicks button to add joke. Posts to API
  // inside the function, postNewJoke is called. This is the function that adds a new joke
  // the (inputValue) is the text of the joke typed in
  // the .then is like saying "After you're finished add the joke, do this.."
  // newJoke is the result or response that comes back from postNewJoke, it is the outcome of the process
  // if newJoke has a value, setInputValue is called. This clears the input field. It's saying "Since the joke was added successfully, let's clear the box for the next one"
  const handleAddJoke = () => {
    postNewJoke(inputValue).then((newJoke) => {
      if (newJoke) {
        setInputValue("");
      } else {
        console.error("Error adding joke");
      }
    });
  };

  // the parameter joke is what I want to modify
  /* The told property of the new editedJoke object is set to the opposite
value of the original joke object's told property. The ! operator is used to flip
the boolean value. If joke.told is true, then !joke.told will be false, and vice versa.
*/
  const toggleToldProperty = (joke) => {
    const editedJoke = {
      ...joke,
      told: joke.told ? false : true,
    };

    return editedJoke;
  };

  // handleToggleTold is a function that gets triggered when changing the status of joke from told to untold
  // (jokeToToggle) is the joke to change the status of
  //
  const handleToggleTold = (jokeToToggle) => {
    const editedJoke = toggleToldProperty(jokeToToggle);

    // Update state to reflect the changes
    const updatedJokes = allJokes.map((joke) =>
      joke.id === jokeToToggle.id ? editedJoke : joke
    );
    setAllJokes(updatedJokes);

    // Update the joke in the database
    editJoke(editedJoke)
      .then(() => {
        // Refresh the jokes from the database
        getJokes().then((jokesData) => setAllJokes(jokesData));
      })
      .catch((error) => {
        console.error("Error toggling joke:", error);
      });
  };

  const handleToggleUntold = (jokeToToggle) => {
    const editedJoke = toggleToldProperty(jokeToToggle);

    // Update state to reflect the changes
    const updatedJokes = allJokes.map((joke) =>
      joke.id === jokeToToggle.id ? editedJoke : joke
    );
    setAllJokes(updatedJokes);

    // Update the joke in the database
    editJoke(editedJoke)
      .then(() => {
        // Refresh the jokes from the database
        getJokes().then((jokesData) => setAllJokes(jokesData));
      })
      .catch((error) => {
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
          <div className="joke-list-container told-count">
            <h2>
              Told <span className="told-count">{toldJokes.length}</span>
            </h2>

            <ul>
              {toldJokes.map(
                //3.1
                (joke) => (
                  <li key={joke.id} className="joke-list-item">
                    <p className="joke-list-item-text">{joke.text}</p>
                    <button
                      className="button"
                      onClick={() => handleToggleTold(joke)}
                    >
                      <i class="fa-regular fa-face-smile"></i>
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="joke-list-container untold-count">
            <h2>
              Untold <span className="untold-count">{untoldJokes.length}</span>
            </h2>
            <ul>
              {untoldJokes.map(
                // 3.1
                (joke) => (
                  <li key={joke.id} className="joke-list-item">
                    <p className="joke-list-item-text">{joke.text}</p>
                    <button onClick={() => handleToggleUntold(joke)}>
                      <i class="fa-regular fa-face-meh"></i>
                    </button>
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
