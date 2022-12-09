import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddButtonsComponent.module.css';
import AuthService from '../../services/auth.service';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from "react-router-dom";

function AddButtonsComponent(props){
  const user=AuthService.getCurrentUser();
  const navigate=useNavigate();
  
  const moveToForm=(e)=>{
    navigate('/createRecruitment');
  }

  if(user){
    return(
      <Button variant='primary' onClick={moveToForm}>Add a recruitment</Button>
    );
  }
};

AddButtonsComponent.propTypes = {};

AddButtonsComponent.defaultProps = {};

export default AddButtonsComponent;
