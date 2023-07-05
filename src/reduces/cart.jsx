const initialState = {
  listCart: [],
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      return state;
    }
    default:
      return state;
  }
};
export default cartReducer;
