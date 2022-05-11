import './PLP.css';
import React from 'react';
import ProductList from '../ProductList/ProductList';
import { connect } from 'react-redux';
import PageName from '../PageName/PageName';

const mapStateToProps = (state) => ({
  currentCategoryName: state.requestCurrentProduct.currentCategoryName,
});

class PLP extends React.Component {
  render() {
    const { currentCategoryName } = this.props;
    return (
      <div>
        <PageName currentPageName={currentCategoryName} />
        <ProductList />
      </div>
    );
  }
}
export default connect(mapStateToProps)(PLP);
