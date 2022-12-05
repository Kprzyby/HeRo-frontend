import React from 'react';
import PropTypes from 'prop-types';
import styles from './RecruitmentsComponent.module.css';
import recruitmentService from '../../services/recruitment.service';
import AddButtonsComponent from '../AddButtonsComponent/AddButtonsComponent';
import { BrowserRouter as Router, Switch, Route, Redirect,} from "react-router-dom";
import ShowRecruitmentComponent from '../ShowRecruitmentComponent/ShowRecruitmentComponent';

class RecruitmentsComponent extends React.Component{
  constructor(props){
    super(props);

    this.state={
      recruitments:[],
      filteringInfo:{
        name: "",
        description: "",
        showOpen: true,
        showClosed: false,
        beginningDate: null,
        endingDate: null,
        pageNumber: 1,
        sortOrder: "ASC"
      }
    }
  }
  componentDidMount(){
    recruitmentService.getRecruitments(this.state.filteringInfo)
    .then(res=>{
      console.log(res);
      this.setState({
        recruitments:res.recruitmentDTOs
      })
    })
  }

  render(){
    console.log(this.state.recruitments);
    return(
      <div className={styles.RecruitmentsComponent}>
        <AddButtonsComponent></AddButtonsComponent><br></br>
        {this.state.recruitments.map(e=>{
          return(
            <ShowRecruitmentComponent
            beginningDate={e.beginningDate}
            endingDate={e.endingDate}
            name={e.name}
            localization={e.localization}
            seniority={e.seniority}
            key={e.id}
            ></ShowRecruitmentComponent>
          )
          })}
      </div>
    )
  }
}

RecruitmentsComponent.propTypes = {};

RecruitmentsComponent.defaultProps = {};

export default RecruitmentsComponent;
