import './PageName.css';
import React from 'react';

class PageName extends React.Component {
  render() {
    return (
      <div>
        <h2 className='currentPageName'>{this.props.currentPageName}</h2>
      </div>
    );
  }
}

export default PageName;