import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class UploadedImages extends Component {
  render() {
  const { files } = this.props.upload;
  console.log(files);
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
  upload: state.upload
})


export default connect(mapStateToProps)(UploadedImages);
