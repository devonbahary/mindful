import React from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../actions/user';
import { loadUsers } from '../actions/users';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Users from '../components/Users/Users';
import Profile from '../components/Profile/Profile';
import Topic from '../components/Topic/Topic';
import NotFoundPage from '../components/NotFoundPage';

class AppRouter extends React.Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.loadUsers();
  };

  render() {
    return (
      <BrowserRouter>
        <main id="main-content">
          <Switch>
            {/* key="me/user" is to trigger re-render for update-blocking components from react-router */}
            <Route key="me" path='/' exact component={Profile} />
            <Route path='/topics/:title' component={Topic} />
            <Route path='/users/:username/topics/:title' component={Topic} />
            <Route key="user" path='/users/:username' component={Profile} />
            <Route path='/users' component={Users} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default connect(undefined, { loadUser, loadUsers })(AppRouter);
