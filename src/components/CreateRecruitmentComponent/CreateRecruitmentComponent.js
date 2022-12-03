import React from 'react';
import PropTypes from 'prop-types';
import styles from './CreateRecruitmentComponent.module.css';
import recruitmentService from '../../services/recruitment.service';

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
      skills:[]
    }

    this.handleInputChange=this.handleInputChange.bind(this);
    this.submitForm=this.submitForm.bind(this);
  }

  handleInputChange(e){
    const name=e.target.name;
    const value=e.target.value;

    this.setState({
      [name]:value
    });
  }
  submitForm(e){
    e.preventDefault();

    const newRecruitment={
      beginningDate: this.state.begginingDate,
      endingDate: this.state.endingDate,
      name: this.state.name,
      description: this.state.description,
      recruiterId: 2,
      recruitmentPosition: this.state.recruitmentPosition,
      localization: this.state.localization,
      seniority: this.state.seniority,
      skills: this.state.skills
    };

    recruitmentService.createRecruitment(newRecruitment)
    .then(res=>console.log(res));
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

        <label htmlFor='describtion'>Job describtion</label><br></br>
        <input type='textarea' id='describtion' name='describtion' value={this.state.description} onChange={this.handleInputChange}></input>
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

        <label htmlFor='skills'>Skills</label>
      </form>
    );
  }
}

CreateRecruitmentComponent.propTypes = {};

CreateRecruitmentComponent.defaultProps = {};

export default CreateRecruitmentComponent;
