import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { fetchTopics } from '../actions/topics';
import Dashboard from '../components/Dashboard';
import Topic from '../components/Topic';

class AppRouter extends React.Component {
  componentWillMount() {
    this.props.fetchTopics();
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/topics/:id' component={Topic} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTopics: () => dispatch(fetchTopics())
});

export default connect(undefined, mapDispatchToProps)(AppRouter);
