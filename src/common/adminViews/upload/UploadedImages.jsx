import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class UploadedImages extends Component {
  render() {
  // console.log(this.props.upload);
    return (
      <div>
        hello uploadedimages!
      </div>
    )
  }
}


const mapStateToProps = state => ({
  upload: state.upload
})


export default connect(mapStateToProps)(UploadedImages);
