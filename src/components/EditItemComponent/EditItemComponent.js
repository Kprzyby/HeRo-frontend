import React from 'react';
import PropTypes from 'prop-types';
import styles from './EditItemComponent.module.css';
import userService from '../../services/user.service';

function EditItemComponent(props){
  if(props.editClicked===false){
    return <p id={props.name}>{props.value}</p>;
  }
  else{
    if(props.type==='text'){
      return <input type='text' id={props.name} name={props.name} value={props.value} onChange={props.handleInputChange}></input>
    }
    if(props.type==='date'){
      return <input type='date' id={props.name} name={props.name} value={props.value} onChange={props.handleInputChange}></input>   
    }
    if(props.type==='select' && props.name==='recruiterId'){
      let recruiters;
      
      userService.getRecruiters()
      .then(res=>recruiters=res);

      return(
        <select id={props.name} name={props.name} value={props.value} onChange={props.handleInputChange}>
          {recruiters.map(e=><option key={e.id} value={e.id}>{e.fullName}</option>)}
        </select>
      )
    }
    if(props.type==='select' && props.name==='seniority'){
      return(
        <select id={props.name} name={props.name} value={props.value} onChange={props.handleInputChange}>
          <option value='junior'>junior</option>
          <option value='junior/mid'>junior/mid</option>
          <option value='mid'>mid</option>
          <option value='mid/senior'>mid/senior</option>
          <option value='senior'>senior</option>
        </select>
      )
    }
    if(props.type==='textarea'){
      return <textarea id={props.name} defaultValue={props.value} name={props.name} onChange={props.handleInputChange}></textarea>
    }
  }
};

EditItemComponent.propTypes = {
  type:PropTypes.string,
  name:PropTypes.string,
  value:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  editClicked:PropTypes.bool,
  handleInputChange:PropTypes.func
};

EditItemComponent.defaultProps = {};

export default EditItemComponent;
