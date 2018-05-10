import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class UploadedImages extends Component {

  render() {
  const { scroll, upload } = this.props;
  const { files } = upload;
    return (
      <section className='uploaded-wrapper'>
        { files.data? files.data.map(img => 
          <img src= {`/admapi/upload/${img.path}`} key= {img._id} 
            className ='mapped-images'/>)
          : null }
      </section>
    )
  }
}


const mapStateToProps = state => ({
  upload: state.upload,
  scroll: state.scroll,
})


export default connect(mapStateToProps)(UploadedImages);
