import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Paginate from '../../../sharedViews/paginate/Paginate.jsx';
import { withRouter } from 'react-router-dom';
import { getBlog } from './EditBlogList';


class EditPaginate extends Component {
	blogID=()=>{
    const { ids } = this.props.richEditor
    // const { ids } = this.props;
    if(ids[0]){
        let obj ={};
        obj.new = ids[0];
        obj.old = ids[ids.length-1];
        // console.log('paginate obj',obj); 
        return obj;
    }
    else{
        return {};
    }
	}
  render() {
//    console.log(this.props);
    const { pagination } = this.props.richEditor;
    const { path } = this.props.match;
    return (
      <Fragment>
       { pagination? 
        <Paginate 
          path = { path }
          page = { pagination }
          modelID = { this.blogID }
        />
        : null }
      </Fragment>
    )
  }
}


const mapState = ({ richEditor }) => ({
//  ids: getBlog(richEditor),
  richEditor,
})


export default withRouter(connect(mapState)(EditPaginate));
