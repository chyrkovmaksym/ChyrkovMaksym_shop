import './ProductDescription.css';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  currentCurrency: state.currencyChange.currentCurrency,
  currencies: state.requestInitialData.currencies,
});

class ProductDescription extends React.Component {
  render() {
    const { product, currencies, currentCurrency } = this.props;
    return (
      <div>
        <p
          className='cartProductName'
          style={this.props.productDescriptionStyle}
        >
          {product.brand}
        </p>
        <p
          className='cartProductName'
          style={{ ...this.props.productDescriptionStyle, fontWeight: '400' }}
        >
          {product.name}
        </p>
        <p className='cartProductPrice' style={this.props.productPriceStyle}>
          {currencies.length ? currencies[currentCurrency].symbol : '$'}{' '}
          {product.prices[currentCurrency].amount
            ? product.prices[currentCurrency].amount
            : 0}
        </p>
      </div>
    );
  }
}
export default connect(mapStateToProps)(ProductDescription);
