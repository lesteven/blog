import React, { Component, Fragment } from 'react';
import DropZone from 'react-dropzone';


class DropImages extends Component {

  render() {
    return (
      <div className='drop-images'>
        hello dropimages!
        <DropZone />
      </div>
    )
  }
}

export default DropImages;
