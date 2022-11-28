import { restoTypes } from "../types/userTypes";

const initialState = {
  restaurants: [],
};

export const restoReducer = (state = initialState, action) => {
  switch (action.type) {
    case restoTypes.RESTO_GET:
      return {
        ...state,
        resturants: action.payload
      }
    case restoTypes.RESTO_ADD:
      return {
        ...state,
        restaurants: [...state.restaurants, action.payload.resturant],
        error: {error: action.payload.error, errorMessage: action.payload.errorMessage}
      };
    case restoTypes.RESTO_FILTERED:
      return {
        ...state,
        restaurants: action.payload.restaurants,
      };
    default:
      return state;
  }
};
