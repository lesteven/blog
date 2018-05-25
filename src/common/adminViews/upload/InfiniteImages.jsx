import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-virtualized';


const list = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]
function cellRenderer ({columnIndex, key, rowIndex, style}) {
  return (
    <div key = { key} style = { style }>
      { list[rowIndex][columnIndex] }
    </div>
  )
}

class InfiniteImages extends Component {

  render() {
  const { scroll, upload } = this.props;
  const { files } = upload;
    return (
      <section className='uploaded-wrapper'>
        <Grid 
          cellRenderer = { cellRenderer }
          columnCount  = { list[0].length }
          columnWidth = { 100 }
          height = { 500 }
          rowCount = { list.length }
          rowHeight = { 30 }
          width = { 500 } 
        /> 
      </section>
    )
  }
}


const mapStateToProps = state => ({
  upload: state.upload,
  scroll: state.scroll,
})


export default connect(mapStateToProps)(InfiniteImages);
