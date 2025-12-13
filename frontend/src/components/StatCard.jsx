import React from 'react';
import '../assets/css/StatCard.css';

const StatCard = ({ title, value, subValue, trendText, trendIcon, trendType }) => {
    // Check if value is undefined, null, or an empty string
    const isEmpty = value === undefined || value === null || value === '';
    
    // Determine what to display
    const displayValue = isEmpty ? '0' : value;
    const displayTrendText = isEmpty ? 'No recent activity' : trendText;
    
    // Logic for the trend class
    const getTrendClass = () => {
        if (isEmpty) return 'trend muted'; // Force muted if empty
        if (trendType === 'warning') return 'trend warning';
        if (trendType === 'down') return 'trend down';
        return 'trend up'; 
    };

    return (
        <div className={`card ${isEmpty ? 'is-empty' : ''}`}>
            {/* Background decoration for "fancy" look */}
            <div className="card-decoration"></div>

            <div className="card-content">
                <div className="stat-header">
                    <div className="stat-label">{title}</div>
                    {/* Optional: Add a subtle icon based on context if you have one */}
                </div>

                <div className="stat-val">
                    {displayValue}
                    
                    {/* Only show subValue if data exists */}
                    {!isEmpty && subValue && (
                        <span className="stat-subval">
                            {subValue}
                        </span>
                    )}
                </div>
                
                <div className={getTrendClass()}>
                    {/* If empty, show a dot or dash, otherwise show the icon */}
                    {!isEmpty && trendIcon ? (
                        <i className={trendIcon} style={{ marginRight: '6px' }}></i>
                    ) : (
                        isEmpty && <span className="dot-indicator"></span>
                    )}
                    {displayTrendText}
                </div>
            </div>
        </div>
    );
};

export default StatCard;