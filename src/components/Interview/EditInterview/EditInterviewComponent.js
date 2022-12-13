import React from 'react';
import PropTypes from 'prop-types';


function EditInterviewComponent(props) {
  if (props.editedId === props.id) {
    return (
      <input type='text' defaultValue={props.name} onKeyUp={(e) => props.editName(e, props.userStatus, props.email, props.roleName)}></input>
    );
  }
  else {
    return (
      props.name
    );
  }
};

EditInterviewComponent.propTypes = {
  editedId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  editName: PropTypes.func.isRequired
};

EditInterviewComponent.defaultProps = {};

export default EditInterviewComponent;
