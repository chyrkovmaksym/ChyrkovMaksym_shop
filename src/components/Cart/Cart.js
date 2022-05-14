import './Cart.css';
import React from 'react';
import PageName from '../PageName/PageName';
import { connect } from 'react-redux';
import ProductDescription from '../ProductDescription/ProductDescription';
import CartProduct from '../CartProduct/CartProduct';
import Attributes from '../Attributes/Attributes';
import { cartAdd, cartRemoveProduct } from '../../Redux/actions';
import ProductImage from '../ProductImage/ProductImage';
import { combineSame } from '../../assets/config';
import TotalCartPrice from '../TotalCartPrice/TotalCartPrice';

const mapStateToProps = (state) => ({
  cartProducts: state.cartChange.cartProducts,
  currentCurrency: state.currencyChange.currentCurrency,
  currencies: state.requestInitialData.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  onCartClean: () => dispatch(cartAdd()),
  onCartAdd: (product) => dispatch(cartAdd(product)),
  onCartRemoveProduct: (product) => dispatch(cartRemoveProduct(product)),
});

class Cart extends React.Component {
  render() {
    const { cartProducts, currentCurrency } = this.props;
    const { allProducts, productsNumber } = combineSame(cartProducts);
    let totalPrice = 0;
    return cartProducts.length ? (
      <div>
        <PageName currentPageName={'Cart'} />
        {allProducts.map((product, index) => {
          totalPrice +=
            product.prices[currentCurrency].amount * productsNumber[index];
          return (
            <div key={index}>
              <hr />
              <CartProduct>
                <div>
                  <ProductDescription
                    isMainCart={true}
                    product={product}
                  />
                  <Attributes
                    attributes={product.attributes}
                    pickedValues={product.pickedValues}
                    miniCart={false}
                  />
                </div>
                <div className='numAndImage'>
                  <div className='cartProductNumber'>
                    <button
                      className='changeNumber'
                      onClick={() => {
                        this.props.onCartAdd(product);
                      }}
                    >
                      +
                    </button>
                    <p>{productsNumber[index]}</p>
                    <button
                      className='changeNumber'
                      onClick={() => {
                        this.props.onCartRemoveProduct(product);
                      }}
                    >
                      -
                    </button>
                  </div>
                  <ProductImage
                    isMainCart={true}
                    product={product}
                    imgWidth={'250px'}
                  />
                </div>
              </CartProduct>
            </div>
          );
        })}
        <hr />
        <TotalCartPrice totalPrice={totalPrice} />
        <button className='orderBtn' onClick={this.props.onCartClean}>
          order
        </button>
      </div>
    ) : (
      <div>
        <h1 className='emptyCart'>
          Cart Is Empty...
        </h1>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
