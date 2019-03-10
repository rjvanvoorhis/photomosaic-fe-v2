import React from 'react';
import { Link } from 'react-router-dom';
import { GalleryItem } from '../Gallery';
import { userService } from '../_services';
import { Paginator } from '../_components';
import {ControlledForm} from '../ControlledForm';
import {Navigation} from '../_components'

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: {results: [], links: [], total: 0, current: 0}
        };
    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            users: {
              links: [],
              total: 0,
              current: 0,
              results: [],
              loading: true
            }
        });
        this.handleFormSubmit()
        //userService.getAll().then(users => this.setState({ users }));
    }
    handleFormSubmit = () => {
      userService.getAll().then(users => this.setState({users}))
    }

    handlePageChange = idx => {
      this.setState({current: idx})
      userService.getContent(this.state.users.links[idx])
        .then(users => this.setState({ users }));
    }

    render() {
        const { user, users } = this.state;
        return (
          <div>
            <Navigation/>
            <div className="container-fluid" style={{minWidth: '22rem'}}>
              <div className="row"> 
                <div className="col-12 col-md-8">
                  <Paginator onPageChange={this.handlePageChange} pages={this.state.users.total} current={this.state.current} />
                  {users.loading && <em>Loading users...</em>}
                  {users.results.length > 0 ?
                    <ul className="list-group">
                        {users.results.map((user, index) =>
                            <li className="list-group-item">
                                <GalleryItem
                                    key={user.gallery_id}
                                    item={user}
                                    onDelete={this.handleFormSubmit}
                                />
                            </li>
                        )}
                    </ul>
                    : <em>Upload an image to view gallery</em>
                  }
                </div>
                <div className="col-6 col-md-4">
                  <ControlledForm onFormSubmit={this.handleFormSubmit} user={user}/>
                </div>
              </div>
            </div>
          </div>
//          <div className="container-fluid content-row" style={{minWidth: '22rem'}}>
//            <Navigation/>
//            <div className="row">
//              <div className="col-12 col-md-8">
//                <Paginator
//                    onPageChange={this.handlePageChange}
//                    pages={this.state.users.total}
//                    current={this.state.current}
//                />
//                {users.loading && <em>Loading users...</em>}
//                {users.results.length > 0 ?
//                  <ul className="list-group">
//                      {users.results.map((user, index) =>
//                          <li className="list-group-item">
//                              <GalleryItem
//                                  key={user.gallery_id}
//                                  item={user}
//                                  onDelete={this.handleFormSubmit}
//                              />
//                          </li>
//                      )}
//                  </ul>
//                  : <em>Upload an image to view gallery</em>
//                }
//            </div>
//            <div className="col-6 col-md-4">
//              <ControlledForm onFormSubmit={this.handleFormSubmit} user={user}/>
//            </div>
//            </div>
//          </div>
        );
    }
}

export { HomePage };
