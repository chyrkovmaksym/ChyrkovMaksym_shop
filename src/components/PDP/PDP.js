import './PDP.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCT } from '../../GraphQL/Queries';
import { client } from '../../assets/config';

import { connect } from 'react-redux';
import { cartAdd } from '../../Redux/actions';
import Attributes from '../Attributes/Attributes';

const mapStateToProps = (state) => ({
  currentCurrency: state.currencyChange.currentCurrency,
  currencies: state.requestInitialData.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  onCartAdd: (product) => dispatch(cartAdd(product)),
});

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const getProduct = async (id) => {
  const product = await client.query({
    query: PRODUCT,
    variables: {
      productId: id,
    },
  });
  return product.data;
};

const textAttributeSize = {
  width: '63px',
  height: '45px',
};

const swatchAttributeSize = {
  width: '32px',
  height: '32px',
};

class PDP extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: '',
      name: '',
      attributes: [],
      description: '',
      gallery: [],
      currentPhotoUrl: '',
      inStock: false,
      prices: 0,
      isPending: true,
    };
  }
  componentDidMount() {
    const { id } = this.props.params;
    getProduct(id).then(({ product }) => {
      this.setState({
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
    });
  }
  changePickedValue = (attribute, item) => {
    this.setState({
      pickedValues: this.state.pickedValues.map((obj) => {
        if (obj.name === attribute.name) {
          return {
            ...obj,
            value: item.displayValue,
          };
        }
        return obj;
      }),
    });
  };
  render() {
    const { currencies, currentCurrency } = this.props;
    return (
      !this.state.isPending && (
        <div className='pdp'>
          <div className='gallery'>
            {this.state.gallery.map((url, index) => {
              return (
                <div
                  key={index}
                  className='productsImageContainer'
                  onClick={() => {
                    this.setState({ currentPhotoUrl: url });
                  }}
                >
                  <img src={url} alt='product' height='80px' />
                </div>
              );
            })}
          </div>
          <div className='currentPhotoContainer'>
            <img
              src={this.state.currentPhotoUrl}
              alt='product'
              height='500px'
            />
          </div>
          <div className='description'>
            <p className='brand'>{this.state.brand}</p>
            <p className='productName'>{this.state.name}</p>
            <Attributes
              attributes={this.state.attributes}
              pickedValues={this.state.pickedValues}
              changePickedValue={this.changePickedValue}
              swatchAttributeSize={swatchAttributeSize}
              textAttributeSize={textAttributeSize}
            />
            <p className='price'>PRICE:</p>
            <p className='amount'>
              {currencies.length ? currencies[currentCurrency].symbol : '$'}{' '}
              {this.state.prices[currentCurrency].amount
                ? this.state.prices[currentCurrency].amount
                : 0}
            </p>
            <button
              disabled={!this.state.inStock}
              className={`addToCartBtn ${this.state.inStock ? '': 'disabled'}`}
              onClick={() => {
                this.props.onCartAdd(this.state);
              }}
            >
              <p>{this.state.inStock ? 'add to cart' : 'out of stock'}</p>
            </button>
            <div
              className='productDescription'
              dangerouslySetInnerHTML={{ __html: this.state.description }}
            ></div>
          </div>
        </div>
      )
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(PDP));
