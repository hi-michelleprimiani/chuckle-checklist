// Using a fetch call to display allJokes in State
export const getJokes = () => {
  return fetch("http://localhost:8088/jokes").then((response) =>
    response.json()
  );
};

// Posting new jokes to local API
export const postNewJoke = async (jokeText) => {
  const response = await fetch("http://localhost:8088/jokes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: jokeText, told: false }),
  });

  const jokes = await response.json(jokeText);
  return jokes;
};

// Update an existing joke in the database
export const editJoke = async (editedJoke) => {
  const response = await fetch(`http://localhost:8088/jokes/${editedJoke.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedJoke),
  });

  const updatedJoke = await response.json();
  return updatedJoke;
};

// Fetch to delete data
export const deleteJoke = async (jokeToDelete) => {
  const response = await fetch(`http://localhost:8088/jokes/${jokeToDelete}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deletedJoke = await response.json();
  return deletedJoke;
};
