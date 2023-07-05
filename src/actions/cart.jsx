export const addToCart = (item) => {
  return {
    type: "ADD_ITEM",
    payload: item,
  };
};
