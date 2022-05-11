import './ProductCard.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  currencies: state.requestInitialData.currencies,
  currentCurrency: state.currencyChange.currentCurrency,
});

class ProductCard extends React.Component {
  render() {
    const { currencies, currentCurrency } = this.props;
    return (
      <Link to={`/pdp/${this.props.product.id}`} className='link'>
        <div className='productCard'>
          <div className='productImageBox'>
            <img
              className='productImage'
              src={this.props.product.gallery[0]}
              alt='product'
            />
          </div>
          <div className='content'>
            <p>
              {this.props.product.brand}: {this.props.product.name}
            </p>
            <p>
              {this.props.product.prices[currentCurrency].amount}{' '}
              {currencies[currentCurrency].symbol}
            </p>
          </div>
        </div>
      </Link>
    );
  }
}
export default connect(mapStateToProps)(ProductCard);
