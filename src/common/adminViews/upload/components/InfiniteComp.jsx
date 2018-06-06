import React, { Component, Fragment } from 'react';
import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css';


function InfiniteComp ({
  hasNextPage,
  isNextPageLoading,
  list,
  loadNextPage
}) {
  
  const rowCount = hasNextPage? list.length + 1: list.length;
  const loadMoreRows = isNextPageLoading
    ? () => {}
    : loadNextPage
  const isRowLoaded = ({ index }) => {
    //return !hasNextPage || index < list.length
    return !!list[index];
  }

  const rowRenderer = ({ index, key, style }) => {
    let content;

    if (!isRowLoaded({ index })) {
      content = 'Loading...'
    }
    else {
      content = list[index];
    }
    
    return (
      <div style = { style } key= {content._id + content.path}>
      <img src= {`/admapi/upload/${content.path}`}
        className ='mapped-images' />
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
          rowCount = { rowCount }
          rowHeight = { 250 }
          height = { 400 }
          width = { 300 }
        />
      )}
    </InfiniteLoader>
  )
}

export default InfiniteComp;
