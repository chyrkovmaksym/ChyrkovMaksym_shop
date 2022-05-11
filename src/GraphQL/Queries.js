import { gql } from '@apollo/client';

export const INITIAL_DATA = gql`
  query {
    currencies {
      label
      symbol
    }
    categories {
      name
    }
  }
`;

export const CATEGORY = gql`
  query ($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        inStock
        description
        brand
        gallery
        prices {
          amount
        }
      }
    }
  }
`;
export const PRODUCT = gql`
  query ($productId: String!) {
    product(id: $productId) {
      brand
      name
      prices {
        amount
      }
      gallery
      description
      attributes {
        type
        name
        items {
          displayValue
          value
        }
      }
      inStock
    }
  }
`;
