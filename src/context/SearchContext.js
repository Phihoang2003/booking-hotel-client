import { createContext, useReducer } from "react";

const INIT_STATE = {
  city: undefined,
  dates: [],
  options: {
    children: undefined,
    adult: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INIT_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INIT_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INIT_STATE);
  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
