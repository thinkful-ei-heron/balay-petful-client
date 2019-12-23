import config from './config';

const services = {
  getDogs() {
    return fetch(`${config.API_ENDPOINT}/dogs`)
      .then(res => 
          !res.ok
           ? res.json().then(e => Promise.reject(e))
           : res.json()
      )
  },

  getCats() {
      return fetch(`${config.API_ENDPOINT}/cats`)
        .then(res =>
          !res.ok
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
  },

  getDogUsers() {
      return fetch(`${config.API_ENDPOINT}/dog_users`)
        .then(res =>
          !res.ok
            ? res.json().then(e => Promise.reject(e))
            : res.json()    
        )
  },

  getCatUsers() {
    return fetch(`${config.API_ENDPOINT}/cat_users`)
      .then(res =>
        !res.ok
          ? res.json().then(e => Promise.reject(e))
          : res.json()    
      )
  },
  
  adopt(type) {
      return fetch(`${config.API_ENDPOINT}/adopt/${type}`)
        .then(res =>
          !res.ok
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
  },

  postDogUser(user) {
      const userObj = { user: user}
      return fetch(`${config.API_ENDPOINT}/dog_users`, {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(userObj)
      })
      .then(res => 
        !res.ok
          ? res.json().then(e => Promise.reject(e))
          : res.json()  
      )
  },

  postCatUser(user) {
    const userObj = {
        user: user
    }
    return fetch(`${config.API_ENDPOINT}/cat_users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userObj)
    })
    .then(res => 
      !res.ok
        ? res.json().then(e => Promise.reject(e))
        : res.json()  
    )
  },

  getSuccess() {
      return fetch(`${config.API_ENDPOINT}/success`)
        .then(res => 
            !res.ok
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
  }

}

export default services;