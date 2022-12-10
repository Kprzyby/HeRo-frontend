import React, { startTransition } from 'react';
import PropTypes from 'prop-types';
import styles from './ManageSkillsComponent.module.css';
import skillService from '../../services/skill.service';
import {StarFill} from 'react-bootstrap-icons'
import {XLg} from 'react-bootstrap-icons'
import { Rating } from '@mui/material';
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

class ManageSkillsComponent extends React.Component{
  constructor(props){
    super(props);

    this.state={
      skillsAvailable:[],
      skillsUsed:props.skillsUsed
    }

    this.addSkillToUsed=this.addSkillToUsed.bind(this);
    this.deleteSkillFromUsed=this.deleteSkillFromUsed.bind(this);
    this.setSkillRating=this.setSkillRating.bind(this);
  }
  componentDidMount(){
    if(this.props.skillsUsed!=[]){
      skillService.getSkills()
      .then(res=>{
        let skillsAvailable=res.filter(e=>!this.props.skillsUsed.some(f=>f.id===e.id));

        this.setState({
          skillsAvailable:skillsAvailable
        });
      });
    }
    else{ 
      skillService.getSkills()
      .then(res=>{
        this.setState({
          skillsAvailable:res
        });
      });
    }
  }

  addSkillToUsed(e){
    console.log(e.target.value);
    const value=JSON.parse(e.target.value);

    const skillsUsed=this.state.skillsUsed;
    skillsUsed.push({
      id:value.id,
      name:value.name,
      skillLevel:null
    });

    const skillsAvailable=this.state.skillsAvailable.filter(f=>f.id!==value.id);

    this.setState({
      skillsUsed:skillsUsed,
      skillsAvailable:skillsAvailable
    });
  }
  deleteSkillFromUsed(e, skill){
    const value=JSON.parse(skill);
    const skillsUsed=this.state.skillsUsed.filter(e=>e.id!==value.id);
    const skillsAvailable=this.state.skillsAvailable;
    skillsAvailable.push(value);

    this.setState({
      skillsUsed:skillsUsed,
      skillsAvailable:skillsAvailable
    });
  }
  setSkillRating(e, id, newValue){
    console.log(newValue);
    const skillsUsed=this.state.skillsUsed.map(f=>{
      if(f.id===id){
        return {
          id:f.id,
          name:f.name,
          skillLevel:newValue
        };
      }
      else{
        return f;
      }
    });

    this.setState({
      skillsUsed:skillsUsed
    },
    ()=>this.props.changeSkills(this.state.skillsUsed));
  }

  render(){
    console.log(this.state.skillsUsed)
    return(
      <div>
        <label htmlFor='skills'>Choose the requirements from the list:</label><br></br>
        <select id='skills' value='Requirements' onChange={this.addSkillToUsed}>
          <option key={-1} disabled value='Requirements'>Requirements</option>
          {this.state.skillsAvailable.map(e=><option key={e.id} value={JSON.stringify(e)}>{e.name}</option>)}
        </select><br></br><br></br>

        {this.state.skillsUsed.map(e=>{
          return(
            <div id={e.id} key={e.id}>
              <span>{e.name} </span>
              <Rating value={this.state.skillsUsed.find(g=>g.id===e.id).skillLevel} onChange={(f, newValue) => {this.setSkillRating(f, e.id, newValue)}}/>&nbsp;
              <XLg className={styles.cross} onClick={f=>this.deleteSkillFromUsed(f, JSON.stringify(e))}></XLg>
            </div>
          );
        })}<br></br>
      </div>
    )
  }
}

ManageSkillsComponent.propTypes = {
  changeSkills:PropTypes.func,
  skillsUsed:PropTypes.array
};

ManageSkillsComponent.defaultProps = {
  skillsUsed:[]
};

export default ManageSkillsComponent;
