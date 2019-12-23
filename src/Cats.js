import React from 'react';
import services from './services';

export default class Cats extends React.Component {

    state = {
        waitlist: false,
        cats: null,
        cat_users: null
    }

    adoptCat = () => {
        services.adopt('cat')
          .then(res => {
            let catsArr = [];
            let cat_users = [];
              console.log(res.cats)
              while (res.cats) {
                  catsArr.push(res.cats.value);
                  res.cats = res.cats.next;
              }
              console.log(catsArr)
              this.setState({
                  cats: catsArr
              })
              while (res.users) {
                cat_users.push(res.users.value);
                res.users = res.users.next;
              }
              this.setState({
                cat_users
              })
          })
      }

      componentDidMount() {
        services.getCats()
        .then(res => {
          let catsArr = [];
          while (res) {
              catsArr.push(res.value);
              res = res.next;
          }
          this.setState({
              cats: catsArr
          })
        })
        .catch(err => {
          console.error(err)
        })
        services.getCatUsers()
          .then(res => {
            let usersArr = [];
            while (res) {
                usersArr.push(res.value);
                res = res.next;
            }
            this.setState({
                cat_users: usersArr
            })
          })
          .catch(err => {
            console.error(err)
          })
      }

      addCatUser = (user) => {
        services.postCatUser(user)
            .then(res => {
              let user = res.last.value;
              this.setState({
                cat_users: [...this.state.cat_users, user]
              })
            })
            .catch(err => {
                console.error(err)
            })
    }

    handleUserSubmit = (e) => {
        e.preventDefault();
        const user = e.target.user_name.value;
        window.sessionStorage.setItem('cat_user', user)
        this.addCatUser(user);
        e.target.user_name.value = '';
        this.setState({ waitlist: true })
    }

    renderCats = () => {
        return (
            <ul className="pet_list">
                {this.state.cats.map((cat, index) => {
                    return (
                    <li key={index} className="pet_li">
                    <img src={cat.imageURL} alt={cat.imageDescription}></img>
                    <div className="pet_info">
                    <span>Name: {cat.name}</span>
                    <span>Age: {cat.age}</span>
                    <span>Breed: {cat.breed}</span>
                    <span>Gender: {cat.sex}</span>
                    <span>Story: {cat.story}</span>
                    </div>
                    <div className="adoption_info">
                        <h4>{index === 0 ? 'Ready for Adoption!' : 'Not yet available for adoption'}</h4>
                    </div>
                </li>
                    )})}
            </ul>
        )
    }

    renderUsers = () => {
        return (
            <ul className="waitlist_users">
                {this.state.cat_users.map((user, index) => {
                return <li key={index}>{user}</li>
                })}
            </ul>
        )
    }

    toggleWaitlistExpand = () => {
        this.setState({ waitlist: !this.state.waitlist })
    }

    renderWaitlistInfo = () => {
        let user = window.sessionStorage.getItem('cat_user');
        let count = 0;
        let user_index = null;
        if (user) {
        for (let i = 0; i < this.state.cat_users.length; i++) {
            if (this.state.cat_users[i] === user) {
                user_index = i;
                break;
            }
            count++;
        }
        if (user_index > 0) {
            return <h3>There are currently {count} people ahead of you on the waitlist.</h3>
        }
        if (user_index === 0) {
            return <h3>It is now your turn to adopt!</h3>
        }
        }
        else {
        return <h3>There are currently {this.state.cat_users.length} people on the waitlist.</h3>
        }
    }

    render() {
        return (
            <>
                <div className="waitlist">
                {this.state.cat_users ? this.renderWaitlistInfo() : ''}
                <button className="toggle_waitlist" onClick={this.toggleWaitlistExpand}>{this.state.waitlist ? 'Close Waitlist' : 'View Waitlist'}</button>
                {this.state.waitlist ? 
                <div className="waitlist_expanded">
                  {this.state.cat_users ? this.renderUsers() : ''}
                </div>
                : ''
                }
                {window.sessionStorage.getItem('cat_user') ? '' : <form id="add_cat_user" onSubmit={this.handleUserSubmit}>
                    <h3>Join the waitlist!</h3>
                    <label htmlFor="user_name">Your Name:</label>
                    <input type="text" id="user_name" />
                    <button type="submit">Submit</button>
                </form>}
            </div>
                {this.state.cats ? this.renderCats() : ''}
            </>
        )
    }
}