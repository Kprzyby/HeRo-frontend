import React from 'react';
import PropTypes from 'prop-types';

function SmptComponent(props) {
    return(
        <div>
          <select onChange={e=>props.handleNameChange(e)}>
            <option value='CONFIRMATION'>CONFIRMATION</option>
            <option value='RECOVERY'>RECOVERY</option>
          </select>
          <br></br>
        </div>
      )
}

SmptComponent.propTypes = {
    name: PropTypes.string,
}

SmptComponent.defaultProps = {};

export default SmptComponent;
