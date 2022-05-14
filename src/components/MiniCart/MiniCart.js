import './MiniCart.css';
import React from 'react';
import CartIcon from '../../assets/images/EmptyCart.png';
import { connect } from 'react-redux';
import { cartAdd, cartRemoveProduct } from '../../Redux/actions';
import Attributes from '../Attributes/Attributes';
import ProductDescription from '../ProductDescription/ProductDescription';
import CartProduct from '../CartProduct/CartProduct';
import ProductImage from '../ProductImage/ProductImage';
import { combineSame } from '../../assets/config';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => ({
  cartProducts: state.cartChange.cartProducts,
  currentCurrency: state.currencyChange.currentCurrency,
  currencies: state.requestInitialData.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  onCartAdd: (product) => dispatch(cartAdd(product)),
  onCartRemoveProduct: (product) => dispatch(cartRemoveProduct(product)),
});
class MiniCart extends React.Component {
  constructor() {
    super();
    this.state = {
      showCart: false,
    };
  }
  componentDidMount() {
    window.removeEventListener('click', (event) => console.log(event));
    window.addEventListener('click', (event) => {
      if (
        this.state.showCart &&
        !event.target.matches('.miniCartBtn') &&
        !event.target.matches('.cart') &&
        !event.target.matches('.textAttribute') &&
        !event.target.matches('.swatchAttribute') &&
        !event.target.matches('.changeNumber') &&
        !event.target.matches('.numOfItems')
      ) {
        this.setState({ showCart: false });
      }
    });
  }
  render() {
    const { cartProducts, currencies, currentCurrency } = this.props;
    let totalPrice = 0;
    const { allProducts, productsNumber } = combineSame(cartProducts);
    return (
      <div className='miniCartBox'>
        <div
          className='miniCartBtn'
          onClick={() => {
            this.setState({ showCart: !this.state.showCart });
          }}
        >
          <img
            src={CartIcon}
            alt='cart'
            className='cart'
            onClick={() => {
              this.setState({ showCart: !this.state.showCart });
            }}
          />
          {cartProducts.length ? (
            <span className='numOfItems'>{cartProducts.length}</span>
          ) : (
            <span></span>
          )}
        </div>
        {this.state.showCart && (
          <div>
            <div className='miniCart'>
              <p className='miniCartCaption'>
                <b>My Bag</b>, {cartProducts.length} items
              </p>
              {allProducts.map((product, index) => {
                totalPrice +=
                  product.prices[currentCurrency].amount *
                  productsNumber[index];
                return (
                  <CartProduct key={index}>
                    <div className='miniCartProductDescription'>
                      <ProductDescription product={product} />
                      <Attributes
                        attributes={product.attributes}
                        pickedValues={product.pickedValues}
                        miniCart={true}
                      />
                    </div>
                    <div className='miniCartProductNumber'>
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
                    <ProductImage product={product} imgWidth={'121px'} />
                  </CartProduct>
                );
              })}
              <div className='totalPriceDiv'>
                <p>Total</p>
                <p>
                  {currencies[currentCurrency].symbol}{' '}
                  {Math.round(totalPrice * 100) / 100}
                </p>
              </div>
              <div className='miniCartButtons'>
                <Link to={'/cart'}>
                  <button className='viewBagBtn'>view bag</button>
                </Link>
                <button
                  className='checkOutBtn'
                  onClick={() => console.log('CHECK OUT')}
                >
                  check out
                </button>
              </div>
            </div>
            <div className='bg'></div>
          </div>
        )}
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
