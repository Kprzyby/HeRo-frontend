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
      editClicked:false
    };

    this.handleInputChange=this.handleInputChange.bind(this);
    this.changeSkills=this.changeSkills.bind(this);
    this.setEditClicked=this.setEditClicked.bind(this);
  }
  componentDidMount(){
    recruitmentService.getRecruitment(this.props.recruitmentId)
    .then(res=>{
      console.log(res);
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
        skills:res.skills  
      });
    });
  }

  handleInputChange(e){

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

  render(){
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
            <button className='btn btn-warning'>
              <XLg></XLg>&nbsp;
              End
            </button>
            <button className='btn btn-danger'>
              <Trash></Trash>&nbsp;
              Delete
            </button>
          </div>
          :<span></span>}
          <form>
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
              <EditItemComponent editClicked={this.state.editClicked} name='recruiterId' type='select' value={this.state.recruiterId} handleInputChange={this.handleInputChange}></EditItemComponent>
            </div>
            :<p></p>}

            <label htmlFor='localization'>Localization:</label>
            <EditItemComponent editClicked={this.state.editClicked} name='localization' type='text' value={this.state.localization} handleInputChange={this.handleInputChange}></EditItemComponent>

            {this.state.editClicked?
            <ManageSkillsComponent skillsUsed={this.state.skills} changeSkills={this.changeSkills}></ManageSkillsComponent>
            :<div>
              <label htmlFor='skills'>Skills required:</label>
              <ul>
                {this.state.skills.map(e=><li key={e.skillId}>
                  {e.name}&nbsp;
                  <Rating value={e.skillLevel}></Rating>
                </li>)}
              </ul>
            </div>}
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
  recruitmentId:PropTypes.number
};

ShowRecruitmentDetailsComponent.defaultProps = {};

export default ShowRecruitmentDetailsComponent;
