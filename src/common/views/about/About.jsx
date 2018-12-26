import React, { Component, Fragment } from 'react';
import styles from './about.css';
import data from './data';

class About extends Component {
    
    render (){
      return (
        <div className='about'>
          { data.map((each, index) => 
            <p key = { index }> { each } </p> ) }
          <p> You can check out the code at 
            <a href= 'https://github.com/lesteven/blog'> github</a> 
            . Or visit my website at 
            <a href = 'https://imstevenle.com'> imstevenle.com</a>
            .
          </p>
        </div>
      )
    }
}


export default About;
