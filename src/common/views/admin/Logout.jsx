import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../reduxModules/fetchThunk';
import { loginAction } from '../../reduxModules/authModule';



class Logout extends Component {
  logout = () => {
      this.props.fetchData('/api/auth/logout',this.props.loginAction)
  }
  render() {
    let { auth } = this.props;
    return(
      <Fragment>
        <form >
          <input  className= 'teal-button' 
              type='button' value='Logout' onClick={this.logout}/>
        </form>
        <div className='white-space'></div>
        <button className= 'teal-button' onClick={this.goHome}>
            Go To Dashboard</button>
      </Fragment>
    )
  }

}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, cb) => dispatch(fetchData(url, cb)),
        loginAction: (lstatus) => dispatch(loginAction(lstatus)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
