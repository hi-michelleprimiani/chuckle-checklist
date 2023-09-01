import { postNewJoke } from "../../services/jokeService";
import { useState } from "react";

export const AddJokesList = ({ setAllJokes }) => {
  //This state variable holds the user's input in the joke input field. 1.1
  const [inputValue, setInputValue] = useState([]);

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

  return (
    <>
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
    </>
  );
};
