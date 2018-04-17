import React,{Component} from 'react';
import styles from './component.css';


class TextInput extends Component {
    updateInput=(e)=> {
        const {data,updateInput} = this.props;
        updateInput(data._id,e.target.value);
    }
    onSubmit=(e)=> {
        e.preventDefault();
        const {data,onSubmit} = this.props;
        onSubmit(data);
    }
    render(){
        return(
            <form onSubmit={this.onSubmit} className='textInput'>
                <input className = 'input-text'
                    type='text'
                    value={this.props.inputValue} 
                    onChange={this.updateInput} 
                />
                <input className='white-button' 
                    type='submit'
                    value={this.props.buttonText} 
                />
            </form>
        )
    }
}

export default TextInput;
