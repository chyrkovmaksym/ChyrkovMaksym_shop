import {
  REQUEST_INITIAL_DATA_PENDING,
  REQUEST_INITIAL_DATA_SUCCESS,
  REQUEST_CURRENT_PRODUCTS_PENDING,
  REQUEST_CURRENT_PRODUCTS_SUCCESS,
  CURRENCY_CANGE,
  CART_ADD,
  CART_CHANGE,
  CART_REMOVE_PRODUCT,
} from '../assets/constants';

const dataState = {
  currencies: [],
  categories: [],
  isPending: true,
};

export const requestInitialData = (state = dataState, action = {}) => {
  switch (action.type) {
    case REQUEST_INITIAL_DATA_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_INITIAL_DATA_SUCCESS:
      return Object.assign({}, state, {
        currencies: action.payload.currencies,
        categories: action.payload.categories,
        isPending: false,
      });
    default:
      return state;
  }
};

const productsState = {
  currentProducts: [],
  currentCategoryName: '',
};
export const requestCurrentProduct = (state = productsState, action = {}) => {
  switch (action.type) {
    case REQUEST_CURRENT_PRODUCTS_PENDING:
      return Object.assign({}, state);
    case REQUEST_CURRENT_PRODUCTS_SUCCESS:
      return {
        currentProducts: action.payload.data.category.products,
        currentCategoryName: action.payload.data.category.name,
      };
    default:
      return state;
  }
};

const currentCurrency = {
  currentCurrency: 0,
};

export const currencyChange = (state = currentCurrency, action = {}) => {
  switch (action.type) {
    case CURRENCY_CANGE:
      return { currentCurrency: action.payload };
    default:
      return state;
  }
};

const cartState = {
  cartProducts: [],
};

export const cartChange = (state = cartState, action = {}) => {
  switch (action.type) {
    case CART_ADD:
      return action.payload
        ? { cartProducts: [...state.cartProducts, action.payload] }
        : { cartProducts: [] };
    case CART_CHANGE:
      return {
        cartProducts: state.cartProducts.map((prod) => {
          if (
            prod.brand === action.payload.product.brand &&
            prod.name === action.payload.product.name &&
            JSON.stringify(prod.pickedValues) ===
              JSON.stringify(action.payload.product.pickedValues)
          ) {
            prod.pickedValues = prod.pickedValues.map((obj) => {
              if (obj.name === action.payload.attribute.name) {
                return {
                  ...obj,
                  value: action.payload.item.displayValue,
                };
              }
              return obj;
            });
          }
          return prod;
        }),
      };
    case CART_REMOVE_PRODUCT:
      const arr = JSON.parse(JSON.stringify(state.cartProducts));
      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].name === action.payload.name &&
          arr[i].brand === action.payload.brand &&
          JSON.stringify(arr[i].pickedValues) ===
            JSON.stringify(action.payload.pickedValues)
        ) {
          arr.splice(i, 1);
          break;
        }
      }
      return {
        cartProducts: arr,
      };
    default:
      return state;
  }
};
