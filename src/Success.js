import React from 'react';
import services from './services';

export default class Success extends React.Component {

    state = {
        success: null
    }

    componentDidMount() {
          services.getSuccess()
          .then(res => {
            this.setState({
                success: res
            })
          })
          .catch(err => {
            console.error(err)
          })   
    }

    renderStories = () => {
        return (
        <ul className="success_stories">
        {this.state.success.map((item, index) => {
            return (
                <li key={index} className="success_li">
                  <img src={item.image} alt={item.imageDescription}></img>
                  <div className="success_info">
                    <span>Name: {item.petName}</span>
                    <span>Proud Owner: {item.user}</span>
                  </div>
                </li>
            )
        })}
        </ul>
        )
    }

    render() {
        return (
            <div>
                <h3>Successful Adoptions</h3>
                {this.state.success ? this.renderStories() : ''}
            </div>
        )
    }
}