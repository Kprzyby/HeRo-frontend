import React from 'react';
import PropTypes from 'prop-types';
import styles from './CreateRecruitmentComponent.module.css';
import recruitmentService from '../../services/recruitment.service';
import ManageSkillsComponent from '../ManageSkillsComponent/ManageSkillsComponent';
import userService from '../../services/user.service';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from 'yup';
import ShowValidationErrorsComponent from '../ShowValidationErrorsComponent/ShowValidationErrorsComponent';

const formSchema=yup.object().shape({
  name:yup.string().required('This field is required'),
  description:yup.string().required('This field is required'),
  recruitmentPosition:yup.string().required('This field is required'),
  localization:yup.string().required('This field is required'),
  begginingDate:yup.date().typeError('This field is required').required('This field is required'),
  endingDate:yup.date().typeError('This field is required').required('This field is required'),
  recruiterId:yup.number().required('This field is required'),
  seniority:yup.string().required('This field is required'),
  skills:yup.array().of(
    yup.object({
      skillLevel:yup.number().typeError('You have to rate all the skills')
    })
  ).min(1, 'You have to specify at least one skill')
});

class CreateRecruitmentComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      begginingDate:'',
      endingDate:'',
      name:'',
      description:'',
      recruitmentPosition:'',
      localization:'',
      seniority:'junior',
      recruiterId:-1,
      recruiters:[],
      skills:[],

      begginingDateErrors:[],
      endingDateErrors:[],
      nameErrors:[],
      descriptionErrors:[],
      recruitmentPositionErrors:[],
      seniorityErrors:[],
      recruiterIdErrors:[],
      localizationErrors:[],
      skillsErrors:[],
      isFormValid:false
    }

    this.handleInputChange=this.handleInputChange.bind(this);
    this.submitForm=this.submitForm.bind(this);
    this.changeSkills=this.changeSkills.bind(this);
    this.validateForm=this.validateForm.bind(this);
  }
  componentDidMount(){
    userService.getRecruiters()
    .then(res=>{
      console.log(res);
      console.log(res[0].id)
      this.setState({
        recruiters:res,
        recruiterId:res[0].id
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
    },async()=>{
      const isFormValid=await this.validateForm();

      this.setState({
        isFormValid:isFormValid
      })
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
    },async()=>{
      const isFormValid=await this.validateForm();

      this.setState({
        isFormValid:isFormValid
      })
    });
  }

  async submitForm(e){
      const skills=this.state.skills.map(f=>{
        return {
          skillId:f.id,
          skillLevel:f.skillLevel
        }
      });

      const newRecruitment={
        beginningDate: this.state.begginingDate,
        endingDate: this.state.endingDate,
        name: this.state.name,
        description: this.state.description,
        recruitmentPosition: this.state.recruitmentPosition,
        localization: this.state.localization,
        seniority: this.state.seniority,
        recruiterId:this.state.recruiterId,
        skills: skills
      };

      recruitmentService.createRecruitment(newRecruitment)
        .then(res=>{console.log(res)});
  }

  async validateForm(e){
    if(e){
      e.preventDefault();
    }

    const begginingDateErrors=[];
    const endingDateErrors=[];
    const nameErrors=[];
    const descriptionErrors=[];
    const recruitmentPositionErrors=[];
    const recruiterIdErrors=[];
    const seniorityErrors=[];
    const localizationErrors=[];
    const skillsErrors=[];
    
    let isFormValid=true;

    await formSchema.validate({
      begginingDate:this.state.begginingDate,
      endingDate:this.state.endingDate,
      name:this.state.name,
      description:this.state.description,
      recruitmentPosition:this.state.recruitmentPosition,
      recruiterId:this.state.recruiterId,
      seniority:this.state.seniority,
      localization:this.state.localization,
      skills:this.state.skills,
    },{abortEarly:false})
    .catch(err=>{
      isFormValid=false;

      if(e){
        err.inner.forEach((f, index)=>{
          const errorMessage={
            id:index,
            message:f.message
          };
  
          if(f.path==='begginingDate'){
            begginingDateErrors.push(errorMessage);
          }
          else if(f.path==='endingDate'){
            endingDateErrors.push(errorMessage);
          }
          else if(f.path==='name'){
            nameErrors.push(errorMessage);
          }
          else if(f.path==='description'){
            descriptionErrors.push(errorMessage);
          }
          else if(f.path==='recruitmentPosition'){
            recruitmentPositionErrors.push(errorMessage);
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
          begginingDateErrors:begginingDateErrors,
          endingDateErrors:endingDateErrors,
          nameErrors:nameErrors,
          descriptionErrors:descriptionErrors,
          recruitmentPositionErrors:recruitmentPositionErrors,
          localizationErrors:localizationErrors,
          recruiterIdErrors:recruiterIdErrors,
          seniorityErrors:seniorityErrors,
          skillsErrors:skillsErrors,
          isFormValid:isFormValid
        });
      }
    })

    return isFormValid;
  }

  render(){
    console.log(this.state.isFormValid)
    return(
      <form onSubmit={this.submitForm}>
        <label htmlFor='begginingDate'>Starting date</label><br></br>
        <input type='date' id='begginingDate' name='begginingDate' value={this.state.begginingDate} onChange={this.handleInputChange}></input>
        <ShowValidationErrorsComponent errorMessages={this.state.begginingDateErrors}></ShowValidationErrorsComponent>
        <br></br><br></br>

        <label htmlFor='endingDate'>Ending date</label><br></br>
        <input type='date' id='endingDate' name='endingDate' value={this.state.endingDate} onChange={this.handleInputChange}></input>
        <ShowValidationErrorsComponent errorMessages={this.state.endingDateErrors}></ShowValidationErrorsComponent>
        <br></br><br></br>

        <label htmlFor='name'>Name</label><br></br>
        <input type='text' id='name' name='name' value={this.state.name} onChange={this.handleInputChange}></input>
        <ShowValidationErrorsComponent errorMessages={this.state.nameErrors}></ShowValidationErrorsComponent>
        <br></br><br></br>

        <label htmlFor='description'>Job describtion</label><br></br>
        <textarea id='description' name='description' onChange={this.handleInputChange}></textarea>
        <ShowValidationErrorsComponent errorMessages={this.state.descriptionErrors}></ShowValidationErrorsComponent>
        <br></br><br></br>

        <label htmlFor='recruitmentPosition'>Position</label><br></br>
        <input type='text' id='recruitmentPosition' name='recruitmentPosition' value={this.state.recruitmentPosition} onChange={this.handleInputChange}></input>
        <ShowValidationErrorsComponent errorMessages={this.state.recruitmentPositionErrors}></ShowValidationErrorsComponent>
        <br></br><br></br>

        <label htmlFor='localization'>Localization</label><br></br>
        <input type='text' id='localization' name='localization' value={this.state.localization} onChange={this.handleInputChange}></input>
        <ShowValidationErrorsComponent errorMessages={this.state.localizationErrors}></ShowValidationErrorsComponent>
        <br></br><br></br>

        <label htmlFor='seniority'>Seniority</label><br></br>
        <select id='seniority' name='seniority' value={this.state.seniority} onChange={this.handleInputChange}>
          <option value='junior'>junior</option>
          <option value='junior/mid'>junior/mid</option>
          <option value='mid'>mid</option>
          <option value='mid/senior'>mid/senior</option>
          <option value='senior'>senior</option>
        </select>
        <ShowValidationErrorsComponent errorMessages={this.state.seniorityErrors}></ShowValidationErrorsComponent>
        <br></br><br></br>

        <label htmlFor='recruiter'>Assing a recruiter from the list</label><br></br>
        <select id='recruiter' name='recruiterId' onChange={this.handleInputChange}>
          {this.state.recruiters.map(e=><option key={e.id} value={e.id}>{e.fullName}</option>)}
        </select>
        <ShowValidationErrorsComponent errorMessages={this.state.recruiterIdErrors}></ShowValidationErrorsComponent>
        <br></br><br></br>

        <ManageSkillsComponent changeSkills={this.changeSkills}></ManageSkillsComponent>
        <ShowValidationErrorsComponent errorMessages={this.state.skillsErrors}></ShowValidationErrorsComponent>

        {this.state.isFormValid?
        <Link className='btn btn-primary' to={"/recruitments"} onClick={this.submitForm}>Done!</Link>
        :<button className='btn btn-primary'onClick={this.validateForm}>Done!</button>}
      </form>
    );
  }
}

CreateRecruitmentComponent.propTypes = {};

CreateRecruitmentComponent.defaultProps = {};

export default CreateRecruitmentComponent;
