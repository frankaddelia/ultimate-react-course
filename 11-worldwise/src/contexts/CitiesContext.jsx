import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  error: '',
  isLoading: false,
};

const Actions = {
  CitiesLoaded: 'cities/loaded',
  CityCreated: 'city/created',
  CityDeleted: 'city/deleted',
  CityLoaded: 'city/loaded',
  Loading: 'loading',
  Rejected: 'rejected',
};

function reducer(state, action) {
  switch (action.type) {
    case Actions.Loading:
      return { ...state, isLoading: true };
    case Actions.CitiesLoaded:
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case Actions.CityLoaded:
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case Actions.CityCreated:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case Actions.CityDeleted:
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case Actions.Rejected:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: Actions.Loading });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: Actions.CitiesLoaded, payload: data });
      } catch (err) {
        dispatch({
          type: Actions.Rejected,
          payload: 'There was an error loading the cities...',
        });
      }
    };

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: Actions.Loading });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: Actions.CityLoaded, payload: data });
      } catch (err) {
        dispatch({
          type: Actions.Rejected,
          payload: 'There was an error loading city...',
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: Actions.Loading });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      dispatch({ type: Actions.CityCreated, payload: data });
    } catch (err) {
      dispatch({
        type: Actions.Rejected,
        payload: 'There was an error creating the city...',
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: Actions.Loading });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: Actions.CityDeleted, payload: id });
    } catch (err) {
      dispatch({
        type: Actions.Rejected,
        payload: 'There was an error deleting the city...',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error('CitiesContext was used outside of CitiesProvider');

  return context;
}

export { CitiesProvider, useCities };
