import React from 'react';
import TopicsList from './TopicsList';
import AddTopic from './AddTopic';

const Dashboard = () => (
    <div>
      <h1>Dashboard</h1>
      <hr />
      <TopicsList />
      <hr />
      <AddTopic />
    </div>
);

export default Dashboard;
