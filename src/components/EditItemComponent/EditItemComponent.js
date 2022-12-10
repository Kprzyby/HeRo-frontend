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
      return(
        <div>
          <input type='text' id={props.name} name={props.name} value={props.value} onChange={e=>props.handleInputChange(e)}></input>
          <br></br>
        </div>)
    }
    if(props.type==='date'){
      return(
      <div>
        <input type='datetime-local' id={props.name} name={props.name} value={props.value} onChange={e=>props.handleInputChange(e)}></input>
        <br></br>
      </div>)   
    }
    if(props.type==='select' && props.name==='recruiterId'){         
        return(
          <div>
            <select id={props.name} name={props.name} value={props.value} onChange={e=>props.handleInputChange(e)}>
              {props.recruiters.map(e=><option key={e.id} value={e.id}>{e.fullName}</option>)}
            </select>
            <br></br>
          </div>
        )
      }
    if(props.type==='select' && props.name==='seniority'){
      return(
        <div>
          <select id={props.name} name={props.name} value={props.value} onChange={e=>props.handleInputChange(e)}>
            <option value='junior'>junior</option>
            <option value='junior/mid'>junior/mid</option>
            <option value='mid'>mid</option>
            <option value='mid/senior'>mid/senior</option>
            <option value='senior'>senior</option>
          </select>
          <br></br>
        </div>
      )
    }
    if(props.type==='textarea'){
      return(
      <div>
        <textarea id={props.name} defaultValue={props.value} name={props.name} onChange={e=>props.handleInputChange(e)}></textarea>
        <br></br>
      </div>)
    }
  }
};

EditItemComponent.propTypes = {
  type:PropTypes.string,
  name:PropTypes.string,
  value:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  editClicked:PropTypes.bool,
  handleInputChange:PropTypes.func,
  recruiters:PropTypes.array
};

EditItemComponent.defaultProps = {};

export default EditItemComponent;
