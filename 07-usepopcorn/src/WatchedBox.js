import { useState } from 'react';

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const WatchedBox = ({ watched }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
};

export const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(
    watched.map((movie) => (movie ? movie.imdbRating : ''))
  );
  const avgUserRating = average(
    watched.map((movie) => (movie ? movie.userRating : ''))
  );
  const avgRuntime = average(
    watched.map((movie) => (movie ? movie.runtime : ''))
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.round(avgRuntime)} min</span>
        </p>
      </div>
    </div>
  );
};

export default WatchedBox;

export const WatchedMoviesList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className="list">
      {watched.map(
        (movie) =>
          movie && (
            <WatchedMovie
              movie={movie}
              key={movie.imdbId}
              onDeleteWatched={onDeleteWatched}
            />
          )
      )}
    </ul>
  );
};

const WatchedMovie = ({ movie, onDeleteWatched }) => {
  return (
    <li>
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
        title={`${movie.title} poster`}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.round(movie.runtime)} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => {
            onDeleteWatched(movie.imdbId);
          }}
        >
          X
        </button>
      </div>
    </li>
  );
};
