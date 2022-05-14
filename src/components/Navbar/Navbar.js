import './Navbar.css';
import React from 'react';
import Logo from '../../assets/images/logo.png';
import DropDownList from '../DropDownList/DropDownList';
import MiniCart from '../MiniCart/MiniCart';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestCurrentProduct } from '../../Redux/actions';
import { client } from '../../assets/config';

const mapStateToProps = (state) => ({
  categories: state.requestInitialData.categories,
  currentCategoryName: state.requestCurrentProduct.currentCategoryName,
});

const mapDispatchToProps = (dispatch) => ({
  onCurrentProductsRequest: (client, categoryName) =>
    dispatch(requestCurrentProduct(client, categoryName)),
});

class Navbar extends React.Component {
  render() {
    const { categories, currentCategoryName, onCurrentProductsRequest } =
      this.props;
    return (
      <div className='navbar'>
        <ul className='navigation'>
          <li className='categories'>
            {categories.map(({ name }, index) => {
              return (
                <Link to={`/${name}`} className='link' key={index}>
                  <div
                    className={`category ${
                      name === currentCategoryName ? 'active' : ''
                    }`}
                    onClick={() => {
                      onCurrentProductsRequest(client, name);
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
