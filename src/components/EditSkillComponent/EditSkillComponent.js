import React from 'react';
import PropTypes from 'prop-types';
import styles from './EditSkillComponent.module.css';

function EditSkillComponent(props){
  if(props.editedId===props.id){
    return(
      <input type='text' defaultValue={props.name} onKeyUp={(e)=>props.editItem(e)}></input>
    );
  }
  else{
    return(
      props.name
    );
  }
};

EditSkillComponent.propTypes = {
  editedId:PropTypes.number.isRequired,
  id:PropTypes.number.isRequired,
  name:PropTypes.string.isRequired,
  editItem:PropTypes.func.isRequired
};

EditSkillComponent.defaultProps = {};

export default EditSkillComponent;
