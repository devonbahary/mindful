import React from 'react';
import AddTopic from './AddTopic';
import AppNav from '../AppNav';
import DashboardHeader from './DashboardHeader';
import TopicsList from './TopicsList';

const Dashboard = () => (
    <main className="Dashboard">
      <DashboardHeader />
      <div className="Dashboard__contents">
        <AddTopic />
        <TopicsList />
      </div>
      <AppNav />
    </main>
);

export default Dashboard;
