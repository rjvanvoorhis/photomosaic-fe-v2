import React from 'react';
import config from 'config';
import {ProgressCard} from '../ProgressCard'
import Slider from 'react-rangeslider'
import {FilePond} from 'react-filepond'
import {userService} from '../_services'
import {authHeader} from '../_helpers'


class ControlledForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      progress: 0,
      tile_size: 8,
      enlargement: 1,
      pending_image: '',
      allow_submissions: true,
      isLoading: false,
      items: [],
      image_paths: [],
      titles: [],
      images: []
    }
  }
  componentDidMount(){
    userService.getUploads().then(data => console.log(JSON.stringify(data)))
    this.fetchUploads()


  }
  fetchUploads() {
    userService.getUploads().then(data => this.setState({
          titles: data.titles,
          images: data.images,
          image_paths: data.image_paths
    }))
  }

  fetchPending() {

    userService.getPending().then(data=>
        this.setState({
          progress: Math.ceil(parseFloat(data.progress)*100),
          pending_image: `${userService.getUserUrl()}/pending?${Date.now()}`
        })
    )
    .catch(error => this.setState({error, isLoading: false}));
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  pollPending = () => {
    if (this.state.progress < 100) {
        this.fetchPending()
        setTimeout(this.pollPending, 5000)
    }
    else {
      this.setState({
        progress: 0,
        allow_submissions: true,
        isLoading: false
      });
      //this.fetchUploads();
      this.props.onFormSubmit()
    }
  }

  changeCurrent(index){
    this.setState({current: index})
  }

  deleteItem(){
      let {current, image_paths} = this.state;
      userService.deleteUpload(image_paths[current])
          .then(data => {
            console.log(data)
            this.delay(1000).then(() => this.fetchUploads())
          })
  }

  submitForm(){
    let {current, image_paths, enlargement, tile_size} = this.state;

    //console.log({enlargement: enlargement, tile_size: tile_size, file_id: image_paths[current]})
    userService.submitMessage(tile_size, enlargement, image_paths[current]);
    this.delay(1000).then(() => {console.log('bar'); this.setState({allow_submissions: false}); this.pollPending()});
    this.setState({isLoading: true})
  }
  handleTileChange = value => {this.setState({tile_size: value})};
  handleSizeChange = value => {this.setState({enlargement: value})};

  renderForm() {
    const {current, progress, tile_size, enlargement, pending_image,
    allow_submissions, items, image_paths, titles, images, isLoading} = this.state;
    return (
      <div className="card h-100">
        <img
          className="card-img-top"
          src={images[current]}
          alt="Dropdown Thumbnail"
        />
      <div className="card-body">
      <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="false" aria-expanded="false">Select<span className="caret"></span></button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">

      {titles.map((title, index)=>
        <li><a
          className="dropdown-item"
          onClick={this.changeCurrent.bind(this, index)}
          key={index}
          href="#">{titles[index]}
        </a></li>
      )}
      </ul>
        <a
          href="#" className="btn btn-primary"
          onClick={this.submitForm.bind(this)}
          aria-expanded="false" disabled={isLoading}>Submit Form
        {isLoading &&
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        }
        </a>
        <a
          href="#" className="btn btn-danger"
          onClick={this.deleteItem.bind(this)}
          aria-expanded="false">X
        </a>
      </div>
      <div className="slider-group">
        <div className="slider-horizontal">
          <Slider
            min={8}
            max={24}
            value={tile_size}
            orientation='horizontal'
            onChange={this.handleTileChange}
          />
          <div className='value'>{`${tile_size} px tiles`}</div>
        </div>
        <div className="slider-horizontal">
          <Slider
            min={1}
            max={6}
            value={enlargement}
            orientation='horizontal'
            onChange={this.handleSizeChange}
          />
          <div className='value'>{`${enlargement} x original`}</div>
          <FilePond
            ref={ref => this.pond = ref}
            name="file"
            allowMultiple={false}
            server={{
                     url: `${userService.getUserUrl()}/uploads`,
                     process: {
                         headers: authHeader()
              }
            }}
            onprocessfile={this.fetchUploads.bind(this)}
          >
          </FilePond>
        </div>
      </div>
      </div>
      </div>
    )
  };
  render () {
     return (
       <div>
         {this.state.allow_submissions? this.renderForm(): <ProgressCard current_progress={this.state.progress} current_image={this.state.pending_image}/>}
      </div>
    );
  }
}

export {ControlledForm};
