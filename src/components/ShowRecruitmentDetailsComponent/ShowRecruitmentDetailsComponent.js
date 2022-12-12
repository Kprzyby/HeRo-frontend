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
import * as yup from 'yup';
import ShowValidationErrorsComponent from '../ShowValidationErrorsComponent/ShowValidationErrorsComponent';

const formSchema=yup.object().shape({
  name:yup.string().required('This field is required'),
  describtion:yup.string().required('This field is required'),
  position:yup.string().required('This field is required'),
  localization:yup.string().required('This field is required'),
  beginningDate:yup.date().typeError('This field is required').required('This field is required'),
  endingDate:yup.date().typeError('This field is required').required('This field is required'),
  recruiterId:yup.number().required('This field is required'),
  seniority:yup.string().required('This field is required'),
  skills:yup.array().of(
    yup.object({
      skillLevel:yup.number().typeError('You have to rate all the skills')
    })
  ).min(1, 'You have to specify at least one skill')
});

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

      beginningDateErrors:[],
      endingDateErrors:[],
      nameErrors:[],
      describtionErrors:[],
      positionErrors:[],
      recruiterIdErrors:[],
      seniorityErrors:[],
      localizationErrors:[],
      skillsErrors:[],
      isFormValid:false,

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

  async handleInputChange(e){
    const name=e.target.name;
    const value=e.target.value;

    let errors=[];

    await yup.reach(formSchema, name).validate(value)
      .catch(err=>{

        const error={
          id:0,
          message:err.message
        };

        errors.push(error);
    });

    this.setState({
      [name]:value,
      [name+'Errors']:errors,
    });
  }
  
  async changeSkills(skills){
    let errors=[];

    await yup.reach(formSchema, 'skills').validate(skills)
    .catch(err=>{
      
      const error={
        id:0,
        message:err.message
      };

      errors.push(error);
    });

    this.setState({
      skillsErrors:errors,
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
  async editRecruitment(e){
    e.preventDefault();

    const isFormValid=await this.validateForm();

    if(isFormValid){

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
  }

  async validateForm(){
    const beginningDateErrors=[];
    const endingDateErrors=[];
    const nameErrors=[];
    const describtionErrors=[];
    const positionErrors=[];
    const recruiterIdErrors=[];
    const seniorityErrors=[];
    const localizationErrors=[];
    const skillsErrors=[];
    
    let isFormValid=true;

    await formSchema.validate({
      beginningDate:this.state.beginningDate,
      endingDate:this.state.endingDate,
      name:this.state.name,
      describtion:this.state.describtion,
      position:this.state.position,
      recruiterId:this.state.recruiterId,
      seniority:this.state.seniority,
      localization:this.state.localization,
      skills:this.state.skills,
    },{abortEarly:false})
    .catch(err=>{
      isFormValid=false;

      err.inner.forEach((f, index)=>{
        const errorMessage={
          id:index,
          message:f.message
        };
  
        if(f.path==='beginningDate'){
          beginningDateErrors.push(errorMessage);
        }
        else if(f.path==='endingDate'){
          endingDateErrors.push(errorMessage);
        }
        else if(f.path==='name'){
          nameErrors.push(errorMessage);
        }
        else if(f.path==='describtion'){
          describtionErrors.push(errorMessage);
        }
        else if(f.path==='position'){
          positionErrors.push(errorMessage);
        }
        else if(f.path==='localization'){
          localizationErrors.push(errorMessage);
        }
        else if(f.path==='recruiterId'){
          recruiterIdErrors.push(errorMessage);
        }
        else if(f.path==='seniority'){
          seniorityErrors.push(errorMessage);
        }
        else{
          skillsErrors.push(errorMessage);
        }
      });
  
      this.setState({
        beginningDateErrors:beginningDateErrors,
        endingDateErrors:endingDateErrors,
        nameErrors:nameErrors,
        describtionErrors:describtionErrors,
        positionErrors:positionErrors,
        localizationErrors:localizationErrors,
        recruiterIdErrors:recruiterIdErrors,
        seniorityErrors:seniorityErrors,
        skillsErrors:skillsErrors,
      });
    })

    return isFormValid;
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
            <ShowValidationErrorsComponent errorMessages={this.state.nameErrors}></ShowValidationErrorsComponent>

            <label htmlFor='describtion'>Job describtion:</label><br></br>
            <EditItemComponent editClicked={this.state.editClicked} name='describtion' type='textarea' value={this.state.describtion} handleInputChange={this.handleInputChange}></EditItemComponent>
            <ShowValidationErrorsComponent errorMessages={this.state.describtionErrors}></ShowValidationErrorsComponent>

            <label htmlFor='beginningDate'>Beginning date:</label>
            <EditItemComponent editClicked={this.state.editClicked} name='beginningDate' type='date' value={this.state.beginningDate} handleInputChange={this.handleInputChange}></EditItemComponent>
            <ShowValidationErrorsComponent errorMessages={this.state.beginningDateErrors}></ShowValidationErrorsComponent>

            <label htmlFor='endingDate'>Ending date:</label>
            <EditItemComponent editClicked={this.state.editClicked} name='endingDate' type='date' value={this.state.endingDate} handleInputChange={this.handleInputChange}></EditItemComponent>
            <ShowValidationErrorsComponent errorMessages={this.state.endingDateErrors}></ShowValidationErrorsComponent>

            <label htmlFor='position'>Position:</label>
            <EditItemComponent editClicked={this.state.editClicked} name='position' type='text' value={this.state.position} handleInputChange={this.handleInputChange}></EditItemComponent>
            <ShowValidationErrorsComponent errorMessages={this.state.positionErrors}></ShowValidationErrorsComponent>

            <label htmlFor='seniority'>Seniority:</label>
            <EditItemComponent editClicked={this.state.editClicked} name='seniority' type='select' value={this.state.seniority} handleInputChange={this.handleInputChange}></EditItemComponent>
            <ShowValidationErrorsComponent errorMessages={this.state.seniorityErrors}></ShowValidationErrorsComponent>

            {user?
            <div>
              <label htmlFor='recruiterId'>Assigned recruiter:</label>
              <EditItemComponent editClicked={this.state.editClicked} name='recruiterId' type='select' value={this.state.recruiterId} handleInputChange={this.handleInputChange} recruiters={this.state.recruiters}></EditItemComponent>
              <ShowValidationErrorsComponent errorMessages={this.state.recruiterIdErrors}></ShowValidationErrorsComponent>
            </div>
            :<p></p>}

            <label htmlFor='localization'>Localization:</label>
            <EditItemComponent editClicked={this.state.editClicked} name='localization' type='text' value={this.state.localization} handleInputChange={this.handleInputChange}></EditItemComponent>
            <ShowValidationErrorsComponent errorMessages={this.state.localizationErrors}></ShowValidationErrorsComponent>

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
            <ShowValidationErrorsComponent errorMessages={this.state.skillsErrors}></ShowValidationErrorsComponent>

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
