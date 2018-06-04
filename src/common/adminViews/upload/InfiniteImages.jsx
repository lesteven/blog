import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import InfiniteComp from './components/InfiniteComp';

class InfiniteImages extends React.PureComponent {

  render() {
  const { upload } = this.props;
  const { files } = upload;
    return (
      <section className='uploaded-wrapper'>
{/*
        <InfiniteComp 
          hasNextPage = { hasNextPage }
          isNextPageLoading = { isNextPageLoading }
          list = { list }
          loadNextPage = { loadNextPage }
        /> 
*/}
      </section>
    )
  }
}


const mapStateToProps = state => ({
  upload: state.upload,
})


export default connect(mapStateToProps)(InfiniteImages);
