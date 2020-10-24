import React from 'react';
import PropTypes from 'prop-types';

class StatsCard extends React.Component{
    render(){
        return (
          <div className="card stats-card">
              <h1>{this.props.pzs} <span>PZS</span></h1>
              <p>{this.props.title}</p>
          </div>
        );
    }
};

StatsCard.propTypes = {
    pzs: PropTypes.string,
    title: PropTypes.string
};

export default StatsCard;
