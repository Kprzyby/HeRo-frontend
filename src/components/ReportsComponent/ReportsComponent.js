import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReportsComponent.module.css';
import reportService from '../../services/reports.service';

class ReportsComponent extends React.Component{
  constructor(props){
    super(props);

    this.state={
      popularRecruitments:[],
      requestedSkills:[]
    }
  }
  componentDidMount(){
    reportService.getPopularRecruitments()
      .then(res=>{
        this.setState({
          popularRecruitments:res
        });
      });

    reportService.getRequestedSkills()
      .then(res=>{
        this.setState({
          requestedSkills:res
        });
      });
  }

  render(){
    return(
      <div className={styles.ReportsComponent}>
        <div className={styles.report}>
          <h3>Most popular recruitments</h3><br></br>
          <ol className={styles.orderedList}>
            {this.state.popularRecruitments.map(e=><li className={styles.listElement} key={e.recruitmentId}>{e.recruitmentName} - number of candidates: {e.numberOfCandidate}</li>)}
          </ol>
        </div>
        <div className={styles.report}>
          <h3>Most requested skills</h3><br></br>
          <ol className={styles.orderedList}>
            {this.state.requestedSkills.map(e=><li className={styles.listElement} key={e.skillId}>{e.skillName} - used {e.quantity} times</li>)}
          </ol>
        </div>
      </div>
    )
  }
}

ReportsComponent.propTypes = {};

ReportsComponent.defaultProps = {};

export default ReportsComponent;
