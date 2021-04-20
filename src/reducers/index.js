import updateBookList from "./updateBookList";
import updateShoppingCart from "./updateShopingCart";

const reducer = (state, action) => {
  return {
    bookList: updateBookList(state, action),
    shoppingCart: updateShoppingCart(state, action)
  };
};

export default reducer;