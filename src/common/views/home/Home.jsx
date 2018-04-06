import React, { Component, Fragment } from 'react';
import styles from './home.css';
import { fetchData } from '../../reduxModules/fetchThunk';
import { connect } from 'react-redux';


class Home extends Component {
    componentDidMount() {
      const { fetchData } = this.props;
      fetchData('./api/test');

    }
    render (){
      return (
        <Fragment>
          <div>Hello home!</div>
        </Fragment>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url, cb) => dispatch(fetchData(url,cb)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
