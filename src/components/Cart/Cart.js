import './Cart.css';
import React from 'react';
import PageName from '../PageName/PageName';
import { connect } from 'react-redux';
import ProductDescription from '../ProductDescription/ProductDescription';
import CartProduct from '../CartProduct/CartProduct';
import Attributes from '../Attributes/Attributes';
import { cartAdd, cartChange, cartRemoveProduct } from '../../Redux/actions';
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
  onCartChange: (product, attribute, item) =>
    dispatch(cartChange(product, attribute, item)),
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
                    productDescriptionStyle={productDescriptionStyle}
                    product={product}
                    productPriceStyle={productPriceStyle}
                  />
                  <Attributes
                    attributes={product.attributes}
                    pickedValues={product.pickedValues}
                    changePickedValue={this.props.onCartChange.bind(
                      null,
                      product
                    )}
                    swatchAttributeSize={swatchAttributeSize}
                    textAttributeSize={textAttributeSize}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className='cartProductNumber'>
                    <button
                      className='changeNumber'
                      onClick={() => {
                        this.props.onCartAdd({
                          ...product,
                          pickedValues: product.attributes.map((attribute) => {
                            return {
                              name: attribute.name,
                              value: attribute.items[0].displayValue,
                            };
                          }),
                        });
                      }}
                    >
                      +
                    </button>
                    <p>{productsNumber[index]}</p>
                    <button
                      className='changeNumber'
                      onClick={() => {
                        this.props.onCartRemoveProduct(product);
                        console.log(product);
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
        <h1 style={{ textAlign: 'center', marginTop: '20vh' }}>
          Cart Is Empty...
        </h1>
      </div>
    );
  }
}
const textAttributeSize = {
  width: '63px',
  height: '45px',
};

const swatchAttributeSize = {
  width: '32px',
  height: '32px',
};

const productDescriptionStyle = {
  marginTop: '0',
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '30px',
  lineHeight: '27px',
};

const productPriceStyle = {
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '24px',
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
