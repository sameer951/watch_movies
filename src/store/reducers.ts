
//Action Types
export const Type = {
  "IS_LOADING": "IS_LOADING",
  "POPULAR_MOVIES": "POPULAR_MOVIES",
  "SET_USER": "SET_USER",
}

//Reducer
const initialState = {};
export const BaseReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case Type.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case Type.POPULAR_MOVIES:
      return { ...state, popularData: action.payload };
    case Type.SET_USER:
      return { ...state, user: action.payload }
    default:
      return state;
  }
}
export default {
  base: BaseReducer
};

//Action Calls