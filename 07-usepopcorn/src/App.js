import { useState } from 'react';
import Main from './Main';
import NavBar from './NavBar';
import Logo from './Logo';
import Search from './Search';
import NumResults from './NumResults';
import { WatchedMoviesList, WatchedSummary } from './WatchedBox';
import MovieList from './MovieList';
import Box from './Box';
import MovieDetails from './MovieDetails';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

function getData(key) {
  return localStorage.getItem(key);
}

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState(
    getData('watched') ?? [],
    'watched'
  );

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) =>
      watched.filter((movie) => (movie ? movie.imdbId !== id : false))
    );
  };

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        {movies && <NumResults movies={movies} />}
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
