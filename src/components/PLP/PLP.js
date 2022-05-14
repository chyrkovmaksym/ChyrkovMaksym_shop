import './PLP.css';
import React from 'react';
import ProductList from '../ProductList/ProductList';
import { connect } from 'react-redux';
import PageName from '../PageName/PageName';
import { useParams } from 'react-router-dom';
import { requestCurrentProduct } from '../../Redux/actions';
import { client } from '../../assets/config';

const mapStateToProps = (state) => ({
  currentCategoryName: state.requestCurrentProduct.currentCategoryName,
  currentProducts: state.requestCurrentProduct.currentProducts,
});

const mapDispatchToProps = (dispatch) => ({
  onCurrentProductsRequest: (client, categoryName) =>
    dispatch(requestCurrentProduct(client, categoryName)),
});

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
class PLP extends React.Component {
  componentDidUpdate(){
    const { category } = this.props.params;
    this.props.onCurrentProductsRequest(client, category);
  }
  render() {
    
    const { currentProducts } = this.props;
    const { currentCategoryName } = this.props;
    return (
      <div>
        <PageName currentPageName={currentCategoryName} />
        {currentProducts.length ? (
          <ProductList currentProducts={currentProducts} />
        ) : (
          <span></span>
        )}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withParams(PLP));
