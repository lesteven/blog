import React, { Component, Fragment } from 'react';

/*
  className should be 'err' for error and 'success' for success
  msg can be anything
*/
class FlashMsg extends Component{

  render() {
  const { status } = this.props;
    return(
      <Fragment>
      { status.success?
      <h3 className='success'> { status.success } </h3> : null }
      { status.err?
      <h3 className='err'> { status.err } </h3> : null }
      </Fragment>
    )
  }
}

export default FlashMsg;
