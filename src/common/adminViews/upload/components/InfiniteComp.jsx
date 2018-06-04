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
      console.log(content);
    }
    
    return (
      <div style = { style } key= {content._id}>
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
          height = { 1000 }
          width = { 300 }
        />
      )}
    </InfiniteLoader>
  )
}

export default InfiniteComp;
