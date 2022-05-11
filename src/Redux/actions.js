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
import { INITIAL_DATA, CATEGORY } from '../GraphQL/Queries';

export const requestInitialData = (client) => async (dispatch) => {
  dispatch({
    type: REQUEST_INITIAL_DATA_PENDING,
  });
  const initialData = await client.query({
    query: INITIAL_DATA,
    variables: {},
  });
  await dispatch({
    type: REQUEST_INITIAL_DATA_SUCCESS,
    payload: initialData.data,
  });
};

export const requestCurrentProduct =
  (client, categoryName) => async (dispatch) => {
    dispatch({
      type: REQUEST_CURRENT_PRODUCTS_PENDING,
    });
    const data = await client.query({
      query: CATEGORY,
      variables: {
        input: {
          title: categoryName,
        },
      },
    });
    await dispatch({ type: REQUEST_CURRENT_PRODUCTS_SUCCESS, payload: data });
  };

export const currencyChange = (index) => ({
  type: CURRENCY_CANGE,
  payload: index,
});

export const cartAdd = (product) => ({
  type: CART_ADD,
  payload: product,
});

export const cartChange = (product, attribute, item) => ({
  type: CART_CHANGE,
  payload: { product, attribute, item },
});

export const cartRemoveProduct = (product) => ({
  type: CART_REMOVE_PRODUCT,
  payload: product,
});
