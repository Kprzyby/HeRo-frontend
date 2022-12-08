import React from 'react';
import PropTypes from 'prop-types';
import styles from './CreateRecruitmentComponent.module.css';
import recruitmentService from '../../services/recruitment.service';
import ManageSkillsComponent from '../ManageSkillsComponent/ManageSkillsComponent';
import userService from '../../services/user.service';

class CreateRecruitmentComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      begginingDate:new Date(),
      endingDate:new Date(),
      name:'',
      description:'',
      recruitmentPosition:'',
      localization:'',
      seniority:'junior',
      recruiterId:-1,
      recruiters:[]
    }

    this.handleInputChange=this.handleInputChange.bind(this);
    this.submitForm=this.submitForm.bind(this);
  }
  componentDidMount(){
    userService.getRecruiters()
    .then(res=>{
      console.log(res);
      this.setState({
        recruiters:res
      });
    });
  }

  handleInputChange(e){
    const name=e.target.name;
    const value=e.target.value;

    this.setState({
      [name]:value
    });
  }
  submitForm(e, skills){
    skills=skills.map(f=>{
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

  render(){
    return(
      <form onSubmit={this.submitForm}>
        <label htmlFor='begginingDate'>Starting date</label><br></br>
        <input type='date' id='begginingDate' name='begginingDate' value={this.state.begginingDate} onChange={this.handleInputChange}></input>
        <br></br><br></br>

        <label htmlFor='endingDate'>Ending date</label><br></br>
        <input type='date' id='endingDate' name='endingDate' value={this.state.endingDate} onChange={this.handleInputChange}></input>
        <br></br><br></br>

        <label htmlFor='name'>Name</label><br></br>
        <input type='text' id='name' name='name' value={this.state.name} onChange={this.handleInputChange}></input>
        <br></br><br></br>

        <label htmlFor='description'>Job describtion</label><br></br>
        <textarea id='description' name='description' onChange={this.handleInputChange}></textarea>
        <br></br><br></br>

        <label htmlFor='recruitmentPosition'>Position</label><br></br>
        <input type='text' id='recruitmentPosition' name='recruitmentPosition' value={this.state.recruitmentPosition} onChange={this.handleInputChange}></input>
        <br></br><br></br>

        <label htmlFor='localization'>Localization</label><br></br>
        <input type='text' id='localization' name='localization' value={this.state.localization} onChange={this.handleInputChange}></input>
        <br></br><br></br>

        <label htmlFor='seniority'>Seniority</label><br></br>
        <select id='seniority' name='seniority' value={this.state.seniority} onChange={this.handleInputChange}>
          <option value='junior'>junior</option>
          <option value='junior/mid'>junior/mid</option>
          <option value='mid'>mid</option>
          <option value='mid/senior'>mid/senior</option>
          <option value='senior'>senior</option>
        </select>
        <br></br><br></br>

        <label htmlFor='recruiter'>Assing a recruiter from the list</label><br></br>
        <select id='recruiter' name='recruiterId' onChange={this.handleInputChange}>
          {this.state.recruiters.map(e=><option key={e.id} value={e.id}>{e.fullName}</option>)}
        </select>
        <br></br><br></br>

        <ManageSkillsComponent submitFunction={this.submitForm}></ManageSkillsComponent>
      </form>
    );
  }
}

CreateRecruitmentComponent.propTypes = {};

CreateRecruitmentComponent.defaultProps = {};

export default CreateRecruitmentComponent;
