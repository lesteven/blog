import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css';

const list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]

const remoteRowCount = list.length;
console.log(remoteRowCount);
function isRowLoaded({ index }) {
    return !!list[index];
}
function loadMoreRows({ startIndex, stopIndex }) {
  console.log(startIndex);
  console.log(stopIndex);
}
function rowRenderer ({ key, index, style}) {
  return (
    <div key = { key} style = { style }>
      { list[index] }
    </div>
  )
}

class InfiniteImages extends React.PureComponent {

  render() {
  const { upload } = this.props;
  const { files } = upload;
    return (
      <section className='uploaded-wrapper'>
        <InfiniteLoader
          isRowLoaded = { isRowLoaded }
          loadMoreRows = { loadMoreRows }
          rowCount = { remoteRowCount }
        >
          {({ onRowsRendered, registerChild }) => (
            <List
              height = { 200 }
              onRowsRendered = { onRowsRendered }
              ref = { registerChild }
              rowCount = { remoteRowCount }
              rowHeight = { 20 }
              rowRenderer = {rowRenderer }
              width = { 300 }
            />
          )}
        </InfiniteLoader>
      </section>
    )
  }
}


const mapStateToProps = state => ({
  upload: state.upload,
})


export default connect(mapStateToProps)(InfiniteImages);
