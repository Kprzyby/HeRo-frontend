import React from 'react';
import PropTypes from 'prop-types';


function EditUserStatusComponent(props) {
  if (props.editedId === props.id) {
    return (
      <input type='text' defaultValue={props.userStatus} onKeyUp={(e) => props.editStatus(props.name, e, props.email, props.roleName)}></input>
    );
  }
  else {
    return (
      props.userStatus
    );
  }
};

EditUserStatusComponent.propTypes = {
  editedId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  editStatus: PropTypes.func.isRequired
};

EditUserStatusComponent.defaultProps = {};

export default EditUserStatusComponent;
