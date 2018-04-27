import React, { Component, Fragment } from 'react';
import DropImages from './DropImages';
import UploadedImages from './UploadedImages';
import styles from './upload.css';

class Upload extends Component {

  render() {
    return (
      <div>
        <DropImages />  
        <UploadedImages />
      </div>
    )
  }
}

export default Upload;
