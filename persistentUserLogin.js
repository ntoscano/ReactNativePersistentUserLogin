
var React = require('react-native');

var {
  AsyncStorage
} = React;

var loginPage = React.createClass({

  getInitialState: function () {
    return {
      token: null,
      user: null,
      badLogin: null
    };
  },

  submitCredentials: function (user) {
      if (user.username !== undefined && user.password !== undefined) {
        this.login({
          username: user.username,
          password: user.password
        }, () => {
          this.setState({ badLogin: true });
        });
      }
    },

  login: function (user, callback) {
    fetch(LOGIN_REQUEST_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then((response) => {
      return response.json();
    }).then((response) => {
      if (response.token && response.user) {
        AsyncStorage.multiSet([
          ['token', response.token],
          ['userId', response.user.id.toString()]
        ]);
      } else {
        if (callback) { callback(); }
      }
    }).done();
  },

  componentWillMount: function () {
    var token;
    AsyncStorage.multiGet(['token', 'userId']).then((data) => {
      if (data[0][1]) {
        token = data[0][1];
        return this.getUser(data[1][1]);
      }
    }).then((user) => {
      return user.json();
    }).then((user) => {
      this.setState({
        user: user,
        token: token
      })
    })
  },

  render: function() {
    if (!this.state.token) { 
      return (
        //insert login component here
      );
    } else {
      return (
        //insert component that renders when user has valid login here
      );
    }
  }
  
})

