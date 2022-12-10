import React from 'react';
import PropTypes from 'prop-types';
import styles from './ShowRecruitmentDetailsComponent.module.css';
import recruitmentService from '../../services/recruitment.service';
import { PencilSquare } from 'react-bootstrap-icons';
import { XLg } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';
import userService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import EditItemComponent from '../EditItemComponent/EditItemComponent';
import ManageSkillsComponent from '../ManageSkillsComponent/ManageSkillsComponent';
import skillService from '../../services/skill.service';
import { Rating } from '@mui/material';
import { Button } from 'react-bootstrap';

class ShowRecruitmentDetailsComponent extends React.Component{
  constructor(props){
    super(props);

    this.state={
      id:-1,
      recruiterId:-1,
      beginningDate:'',
      endingDate:'',
      name:'',
      describtion:'',
      position:'',
      localization:'',
      seniority:'',
      skills:[],
      editClicked:false,
      endClicked:false,
      deleteClicked:false,
      recruiters:[]
    };

    this.handleInputChange=this.handleInputChange.bind(this);
    this.changeSkills=this.changeSkills.bind(this);
    this.setEditClicked=this.setEditClicked.bind(this);
    this.toggleEndClicked=this.toggleEndClicked.bind(this);
    this.toggleDeleteClicked=this.toggleDeleteClicked.bind(this);
    this.editRecruitment=this.editRecruitment.bind(this);
    this.endRecruitment=this.endRecruitment.bind(this);
    this.deleteRecruitment=this.deleteRecruitment.bind(this);
  }
  componentDidMount(){
    recruitmentService.getRecruitment(this.props.recruitmentId)
    .then(res=>{
      console.log(res);
      const skills=res.skills.map(e=>{
        return({
          id:e.skillId,
          name:e.name,
          skillLevel:e.skillLevel
        })
      })
      this.setState({
        id:res.id,
        recruiterId:res.recruiterId,
        beginningDate:res.beginningDate,
        endingDate:res.endingDate,
        name:res.name,
        describtion:res.description,
        position:res.recruitmentPosition,
        localization:res.localization,
        seniority:res.seniority,
        skills:skills
      });
    });

    userService.getRecruiters()
    .then(res=>{
      console.log(res);
      this.setState({
        recruiters:res
      });
    });
  }

  handleInputChange(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }
  changeSkills(skills){
    this.setState({
      skills:skills
    });
  }
  getUsedSkills(){
    return this.state.skills;
  }
  setEditClicked(e){
    e.stopPropagation();

    this.setState({
      editClicked:true
    });
  }
  toggleEndClicked(e){
    e.stopPropagation();

    this.setState((state)=>{
      return{
        endClicked:!state.endClicked
      }
    });
  }
  toggleDeleteClicked(e){
    e.stopPropagation();

    this.setState((state)=>{
      return{
        deleteClicked:!state.deleteClicked
      }
    });
  }
  editRecruitment(e){
    e.preventDefault();

    const skills=this.state.skills.map(e=>{
      return({
        skillId:e.id,
        skillLevel:e.skillLevel
      })
    })

    const recruitmentInfo={
      id:this.state.id,
      beginningDate: this.state.beginningDate,
      endingDate: this.state.endingDate,
      name: this.state.name,
      description: this.state.describtion,
      recruiterId: this.state.recruiterId,
      recruitmentPosition: this.state.position,
      localization: this.state.localization,
      seniority: this.state.seniority,
      skills: skills
    };

    recruitmentService.editRecruitment(recruitmentInfo)
      .then(res=>{
        recruitmentService.getRecruitment(this.props.recruitmentId)
        .then(res=>{
          console.log(res);
          const skills=res.skills.map(e=>{
            return({
              id:e.skillId,
              name:e.name,
              skillLevel:e.skillLevel
            })
          })

          this.setState({
            id:res.id,
            recruiterId:res.recruiterId,
            beginningDate:res.beginningDate,
            endingDate:res.endingDate,
            name:res.name,
            describtion:res.description,
            position:res.recruitmentPosition,
            localization:res.localization,
            seniority:res.seniority,
            skills:skills,
            editClicked:false 
          });
        });
      })

      this.props.updateRecruitment(this.state.id);
  }
  endRecruitment(e){
    this.toggleEndClicked(e);

    this.props.endRecruitment(this.state.id);
  }
  deleteRecruitment(e){
    this.toggleDeleteClicked(e);

    this.props.deleteRecruitment(this.state.id);
  }

  render(){
    console.log(this.state.skills);
    const user=AuthService.getCurrentUser();

    if(this.props.clickedId===this.props.recruitmentId){
      return(
        <div className={styles.ShowRecruitmentDetailsComponent}>
          {user?
          <div className='btn-group' role='group'>
            <button className='btn btn-success' onClick={this.setEditClicked}>
              <PencilSquare></PencilSquare>&nbsp;
              Edit
            </button>
            <button className='btn btn-warning' onClick={this.toggleEndClicked}>
              <XLg></XLg>&nbsp;
              End
            </button>
            <button className='btn btn-danger' onClick={this.toggleDeleteClicked}>
              <Trash></Trash>&nbsp;
              Delete
            </button>
          </div>
          :<span></span>}<br></br><br></br>

          {this.state.endClicked?
            <div>
              <span>Are you sure you want to end the recruitment?</span><br></br>
              <button className='btn btn-danger' onClick={this.toggleEndClicked}>No</button>&nbsp;
              <button className='btn btn-success' onClick={this.endRecruitment}>Yes</button>
            </div>
          :<span></span>}

          {this.state.deleteClicked?
            <div>
              <span>Are you sure you want to delete the recruitment?</span><br></br>
              <button className='btn btn-danger' onClick={this.toggleDeleteClicked}>No</button>&nbsp;
              <button className='btn btn-success' onClick={this.deleteRecruitment}>Yes</button>
            </div>
          :<span></span>}

          <form onSubmit={this.editRecruitment}>
            <label htmlFor='name'>Name:</label>
            <EditItemComponent editClicked={this.state.editClicked} name='name' type='text' value={this.state.name} handleInputChange={this.handleInputChange}></EditItemComponent>

            <label htmlFor='describtion'>Job describtion:</label><br></br>
            <EditItemComponent editClicked={this.state.editClicked} name='describtion' type='textarea' value={this.state.describtion} handleInputChange={this.handleInputChange}></EditItemComponent>

            <label htmlFor='beginningDate'>Beginning date:</label>
            <EditItemComponent editClicked={this.state.editClicked} name='beginningDate' type='date' value={this.state.beginningDate} handleInputChange={this.handleInputChange}></EditItemComponent>

            <label htmlFor='endingDate'>Ending date:</label>
            <EditItemComponent editClicked={this.state.editClicked} name='endingDate' type='date' value={this.state.endingDate} handleInputChange={this.handleInputChange}></EditItemComponent>

            <label htmlFor='position'>Position:</label>
            <EditItemComponent editClicked={this.state.editClicked} name='position' type='text' value={this.state.position} handleInputChange={this.handleInputChange}></EditItemComponent>

            <label htmlFor='seniority'>Seniority:</label>
            <EditItemComponent editClicked={this.state.editClicked} name='seniority' type='select' value={this.state.seniority} handleInputChange={this.handleInputChange}></EditItemComponent>

            {user?
            <div>
              <label htmlFor='recruiterId'>Assigned recruiter:</label>
              <EditItemComponent editClicked={this.state.editClicked} name='recruiterId' type='select' value={this.state.recruiterId} handleInputChange={this.handleInputChange} recruiters={this.state.recruiters}></EditItemComponent>
            </div>
            :<p></p>}

            <label htmlFor='localization'>Localization:</label>
            <EditItemComponent editClicked={this.state.editClicked} name='localization' type='text' value={this.state.localization} handleInputChange={this.handleInputChange}></EditItemComponent>

            {this.state.editClicked?
            <ManageSkillsComponent skillsUsed={this.state.skills} changeSkills={this.changeSkills}></ManageSkillsComponent>
            :<div>
              <label htmlFor='skills'>Skills required:</label>
              <ul>
                {this.state.skills.map(e=><li key={e.id}>
                  {e.name}&nbsp;
                  <Rating value={e.skillLevel} readOnly></Rating>
                </li>)}
              </ul>
            </div>}

            {this.state.editClicked?
            <Button type='submit' variant='primary'>Done!</Button>
            :<span></span>}
          </form>
        </div>
      );
    }
    else{
      return <span></span>;
    }
  }
}

ShowRecruitmentDetailsComponent.propTypes = {
  clickedId:PropTypes.number,
  recruitmentId:PropTypes.number,
  updateRecruitment:PropTypes.func,
  deleteRecruitment:PropTypes.func,
  endRecruitment:PropTypes.func
};

ShowRecruitmentDetailsComponent.defaultProps = {};

export default ShowRecruitmentDetailsComponent;
