import React from 'react';
import TopicsList from './TopicsList';
import AddTopic from './AddTopic';
import DashboardHeader from './DashboardHeader';

const Dashboard = () => (
    <main className="Dashboard">
      <DashboardHeader />
      <div className="Dashboard__contents">
        <AddTopic />
        <TopicsList />
      </div>
    </main>
);

export default Dashboard;
