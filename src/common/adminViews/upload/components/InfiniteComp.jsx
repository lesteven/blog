import React, { Component, Fragment } from 'react';
import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css';


function InfiniteComp ({
  hasNextPage,
  isNextPageLoading,
  list,
  loadNextPage
}) {
  const rowCount = list.length;
  const loadMoreRows = isNextPageLoading
    ? () => {}
    : loadNextPage
  const isRowLoaded = ({ index }) => (!hasNextPage || 
    index < list.length)

  const rowRenderer = ({ index, key, style }) => {
    let content;

    if (!isRowLoaded({ index })) {
      content = 'Loading...'
    }
    else {
      content = list[index];
    }
    
    return (
      <div key = { key } style = { style } >
        { content }
      </div>
    )
  }
  return (
    <InfiniteLoader
      isRowLoaded = { isRowLoaded }
      loadMoreRows = { loadMoreRows }
      rowCount = { rowCount }
    >
      {({ onRowsRendered, registerChild }) => (
        <List
          ref = { registerChild }
          onRowsRendered = { onRowsRendered }
          rowRenderer = { rowRenderer }
          rowCount = { remoteRowCount }
          rowHeight = { 20 }
          width = { 300 }
        />
      )}
    </InfiniteLoader>
  )
}

export default InfiniteComp;
