const updateCartItem = (book, item = {}, quality) => {

  const {
    id = book.id,
    title = book.title,
    count = 0,
    total = 0
  } = item;

  return {
    id,
    title,
    count: count + quality,
    total: total + quality * book.price
  }
};

const updateCartItems = (cartItems, item, idx) => {
  if (item.count === 0) {
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1)
    ];
  } else if (idx < 0) {
    return [
      ...cartItems,
      item
    ];
  } else {
    return [
      ...cartItems.slice(0, idx),
      item,
      ...cartItems.slice(idx + 1)
    ];
  }
};

const updateOrder = (state, bookId, quality) => {
  const { bookList: {books}, shoppingCart: {cartItems} } = state;

  const calcOrderTotal = cartItems => {
    let sum = 0;
    cartItems.map(item => sum+= item.total);
    return sum;
  };

  const book = books.find(book => book.id === bookId);
  const itemIndex = cartItems.findIndex(book => book.id === bookId);
  const item = cartItems[itemIndex];

  const newItem = updateCartItem(book, item, quality);
  const newCartItems = updateCartItems(cartItems, newItem, itemIndex);

  return {
    numsTotal: newCartItems.length,
    orderTotal: calcOrderTotal(newCartItems),
    cartItems: newCartItems
  };
};

const updateShoppingCart = (state, action) => {

  if (state === undefined) {
    return {
      cartItems: [],
      numsTotal: 0,
      orderTotal: 0
    };
  }

  switch (action.type) {
    case 'BOOK_ADDED_TO_CART':
      return updateOrder(state, action.payload, 1);
    case 'BOOK_REMOVED_FROM_CART':
      return updateOrder(state, action.payload, -1);
    case 'ALL_BOOKS_REMOVED_FROM_CART':
      const item = state.shoppingCart.cartItems.find(book => book.id === action.payload);
      return updateOrder(state, action.payload, -item.count);
    default:
      return state.shoppingCart;
  }
};

export default updateShoppingCart;