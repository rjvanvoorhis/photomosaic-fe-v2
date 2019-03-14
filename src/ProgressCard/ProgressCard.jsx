import React from 'react';
import {ProgressBar} from 'react-bootstrap'
import loadingGif from '../images/loading.gif'

  class ProgressCard extends React.Component {

    get_level(num) {
      let level = 'success';
      if (num < 30) { level = 'danger'}
      else if (num < 60) { level = 'warning'}
      else if (num < 90) { level = 'info'}
       return level
    }

    render() {
      let progress_style = this.get_level(parseInt(this.props.current_progress))
      return (
        <div className="card h-100" style={{backgroundColor: "black"}}>
          <img className="card-img-top" src={this.props.current_image} alt="Current frame"/>
          <div className="card-body">
            <ProgressBar active bsStyle={progress_style} now={this.props.current_progress} label={`${this.props.current_progress} % complete`}/>
          </div>
	      <img className="card-img-bottom" src={loadingGif} alt="Card image bottom"/>
        </div>
      )
    }
  }

export { ProgressCard }
