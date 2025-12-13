import { useState, useEffect } from 'react';

// Use this hook in your Main Layout or Dashboard
const useAdminNotifications = (userRole) => {
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        // Only run logic if the user is an Admin
        if (userRole !== 'admin') return;

        const fetchNotifications = async () => {
            try {
                // Replace this with your actual API endpoint
                // const response = await fetch('/api/admin/notifications/unread-count');
                // const data = await response.json();
                
                // MOCKING DATA FOR DEMO:
                const mockCount = Math.floor(Math.random() * 5); // Simulates 0-4 notifications
                setNotificationCount(mockCount);
                
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            }
        };

        // 1. Fetch immediately on load
        fetchNotifications();

        // 2. Set up interval to check every 60 seconds (Polling)
        const intervalId = setInterval(fetchNotifications, 60000);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, [userRole]);

    return notificationCount;
};

export default useAdminNotifications;