import React from 'react';
import services from './services';
import swal from 'sweetalert';

export default class Dogs extends React.Component {

    state = {
        waitlist: false,
        dogs: null,
        dog_users: null
    }

    userAdopt = () => {
        services.adopt('dog')
          .then(res => {
            let dogsArr = [];
            let dog_users = [];
              while (res.dogs) {
                  dogsArr.push(res.dogs.value);
                  res.dogs = res.dogs.next;
              }
              this.setState({
                  dogs: dogsArr
              })
              while (res.users) {
                dog_users.push(res.users.value);
                res.users = res.users.next;
              }
              this.setState({
                dog_users
              })
              swal({
                title: 'Congratulations!',
                text: 'You have successfully adopted your new best friend!',
                icon: 'success',
                timer: 2000,
                button: false
              })
              this.props.history.push('/success_stories')
          })
          .catch(err => {
              console.error(err)
          })
    }

    adoptDog = () => {
        if (this.state.dogs.length > 1 && this.state.dog_users.length > 1) {
        services.adopt('dog')
          .then(res => {
            let dogsArr = [];
            let dog_users = [];
              while (res.dogs) {
                  dogsArr.push(res.dogs.value);
                  res.dogs = res.dogs.next;
              }
              this.setState({
                  dogs: dogsArr
              })
              while (res.users) {
                dog_users.push(res.users.value);
                res.users = res.users.next;
              }
              this.setState({
                dog_users
              })
          })
          .catch(err => {
              console.error(err)
          })
        }
      }

      componentDidMount() {
        services.getDogs()
        .then(res => {
          let dogsArr = [];
          while (res) {
              dogsArr.push(res.value);
              res = res.next;
          }
          this.setState({
              dogs: dogsArr
          })
        })
        .catch(err => {
          console.error(err)
        })
        services.getDogUsers()
          .then(res => {
            let usersArr = [];
            while (res) {
                usersArr.push(res.value);
                res = res.next;
            }
            this.setState({
                dog_users: usersArr
            })
          })
          .catch(err => {
            console.error(err)
          })

          this.interval = setInterval(() => this.adoptDog(), 20000)
      }

      addDogUser = (user) => {
        services.postDogUser(user)
            .then(res => {
              let user = res.last.value;
              this.setState({
                dog_users: [...this.state.dog_users, user]
              })
            })
            .catch(err => {
                console.error(err)
            })
    }

    handleUserSubmit = (e) => {
        e.preventDefault();
        const user = e.target.user_name.value;
        window.sessionStorage.setItem('user', user)
        this.addDogUser(user);
        e.target.user_name.value = '';
        this.setState({ waitlist: true })
    }

    renderDogs = () => {
        return (
            <>
                {this.state.dogs.map((dog, index) => {
                    return (
                    <li key={index} className="pet_li">
                    <img src={dog.imageURL} alt={dog.imageDescription}></img>
                    <div className="pet_info">
                    <span>Name: {dog.name}</span>
                    <span>Age: {dog.age}</span>
                    <span>Breed: {dog.breed}</span>
                    <span>Gender: {dog.sex}</span>
                    <span>Story: {dog.story}</span>
                    </div>
                    <div className="adoption_info">
                        <h4>{index === 0 ? 'Ready for Adoption!' : 'Not yet available for adoption'}</h4>
                    </div>
                </li>
                    )})}
            </>
        )
    }

    renderUsers = () => {
        return (
            <ul className="waitlist_users">
                {this.state.dog_users.map((user, index) => {
                return <li key={index}>{user}</li>
                })}
            </ul>
        )
    }

    toggleWaitlistExpand = () => {
        this.setState({ waitlist: !this.state.waitlist })
    }

    renderWaitlistInfo = () => {
        let user = window.sessionStorage.getItem('user');
        let count = 0;
        let user_index = null;
        if (user) {
        for (let i = 0; i < this.state.dog_users.length; i++) {
            if (this.state.dog_users[i] === user) {
                user_index = i;
                break;
            }
            count++;
        }
        if (user_index > 0) {
            return <h3>There are currently {count} people ahead of you on the waitlist.</h3>
        }
        if (user_index === 0) {
            return <div className="adopt_container">
                <h3>It is now your turn to adopt!</h3>
                <button onClick={this.userAdopt}>Adopt next dog in line</button>
                </div>
        }
        }
        else {
        return <h3>There are currently {this.state.dog_users.length} people on the waitlist.</h3>
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <>
            <div className="waitlist">
                {this.state.dog_users ? this.renderWaitlistInfo() : ''}
                <button className="toggle_waitlist" onClick={this.toggleWaitlistExpand}>{this.state.waitlist ? 'Close Waitlist' : 'View Waitlist'}</button>
                {this.state.waitlist ? 
                <div className="waitlist_expanded">
                  {this.state.dog_users ? this.renderUsers() : ''}
                </div>
                : ''
                }
                {window.sessionStorage.getItem('user') ? '' : <form id="add_dog_user" onSubmit={this.handleUserSubmit}>
                    <h3>Join the waitlist!</h3>
                    <label htmlFor="user_name">Your Name:</label>
                    <input type="text" id="user_name" />
                    <button type="submit">Submit</button>
                </form>}
            </div>
            <ul className="pet_list">
                {this.state.dogs ? this.renderDogs() : ''}
            </ul>
                <div className="empty">{this.state.dogs && this.state.dogs.length > 0 ? '' : <h3>No dogs available for adoption - check back later!</h3>}</div>
            </>
        )
    }
}