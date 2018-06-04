import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import InfiniteComp from './components/InfiniteComp';
import { asyncFetchImage } from '../../reduxModules/uploadModule';

class InfiniteImages extends React.PureComponent {
  componentDidMount() {
    const { asyncFetchImage } = this.props;
    const { fetchedFiles } = this.props.upload;
    fetchedFiles.data? null : asyncFetchImage('/admapi/upload');
  }
  render() {
  const { asyncFetchImage } = this.props;
  const { fetchedFiles, fetchingData } = this.props.upload;
    return (
      <section className='uploaded-wrapper'>
        <InfiniteComp 
          hasNextPage = { fetchedFiles.page.old }
          isNextPageLoading = { fetchingData }
          list = { fetchedFiles.data }
          loadNextPage = { asyncFetchImage }
        /> 
      </section>
    )
  }
}


const mapStateToProps = state => ({
  upload: state.upload,
})

const mapDispatchToProps = {
  asyncFetchImage,
}

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteImages);
