import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getAll,
    getContent,
    getUploads,
    getUserUrl,
    register,
    validate,
    submitMessage,
    getPending,
    deleteUpload,
    deleteGalleryItem
};

function deleteUpload(file_id) {
   const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization': authHeader().Authorization},
   }
   return fetch(`${getUserUrl()}/uploads/${file_id}`, requestOptions)
       .then(handleResponse)
}

function deleteGalleryItem(gallery_id) {
   const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization': authHeader().Authorization},
   }
   return fetch(`${getUserUrl()}/gallery/${gallery_id}`, requestOptions)
       .then(handleResponse)
}

function submitMessage(tile_size, enlargement, file_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': authHeader().Authorization},
        body: JSON.stringify({tile_size, enlargement, file_id})
    }
    return fetch(`${getUserUrl()}/messages`, requestOptions)
        .then(handleResponse)
        .then(resp => {
             let mesg = typeof(resp) == 'string'? {'message': resp, 'success': false} : {'message': 'success', 'success': true};
             return mesg;
        })
}

function getPending() {
  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': authHeader().Authorization},
  }
  return fetch(
    `${getUserUrl()}/pending_json?${Date.now()}`,
     requestOptions
  )
     .then(handleResponse)
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage
                // to keep user logged in between page refreshes
                //user.authdata = window.btoa(username + ':' + password);
                user.username = username;
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function validate(username, password) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
  };

  return fetch(`${config.apiUrl}/validate`, requestOptions)
      .then(handleResponse)
      .then(user => {
          // login successful if there's a user in the response
          if (user) {
              // store user details and basic auth credentials in local storage
              // to keep user logged in between page refreshes
              //user.authdata = window.btoa(username + ':' + password);
              user.username = username;
              localStorage.setItem('user', JSON.stringify(user));
          }

          return user;
      });
}

function register(username, password, email) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email })
  };

  return fetch(`${config.apiUrl}/register`, requestOptions)
      .then(handleResponse)
      .then(resp => {
          // login successful if there's a user in the response
          if (resp) {
              // store user details and basic auth credentials in local storage
              // to keep user logged in between page refreshes
              //user.authdata = window.btoa(username + ':' + password);
              resp.success = resp.message == 'sent email'
          }

          return resp;
      });
}

function getUserUrl(){
  return `${config.apiUrl}/users/${getUsername()}`
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getUsername() {
  return JSON.parse(localStorage.getItem('user')).username
}

function getAll() {
     return makeRequest(
       `${config.apiUrl}/users/${getUsername()}/gallery?skip=0&limit=1`,
       'GET'
     )
}

function getUploads() {
  return makeRequest(
    `${config.apiUrl}/users/${getUsername()}/uploads`, 'GET'
  ).then(data => {
    let titles= data.map(x => x.img_path.split('_')[x.img_path.split('_').length - 1]);
    let images= data.map(x => `${config.apiUrl}/images/${x.file_id}`);
    let image_paths= data.map(x => x.file_id);
    return {titles: titles, images: images, image_paths: image_paths}
  })
}

function registerUser(username, password, email) {
  const requestOptions = {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify({username, password, email})
  }
  return fetch(`${config.apiUrul}/register`, requestOptions)
      .then(handleResponse)
}

function makeRequest(url, _method) {
  const requestOptions = {
    method: _method,
    headers: authHeader()
  };
  return fetch(
    url,
    requestOptions,
  ).then(handleResponse)
}

function getContent(url) {
  return makeRequest(url, 'GET')
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                // auto logout if 401 response returned from api
                console.log('Unauthorized!');
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            console.log(error)
	    return Promise.reject(error);
        }

        return data;
    });
}
