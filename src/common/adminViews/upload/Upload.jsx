import React, { Component, Fragment } from 'react';
import DropImages from './DropImages';
import UploadedImages from './UploadedImages';
import styles from './upload.css';
import { asyncFetchImage } from '../../reduxModules/uploadModule';


class Upload extends Component {
  static fetchData({ store }, url) {
    return store.dispatch(asyncFetchImage(`${url}/admapi/upload`));
  }

  render() {
    return (
      <Fragment>
        <DropImages />  
        <UploadedImages />
      </Fragment>
    )
  }
}

export default Upload;
