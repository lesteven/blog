import React, { Component, Fragment } from 'react';
import DropZone from 'react-dropzone';
import { connect } from 'react-redux';
import { dropAct } from '../../reduxModules/uploadModule';


class DropImages extends Component {
  render() {
  const { dropAct } = this.props;
    return (
      <div className='drop-images'>
        <DropZone className='dropzone'
             onDrop = { dropAct.bind(this) }>
          <p> Drag and drop images or click! </p>
        </DropZone>
      </div>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropImages);
