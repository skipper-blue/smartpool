import React from 'react';
import StatCard from '../components/StatCard';
import ActivityTable from '../components/ActivityTable';
import './css/Dashboard.css'; 

function Dashboard() {
    // 1. Initialize as an empty array to simulate "Waiting for DB"
    const recentActivity = [];

    return (
        <div className="scroll-area fade-in">
            {/* Stats Section: passing value={null} triggers the "Skeleton/Empty" look */}
            <div className="grid-3">
                <StatCard 
                    title="Total Revenue Today" 
                    value={null} 
                />
                <StatCard 
                    title="Active Tables" 
                    value={null} 
                />
                <StatCard 
                    title="Pending Payouts" 
                    value={null} 
                />
            </div>

            {/* Table Section */}
            <ActivityTable transactions={recentActivity} />
        </div>
    );
}

export default Dashboard;