// Common data file for SmartPool application
// This file contains all mock data used across the frontend
// Edit this file to see how data flows through your website

export const mockData = {
  // Dashboard statistics
  dashboardStats: {
    revenue: 145000,
    activeTables: 18,
    pendingPayouts: 3,
    issues: 1
  },

  // Recent transactions for ActivityTable
  recentTransactions: [
    { time: '14:32', tableId: 'T-105', location: 'Nairobi West', amount: 'KES 50', status: 'Active' },
    { time: '14:15', tableId: 'T-202', location: 'Kasarani', amount: 'KES 20', status: 'Active' },
    { time: '14:00', tableId: 'T-108', location: 'CBD', amount: 'KES 20', status: 'Failed' },
    { time: '13:45', tableId: 'T-105', location: 'Nairobi West', amount: 'KES 50', status: 'Active' },
    { time: '13:30', tableId: 'T-301', location: 'Langata', amount: 'KES 100', status: 'Active' }
  ],

  // Owners data
  owners: [
    {
      id: 1,
      name: 'John Kamau',
      email: 'john.k@gmail.com',
      phone: '+254 712 345 678',
      tables: 5,
      revenue: 125000,
      status: 'Active',
      location: 'Westlands',
      commission: '15%',
      earned: 'KES 18,750'
    },
    {
      id: 2,
      name: 'Sarah Ochieng',
      email: 'sarah.o@yahoo.com',
      phone: '+254 722 987 654',
      tables: 3,
      revenue: 89000,
      status: 'Active',
      location: 'Kasarani',
      commission: '15%',
      earned: 'KES 13,350'
    },
    {
      id: 3,
      name: 'David Mwangi',
      email: 'd.mwangi@biz.co.ke',
      phone: '+254 733 111 222',
      tables: 1,
      revenue: 12000,
      status: 'Pending',
      location: 'CBD',
      commission: '15%',
      earned: 'KES 1,800'
    },
    {
      id: 4,
      name: 'City Pub Ltd',
      email: 'admin@citypub.com',
      phone: '+254 700 000 000',
      tables: 12,
      revenue: 450000,
      status: 'Active',
      location: 'Langata',
      commission: '12%',
      earned: 'KES 54,000'
    }
  ],

  // Transactions data
  transactions: [
    {
      id: 'TX-1001',
      code: 'QGH12399AA',
      date: '2023-11-30 14:32',
      tableId: 'T-105',
      owner: 'John Kamau',
      amount: 50,
      duration: '30 Min',
      status: 'Completed',
      method: 'M-Pesa'
    },
    {
      id: 'TX-1002',
      code: 'QGH12388BB',
      date: '2023-11-30 14:15',
      tableId: 'T-202',
      owner: 'Sarah Ochieng',
      amount: 20,
      duration: '10 Min',
      status: 'Completed',
      method: 'M-Pesa'
    },
    {
      id: 'TX-1003',
      code: 'QGH12377CC',
      date: '2023-11-30 14:00',
      tableId: 'T-108',
      owner: 'David Mwangi',
      amount: 20,
      duration: '10 Min',
      status: 'Failed',
      method: 'Cash'
    },
    {
      id: 'TX-1004',
      code: 'QGH12366DD',
      date: '2023-11-30 13:45',
      tableId: 'T-105',
      owner: 'John Kamau',
      amount: 50,
      duration: '30 Min',
      status: 'Completed',
      method: 'M-Pesa'
    },
    {
      id: 'TX-1005',
      code: 'QGH12355EE',
      date: '2023-11-30 13:30',
      tableId: 'T-301',
      owner: 'City Pub Ltd',
      amount: 100,
      duration: '1 Hr',
      status: 'Completed',
      method: 'M-Pesa'
    },
    {
      id: 'TX-1006',
      code: 'QGH12344FF',
      date: '2023-11-30 13:10',
      tableId: 'T-105',
      owner: 'John Kamau',
      amount: 50,
      duration: '30 Min',
      status: 'Refunded',
      method: 'M-Pesa'
    },
    {
      id: 'TX-1007',
      code: 'QGH12333GG',
      date: '2023-11-30 12:45',
      tableId: 'T-202',
      owner: 'Sarah Ochieng',
      amount: 40,
      duration: '20 Min',
      status: 'Completed',
      method: 'Cash'
    }
  ],

  // Settlements data
  pendingPayouts: [
    { id: 101, owner: 'John Kamau', tables: 3, revenue: 65000, fee: 4500, payable: 60500 },
    { id: 102, owner: 'Sarah Ochieng', tables: 5, revenue: 150000, fee: 12000, payable: 138000 },
    { id: 103, owner: 'David Mwangi', tables: 2, revenue: 28000, fee: 2000, payable: 26000 },
    { id: 104, owner: 'City Pub Ltd', tables: 4, revenue: 80000, fee: 6000, payable: 74000 }
  ],

  // Device data for Control Center
  devices: [
    {
      id: 'T-101',
      name: 'Nairobi West - Bar A',
      status: 'Online',
      ip: '192.168.1.101',
      mac: '00:1A:2B:3C:4D:5E',
      firmware: 'v2.4.1',
      voltage: 12.4,
      signal: -55,
      uptime: '4d 12h',
      config: { pricePerGame: 50, sleepTimer: 10, volume: 80 }
    },
    {
      id: 'T-102',
      name: 'Nairobi West - Bar A',
      status: 'Busy',
      ip: '192.168.1.102',
      mac: '00:1A:2B:3C:4D:5F',
      firmware: 'v2.4.0',
      voltage: 11.8,
      signal: -62,
      uptime: '12h 30m',
      config: { pricePerGame: 50, sleepTimer: 15, volume: 60 }
    },
    {
      id: 'T-205',
      name: 'Kasarani - Club Z',
      status: 'Offline',
      ip: '192.168.2.005',
      mac: '00:1A:2B:3C:4D:88',
      firmware: 'v2.4.1',
      voltage: 0,
      signal: 0,
      uptime: '0m',
      config: { pricePerGame: 40, sleepTimer: 5, volume: 100 }
    },
    {
      id: 'T-309',
      name: 'Westlands - Lounge',
      status: 'Online',
      ip: '192.168.3.009',
      mac: '00:1A:2B:3C:4D:99',
      firmware: 'v2.5.0',
      voltage: 12.6,
      signal: -48,
      uptime: '1d 2h',
      config: { pricePerGame: 100, sleepTimer: 20, volume: 45 }
    }
  ],

  // Top locations data for Dashboard
  topLocations: [
    { name: 'Nairobi West', revenue: 45000 },
    { name: 'Kasarani', revenue: 35000 },
    { name: 'CBD Branch', revenue: 25000 }
  ],

  // System settings (for Settings page)
  systemSettings: {
    maintenanceMode: false,
    autoBackup: true,
    notificationEmail: 'admin@smartpool.com',
    currency: 'KES',
    timezone: 'Africa/Nairobi'
  }
};

// Helper functions for data manipulation
export const getTotalRevenue = () => {
  return mockData.transactions
    .filter(tx => tx.status === 'Completed')
    .reduce((sum, tx) => sum + tx.amount, 0);
};

export const getActiveTablesCount = () => {
  return mockData.devices.filter(device => device.status === 'Online' || device.status === 'Busy').length;
};

export const getPendingPayoutsCount = () => {
  return mockData.pendingPayouts.length;
};

export const getSystemIssuesCount = () => {
  return mockData.devices.filter(device => device.status === 'Offline').length;
};