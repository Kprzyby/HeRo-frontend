import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CreateSkillComponent.module.css';
import Popup from 'reactjs-popup';
import  Button  from "react-bootstrap/Button"
import {PlusLg} from 'react-bootstrap-icons'
import 'reactjs-popup/dist/index.css';

class CreateSkillComponent extends React.Component{
  constructor(props){
    super(props);

    this.state={
      skillName:'C#'
    }

    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleInputChange(e){
    this.setState({
      skillName:e.target.value
    });
  }
  handleSubmit(e)
  {
    e.preventDefault();

    const newSkillValue=this.state.skillName;

    this.setState({
      skillName:''
    });

    this.props.createNewSkill(e, newSkillValue);
  }
  render(){
    return(
  <Popup trigger={<Button variant='primary'><PlusLg></PlusLg>Add a skill</Button>}>
    <form onSubmit={this.handleSubmit}>
      <label htmlFor='nameInput'>Name of the skill:</label>
      <input id='nameInput' type='text' value={this.state.skillName} onChange={this.handleInputChange}></input><br></br>
      <Button type='submit' variant='primary'>Create</Button>
    </form>
  </Popup>
  );
}
};

CreateSkillComponent.propTypes = {
  createNewSkill:PropTypes.func.isRequired
};

CreateSkillComponent.defaultProps = {};

export default CreateSkillComponent;
