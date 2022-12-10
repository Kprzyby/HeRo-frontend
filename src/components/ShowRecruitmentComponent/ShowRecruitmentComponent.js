import React from 'react';
import PropTypes from 'prop-types';
import styles from './ShowRecruitmentComponent.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom';

function ShowRecruitmentComponent(props){
  const timeLeft=Math.floor((Date.parse(props.endingDate)-new Date()) / (1000*60*60*24));

  return(
    <div className={styles.ShowRecruitmentComponent}>
      <div className={styles.positioningContext}>
      <Link className='btn btn-primary' style={{position:'absolute', top:0, right:0}} to={""}>Apply</Link>
        <br></br><br></br>
        <span className={styles.title}>{props.name} &#40;{props.seniority}&#41;</span>
        {props.endedDate===null?
        <span className={styles.expiryDate}>{timeLeft}d left</span>
        :<span className={styles.expiryDate}>Closed</span>}<br></br>
        <p>Localization - {props.localization}</p>
      </div>
    </div>
  );
}

ShowRecruitmentComponent.propTypes = {
  beginningDate:PropTypes.string,
  endingDate:PropTypes.string,
  name:PropTypes.string,
  localization:PropTypes.string,
  seniority:PropTypes.string,
  endedDate:PropTypes.string,
};

ShowRecruitmentComponent.defaultProps = {};

export default ShowRecruitmentComponent;
