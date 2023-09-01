export const UntoldJokeList = ({
  untoldJokes,
  ListJokes,
  allJokes,
  setAllJokes,
}) => {
  return (
    <>
      <div className="joke-list-container untold-count">
        <h2>
          Untold <span className="untold-count">{untoldJokes.length}</span>
        </h2>
        <ul>
          {untoldJokes.map((jokeObj) => {
            return (
              <ListJokes
                joke={jokeObj}
                key={jokeObj.id}
                allJokes={allJokes}
                setAllJokes={setAllJokes}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};
