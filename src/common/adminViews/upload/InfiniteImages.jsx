import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import InfiniteComp from './components/InfiniteComp';
import { asyncFetchImage, 
         asyncInfinite } from '../../reduxModules/uploadModule';

class InfiniteImages extends React.PureComponent {
  componentDidMount() {
    const { asyncFetchImage } = this.props;
    const { fetchedFiles } = this.props.upload;
    fetchedFiles.data? null : asyncFetchImage('/admapi/upload');
  }
  loadNextPage = ({startIndex, stopIndex}) => {
    const { asyncInfinite, upload } = this.props;
    const { fetchedFiles } = upload;
    const id = fetchedFiles.data[startIndex-1]._id
    const url = `/admapi/upload/data?old=${id}`;

    return new Promise(resolve => {
      asyncInfinite(url);
    });
  }
  render() {
  const { asyncFetchImage } = this.props;
  const { fetchedFiles, fetchingData } = this.props.upload;
    return (
      <section className='uploaded-wrapper'>
       { fetchedFiles.data?
        <InfiniteComp 
          hasNextPage = { fetchedFiles.page.old }
          isNextPageLoading = { fetchingData }
          list = { fetchedFiles.data }
          loadNextPage = { this.loadNextPage }
        /> 
        : null }
      </section>
    )
  }
}


const mapStateToProps = state => ({
  upload: state.upload,
})

const mapDispatchToProps = {
  asyncFetchImage,
  asyncInfinite,
}

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteImages);
