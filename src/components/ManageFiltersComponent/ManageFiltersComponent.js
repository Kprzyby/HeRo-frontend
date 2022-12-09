import React from 'react';
import PropTypes from 'prop-types';
import styles from './ManageFiltersComponent.module.css';

function ManageFiltersComponent(props){
  return(
    <div className={styles.ManageFiltersComponent}>
      <input placeholder='Find a recruitment by its name' type='text' name='name' defaultValue='' onChange={props.handleInputChange}></input><br></br><br></br>
      <label htmlFor='beginningDate'>From: </label>
      <input type='date' id='beginningDate' name='beginningDate' defaultValue={new Date()} onChange={props.handleInputChange}></input>&nbsp;
      <label htmlFor='endingDate'>To: </label>
      <input type='date' id='endingDate' name='endingDate' defaultValue={new Date()} onChange={props.handleInputChange}></input><br></br><br></br>
      <label htmlFor='showOpen'>Show open recruitments</label>
      <input type='checkbox' id='showOpen' name='showOpen' onChange={props.handleInputChange} defaultChecked={true}></input><br></br>
      <label htmlFor='showCloed'>Show closed recruitments</label>
      <input type='checkbox' id='showClosed' name='showClosed' onChange={props.handleInputChange}></input>
    </div>
  )
}

ManageFiltersComponent.propTypes = {
  handleInputChange:PropTypes.func
};

ManageFiltersComponent.defaultProps = {};

export default ManageFiltersComponent;
