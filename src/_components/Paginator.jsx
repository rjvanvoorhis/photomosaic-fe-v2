import React from 'react';

class Paginator extends React.Component {
        constructor(props) {
          super(props);
          this.handleClick = this.handleClick.bind(this);
         };

        handleClick(e) {
          console.log(e)
          this.props.onPageChange(e);
        }

        render_list_item(index) {
          return (
            <li className={parseInt(index) === parseInt(this.props.current)?"page-item active": "page-item"} key={index}>
              <a className="page-link" href="#" onClick={this.handleClick.bind(this, index)}>
                <span>{1 + index}</span>
              </a>
            </li>
          )
        }

        render() {
          let pages = [...Array(this.props.pages).keys()].map(x => this.render_list_item(x))
          return (
            <div className="container">
              <ul className="pagination d-flex justify-content-center">
                 <li className="page-item" key="first">
                   <a className="page-link" href="#" value="0" onClick={this.handleClick.bind(this, 0)}>
                     <span>first</span>
                    </a>
                  </li>
                  {pages}
                  <li className="page-item" key="last">
                   <a className="page-link" href="#" value="0" onClick={this.handleClick.bind(this, pages.length-1)}>
                     <span>last</span>
                   </a>
                  </li>
              </ul>
            </div>
          );
        }
      }

export { Paginator }
