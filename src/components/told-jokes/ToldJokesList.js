export const ToldJokesList = ({
  toldJokes,
  ListJokes,
  allJokes,
  setAllJokes,
}) => {
  return (
    <>
      <div className="joke-list-container told-count">
        <h2>
          Told <span className="told-count">{toldJokes.length}</span>
        </h2>
        <ul>
          {toldJokes.map((jokeObj) => (
            <ListJokes
              joke={jokeObj}
              key={jokeObj.id}
              allJokes={allJokes}
              setAllJokes={setAllJokes}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
