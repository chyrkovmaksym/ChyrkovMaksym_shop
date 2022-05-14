import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
export const combineSame = (cartProducts) => {
  const allProducts = JSON.parse(JSON.stringify(cartProducts));
  const productsNumber = [];
  for (let i = 0; i < allProducts.length; i++) {
    let counter = 1;
    for (let j = i + 1; j < allProducts.length; j++) {
      if (
        JSON.stringify(allProducts[i].pickedValues) ===
          JSON.stringify(allProducts[j].pickedValues) &&
        allProducts[i].name === allProducts[j].name &&
        allProducts[i].brand === allProducts[j].brand
      ) {
        allProducts.splice(j, 1);
        j--;
        counter++;
      }
    }
    productsNumber[i] = counter;
  }
  return { allProducts, productsNumber };
};
export const cartProductObject = (product) => ({
  brand: product.brand,
  name: product.name,
  attributes: product.attributes,
  description: product.description,
  gallery: product.gallery,
  currentPhotoUrl: product.gallery[0],
  inStock: product.inStock,
  prices: product.prices,
  pickedValues: product.attributes.map((attribute) => {
    return {
      name: attribute.name,
      value: attribute.items[0].displayValue,
    };
  }),
  isPending: false,
});
