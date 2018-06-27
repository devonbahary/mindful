import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { fetchTopics } from '../actions/topics';
import Dashboard from '../components/Dashboard/Dashboard';
import Topic from '../components/Topics/Topic';

class AppRouter extends React.Component {
  componentWillMount() {
    this.props.fetchTopics();
  };

  render() {
    return (
      <BrowserRouter>
        <main id="main-content">
          <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/topics/:id' component={Topic} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTopics: () => dispatch(fetchTopics())
});

export default connect(undefined, mapDispatchToProps)(AppRouter);
