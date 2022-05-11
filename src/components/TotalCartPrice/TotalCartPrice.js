import './TotalCartPrice.css';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  cartProducts: state.cartChange.cartProducts,
  currentCurrency: state.currencyChange.currentCurrency,
  currencies: state.requestInitialData.currencies,
});

class TotalCartPrice extends React.Component {
  render() {
    const { currencies, currentCurrency, cartProducts } = this.props;
    return (
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div className='financeKeys'>
          <p>Tax 21%:</p>
          <p>Quantity:</p>
          <p>Total:</p>
        </div>
        <div style={{ marginLeft: '20px' }} className='financeValues'>
          <p>
            {currencies[currentCurrency].symbol}
            {Math.round(this.props.totalPrice * 21) / 100}
          </p>
          <p>{cartProducts.length}</p>
          <p>
            {currencies[currentCurrency].symbol}
            {Math.round(this.props.totalPrice * 100) / 100}
          </p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TotalCartPrice);
