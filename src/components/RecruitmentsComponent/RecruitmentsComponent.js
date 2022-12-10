import React from 'react';
import PropTypes from 'prop-types';
import styles from './RecruitmentsComponent.module.css';
import recruitmentService from '../../services/recruitment.service';
import AddButtonsComponent from '../AddButtonsComponent/AddButtonsComponent';
import { BrowserRouter as Router, Switch, Route, Redirect,} from "react-router-dom";
import ShowRecruitmentComponent from '../ShowRecruitmentComponent/ShowRecruitmentComponent';
import ShowRecruitmentDetailsComponent from '../ShowRecruitmentDetailsComponent/ShowRecruitmentDetailsComponent';
import ManageFiltersComponent from '../ManageFiltersComponent/ManageFiltersComponent';
import { Button } from 'react-bootstrap';

class RecruitmentsComponent extends React.Component{
  constructor(props){
    super(props);

    this.state={
      recruitments:[],
      name: "",
      describtion: "",
      beginningDate: null,
      endingDate: null,
      showOpen: true,
      showClosed: false,
      pageNumber: 1,
      totalCount:0,
      lastPageNumber:0,
      clickedId:-1
    }

    this.showRecruitmentDetails=this.showRecruitmentDetails.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this);
    this.showNextPage=this.showNextPage.bind(this);
    this.showPreviousPage=this.showPreviousPage.bind(this);
    this.fetchRecruitments=this.fetchRecruitments.bind(this);
    this.updateRecruitment=this.updateRecruitment.bind(this);
    this.endRecruitment=this.endRecruitment.bind(this);
    this.deleteRecruitment=this.deleteRecruitment.bind(this);
  }
  componentDidMount(){
    this.fetchRecruitments();
  }
  fetchRecruitments(){
      recruitmentService.getRecruitments(this.getFilteringInfo())
      .then(res=>{
        console.log('----------------------------------------------------------------');
        console.log(res);
        this.setState({
          recruitments:res.recruitmentDTOs,
          totalCount:res.totalCount,
          lastPageNumber:Math.ceil(res.totalCount/5)
        })
      })
  }

  getFilteringInfo(){
    const filteringInfo={
      name:this.state.name,
      beginningDate:this.state.beginningDate,
      endingDate:this.state.endingDate,
      showOpen:this.state.showOpen,
      showClosed:this.state.showClosed,
      pageNumber:this.state.pageNumber,
    }

    return filteringInfo;
  }
  showRecruitmentDetails(e, id){
    this.setState({
      clickedId:id
    });
  }
  handleInputChange(e){
    console.log(this.state.name);
    const value=e.target.type==='checkbox'?e.target.checked:e.target.value;
    console.log(value);

    this.setState({
      [e.target.name]:value,
      pageNumber:1
    },()=>this.fetchRecruitments());
  }
  showNextPage(){
    this.setState((state)=>{
      return{
        pageNumber:state.pageNumber+1
      }
    },()=>this.fetchRecruitments());
  }
  showPreviousPage(){
    this.setState((state)=>{
      return{
        pageNumber:state.pageNumber-1
      }
    },()=>this.fetchRecruitments());
  }
  updateRecruitment(id){
    recruitmentService.getRecruitment(id)
      .then(res=>{
        const recruitments=this.state.recruitments.map(e=>{
          if(e.id===id){
            return res;
          }
          else{
            return e;
          }
        });

        this.setState({
          recruitments:recruitments
        })
      })
  }
  endRecruitment(id){
    recruitmentService.endRecruitment(id)
      .then(res=>{
        this.fetchRecruitments();
      })
  }
  deleteRecruitment(id){
    recruitmentService.deleteRecruitment(id)
      .then(res=>{
        this.fetchRecruitments();

        this.setState({
          clickedId:-1
        });
      })
  }

  render(){
    return(
      <div className={styles.RecruitmentsComponent}>
        <AddButtonsComponent></AddButtonsComponent><br></br>
        <ManageFiltersComponent handleInputChange={this.handleInputChange}></ManageFiltersComponent><br></br>
        {this.state.recruitments.map(e=>{
          return(
            <div key={e.id} onClick={f=>this.showRecruitmentDetails(f, e.id)}>
              <ShowRecruitmentComponent
                beginningDate={e.beginningDate}
                endingDate={e.endingDate}
                name={e.name}
                localization={e.localization}
                seniority={e.seniority}
                endedDate={e.endedDate}
              ></ShowRecruitmentComponent>
              <ShowRecruitmentDetailsComponent deleteRecruitment={this.deleteRecruitment} endRecruitment={this.endRecruitment} updateRecruitment={this.updateRecruitment} clickedId={this.state.clickedId} recruitmentId={e.id}></ShowRecruitmentDetailsComponent>
            </div>
          )
          })}
          {this.state.pageNumber===1
          ?<Button className={styles.leftArrow} disabled>&#10094;&#9866;</Button>
          :<Button className={styles.leftArrow} onClick={this.showPreviousPage}>&#10094;&#9866;</Button>}
          <span> Page {this.state.pageNumber} out of {this.state.lastPageNumber} </span>
          {this.state.pageNumber===this.state.lastPageNumber
          ?<Button className={styles.rightArrow} disabled>&#9866;&#10095;</Button>
          :<Button className={styles.rightArrow} onClick={this.showNextPage}>&#9866;&#10095;</Button>}
      </div>
    )
  }
}

RecruitmentsComponent.propTypes = {};

RecruitmentsComponent.defaultProps = {};

export default RecruitmentsComponent;
