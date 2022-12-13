import React from 'react';
import PropTypes from 'prop-types';


function EditUserComponent(props){
  if(props.editedId===props.id){
    return(
      <input type='text' defaultValue={props.name} onKeyUp={(e)=>props.editUser(e)}></input>
    );
  }
  else{
    return(
      props.name
    );
  }
};

EditUserComponent.propTypes = {
  editedId:PropTypes.number.isRequired,
  id:PropTypes.number.isRequired,
  name:PropTypes.string.isRequired,
  editItem:PropTypes.func.isRequired
};

EditUserComponent.defaultProps = {};

export default EditUserComponent;
