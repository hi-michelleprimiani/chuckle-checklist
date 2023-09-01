import { getJokes, editJoke, deleteJoke } from "../../services/jokeService";

export const ListJokes = ({ allJokes, setAllJokes, joke }) => {
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

  return (
    <>
      <li className="joke-list-item">
        <p className="joke-list-item-text">{joke.text}</p>
        <button onClick={() => handleToggleJoke(joke)}>
          <i
            className={
              joke.told ? "fa-regular fa-face-meh" : "fa-regular fa-face-smile"
            }
          ></i>
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
    </>
  );
};
