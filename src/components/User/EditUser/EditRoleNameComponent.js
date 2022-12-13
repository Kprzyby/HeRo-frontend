import React from 'react';
import PropTypes from 'prop-types';


function EditRoleNameStatusComponent(props) {
  if (props.editedId === props.id) {
    return (
      <input type='text' defaultValue={props.roleName} onKeyUp={(e) => props.editRole(props.name, props.userStatus, props.email, e)}></input>
    );
  }
  else {
    return (
      props.roleName
    );
  }
};

EditRoleNameStatusComponent.propTypes = {
  editedId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  editRole: PropTypes.func.isRequired
};

EditRoleNameStatusComponent.defaultProps = {};

export default EditRoleNameStatusComponent;
