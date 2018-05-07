import React, { Component, Fragment } from 'react';
import DropZone from 'react-dropzone';
import { connect } from 'react-redux';
import { dropAct, uploadAct } from '../../reduxModules/uploadModule';
import FlashMsg from '../../sharedViews/flashMsg/FlashMsg';


class DropImages extends Component {
  makeFormData = () => {
    const { dropAct, upload, uploadAct } = this.props;
    let formData = null;

    if (upload.accepted[0]) {
      formData = new FormData();
      upload.accepted.map( f => formData.append(f.name, f));
      uploadAct(formData);
    }
  }
  render() {
  const { dropAct, upload } = this.props;
    return (
      <Fragment>
        <div className='uploaded-images'>
          <h2> Selected Images </h2>
          { upload.accepted.map(f => 
            <img key = {f.name} src= {f.preview} />) }
        </div>
        <hr />

        <section className='drop-wrapper'>
        <div className='drop-images'>
          <DropZone className='dropzone'
            accept='image/*'
             onDrop = {(accepted,rejected)=>
               { dropAct({accepted,rejected})}}>
            <p> Drag and drop or click! </p>
          </DropZone>
        </div>

        <FlashMsg status = {upload.status} />

        <div className='upload-button'>
          <button onClick = {this.makeFormData}> Upload! </button>
        </div>
        </section>

      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    upload: state.upload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dropAct: (files) => dispatch(dropAct(files)), 
    uploadAct: (files) => dispatch(uploadAct(files)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropImages);
