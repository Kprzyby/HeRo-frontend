import React from 'react';
import PropTypes from 'prop-types';
import styles from './RecruitmentsComponent.module.css';
import recruitmentService from '../../services/recruitment.service';

class RecruitmentsComponent extends React.Component{
  constructor(props){
    super(props);

    this.state={
      recruitments:[]
    }
  }
  componentDidMount(){
    const filteringInfo={
      "name": "Rec",
      "description": "describtion",
      "showOpen": true,
      "showClosed": true,
      "beginningDate": "2022-12-03T18:30:14.849Z",
      "endingDate": "2022-12-03T18:52:14.849Z",
      "pageNumber": 1,
      "sortOrder": "ASC"
    }
    const newRecruitmentInfo={
      beginningDate: "2022-12-03T18:30:14.849Z",
      endingDate: "2022-12-03T18:30:14.849Z",
      name: "Rec",
      description: "describtion",
      recruiterId: 2,
      recruitmentPosition: 'dev',
      localization: 'bia',
      seniority: 'junior',
      skills: [
      {
        skillId:13,
        skillLevel:2
      },
      {
        skillId:11,
        skillLevel:5
      }]
  };
  const recruitment={
    id:370,
    beginningDate: "2022-12-03T18:30:14.849Z",
    endingDate: "2022-12-03T18:30:14.849Z",
    name: "Rec2",
    description: "describtion2",
    recruiterId: 2,
    recruitmentPosition: 'dev2',
    localization: 'bia2',
    seniority: 'mid',
    skills: [
      {
        skillId:13,
        skillLevel:2
      },
      {
        skillId:11,
        skillLevel:4
      }]
  };

    recruitmentService.editRecruitment(recruitment)
    .then(res=>console.log(res));
  }

  render(){
    return(
      <p>Henlo</p>
    )
  }
}

RecruitmentsComponent.propTypes = {};

RecruitmentsComponent.defaultProps = {};

export default RecruitmentsComponent;
