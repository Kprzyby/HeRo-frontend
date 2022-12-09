import React from 'react';
import PropTypes from 'prop-types';
import styles from './ShowRecruitmentDetailsComponent.module.css';
import recruitmentService from '../../services/recruitment.service';

class ShowRecruitmentDetailsComponent extends React.Component{
  constructor(props){
    super(props);

    this.state={
      id:-1,
      beginningDate:'',
      endingDate:'',
      name:'',
      describtion:'',
      position:'',
      localization:'',
      seniority:'',
      skills:[]
    };
    // {
    //   "beginningDate": "2022-12-05T22:10:31.168Z",
    //   "endingDate": "2022-12-05T22:10:31.168Z",
    //   "name": "string",
    //   "description": "string",
    //   "recruitmentPosition": "string",
    //   "localization": "string",
    //   "seniority": "string",
    //   "skills": [
    //     {
    //       "skillId": 0,
    //       "name": "string",
    //       "skillLevel": 0
    //     }
    //   ]
    // }
  }
  componentDidMount(){
    recruitmentService.getRecruitment(this.props.recruitmentId)
    .then(res=>{
      console.log(res);
      this.setState({
        id:res.id,
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

  render(){
    console.log(this.state);
    if(this.props.clickedId===this.props.recruitmentId){
      return(
        <div>
          <span></span>
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
