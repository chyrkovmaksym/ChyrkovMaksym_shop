import './ProductCard.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CartIcon from '../../assets/images/EmptyCart.png';
import { cartAdd } from '../../Redux/actions';
import { cartProductObject, client } from '../../assets/config';
import { PRODUCT } from '../../GraphQL/Queries';

const mapStateToProps = (state) => ({
  currencies: state.requestInitialData.currencies,
  currentCurrency: state.currencyChange.currentCurrency,
  currentCategoryName: state.requestCurrentProduct.currentCategoryName,
});

const mapDispatchToProps = (dispatch) => ({
  onCartAdd: (product) => dispatch(cartAdd(product)),
});

const getProduct = async (id) => {
  const product = await client.query({
    query: PRODUCT,
    variables: {
      productId: id,
    },
  });
  return product.data;
};

class ProductCard extends React.Component {
  constructor() {
    super();
    this.state = {
      showAddToCart: false,
      addToCartHover: false,
    };
  }
  render() {
    const { currencies, currentCurrency, product, onCartAdd, currentCategoryName } = this.props;
    const link = `/pdp/${product.id}`;
    return (
      <Link to={this.state.addToCartHover ? `/${currentCategoryName}` : link} className='link'>
        <div
          className='productCard'
          onMouseEnter={() => {
            this.setState({ showAddToCart: true });
          }}
          onMouseLeave={() => {
            this.setState({ showAddToCart: false });
          }}
        >
          {this.state.showAddToCart && product.inStock ? (
            <div
              className='addToCart'
              onMouseEnter={() => {
                this.setState({ addToCartHover: true });
              }}
              onMouseLeave={() => {
                this.setState({ addToCartHover: false });
              }}
              onClick={() => {
                getProduct(product.id).then(({ product }) => {
                  const res = cartProductObject(product);
                  onCartAdd(res);
                });
              }}
            >
              <img src={CartIcon} alt='cart' />
            </div>
          ) : (
            <span></span>
          )}
          <div className='productImageBox'>
            <img
              className={`productImage ${
                !product.inStock ? 'productImageOutOfStock' : ''
              }`}
              src={product.gallery[0]}
              alt='product'
            />
            {!product.inStock ? (
              <div className='outOfStock'>
                <p>out of stock</p>
              </div>
            ) : (
              <span></span>
            )}
          </div>
          <div className='content'>
            <p>
              {product.brand}: {product.name}
            </p>
            <p>
              {product.prices[currentCurrency].amount}{' '}
              {currencies[currentCurrency].symbol}
            </p>
          </div>
        </div>
      </Link>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
