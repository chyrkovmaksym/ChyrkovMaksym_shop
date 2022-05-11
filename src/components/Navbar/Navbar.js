import './Navbar.css';
import React from 'react';
import Logo from '../../assets/images/logo.png';
import DropDownList from '../DropDownList/DropDownList';
import MiniCart from '../MiniCart/MiniCart';
import { connect } from 'react-redux';
import { requestCurrentProduct } from '../../Redux/actions';
import { client } from '../../assets/config';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => ({
  categories: state.requestInitialData.categories,
  currentProducts: state.requestCurrentProduct.currentProducts,
});

const mapDispatchToProps = (dispatch) => ({
  onCurrentProductsRequest: (client, categoryName) =>
    dispatch(requestCurrentProduct(client, categoryName)),
});

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      currentCategory: 0,
    };
  }
  render() {
    const { categories } = this.props;
    return (
      <div className='navbar'>
        <ul className='navigation'>
          <li className='categories'>
            {categories.map(({ name }, index) => {
              return (
                <Link to={'/'} className='link' key={index}>
                  <div
                    className={`category ${
                      this.state.currentCategory === index ? 'active' : ''
                    }`}
                    onClick={() => {
                      this.props.onCurrentProductsRequest(client, name);
                      this.setState({ currentCategory: index });
                    }}
                  >
                    <p className='categoryName'>{name}</p>
                  </div>
                </Link>
              );
            })}
          </li>
          <li className='centered'>
            <img src={Logo} alt='logo' />
          </li>
          <li className='right'>
            <DropDownList />
            <MiniCart />
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
