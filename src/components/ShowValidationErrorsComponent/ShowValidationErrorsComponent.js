import React from 'react';
import PropTypes from 'prop-types';
import styles from './ShowValidationErrorsComponent.module.css';

const ShowValidationErrorsComponent = (props) => (
  <div className={styles.ShowValidationErrorsComponent}>
    {
      props.errorMessages.map(e=><p className={styles.error} key={e.id}>{e.message}</p>)
    }
  </div>
);

ShowValidationErrorsComponent.propTypes = {
  errorMessages:PropTypes.arrayOf(PropTypes.object)
};

ShowValidationErrorsComponent.defaultProps = {};

export default ShowValidationErrorsComponent;