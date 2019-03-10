import React from 'react';
import {userService} from '../_services';

class GalleryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHd: false,
      isGif: false
    };
  };

  setCurrent(idx){
      this.setState({
          current: idx
      });
  };

  toggleQuality(){
    this.setState({
      isHd: !this.state.isHd
    })
  }

  toggleGif(){
    this.setState({
      isGif: !this.state.isGif
    })
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  deleteItem(){
      userService.deleteGalleryItem(this.props.item.gallery_id)
          .then(data => {
                console.log(data)
                this.delay(500).then(() => {console.log('bar'); this.props.onDelete()})
                //this.props.onDelete()
                console.log('foo')
                })

  }

  setCurrentImage(){
    let imgSrc
    if (this.state.isHd) {
      imgSrc = this.state.isGif? this.props.item.mosaic_url: this.props.item.alternate_url
    }
    else {
      imgSrc = this.state.isGif? this.props.item.thumbnail_url: this.props.item.alternate_thumbnail_url
    }
    return imgSrc
  }
  render() {
    return(
      <div className="card h-100" style={{minWidth: '22rem'}} >
        <img className="card-img-top" src={this.setCurrentImage()} alt={this.props.item.gallery_id} onClick={this.toggleGif.bind(this)}/>
        <div className="card-body">
          <div className="btn-group d-inline-flex" role="group" style={{whiteSpace: 'nowrap'}} aria-label="GalleryButons">
            <button className="btn btn-info" onClick={this.toggleQuality.bind(this)}>Change Quality</button>
            <a className="btn btn-primary" href={this.setCurrentImage()} target="_blank" rel="noopener noreferrer">Full Size</a>
            <button className="btn btn-danger" onClick={this.deleteItem.bind(this)}>X</button>
          </div>
        </div>
      </div>
    )
  }
}

export { GalleryItem };
