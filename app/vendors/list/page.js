import { StatsCards } from "./components/StatsCards";
import { VendorManagementDashboard } from "./components/VendorDashboard";

// import { DatePickerWithRange } from '@/components/ui/date-range-picker'; // Assuming this component exists

// This component would normally fetch data server-side
// Example of how server component would prepare data
/*
// In a server component (vendors-list-page.tsx)
import { VendorsList } from '@/components/vendors-list';

async function getVendors() {
  // Fetch from database or API
  const res = await fetch('https://api.youreventapp.com/vendors', { cache: 'no-store' });
  const data = await res.json();
  return data;
}

export default async function VendorsPage() {
  const initialVendors = await getVendors();
  
  return (
    <VendorsList initialVendors={initialVendors} />
  );
}
*/

// Now this is a client component that receives server-fetched data
const VendorsListPage = ({ initialVendors }) => {
  // Sample vendor data - in real app, this would come from props (initialVendors)
  const vendors = initialVendors || [
    {
      id: "V001",
      name: "Food Paradise",
      terminalId: "T23456",
      totalTransactions: 245,
      totalSales: 123500,
      pendingPayout: 118400,
      lastTransaction: "2025-02-28T10:30:00",
      status: "active",
      category: "Food & Beverage",
      location: "Main Hall",
    },
    {
      id: "V002",
      name: "Craft Corner",
      terminalId: "T23457",
      totalTransactions: 136,
      totalSales: 68000,
      pendingPayout: 65280,
      lastTransaction: "2025-02-28T09:45:00",
      status: "active",
      category: "Crafts",
      location: "East Wing",
    },
    {
      id: "V003",
      name: "Artisan Goods",
      terminalId: "T23458",
      totalTransactions: 89,
      totalSales: 44500,
      pendingPayout: 42720,
      lastTransaction: "2025-02-27T16:20:00",
      status: "active",
      category: "Art",
      location: "West Wing",
    },
    {
      id: "V004",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V005",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V006",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V007",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V008",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V009",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V010",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V011",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V012",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V013",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V014",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V015",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V016",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V017",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V018",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V019",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V020",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V021",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V022",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V023",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V024",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V025",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V026",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V027",
      name: "Tech Accessories",
      terminalId: "T23459",
      totalTransactions: 62,
      totalSales: 93000,
      pendingPayout: 89280,
      lastTransaction: "2025-02-27T14:15:00",
      status: "active",
      category: "Technology",
      location: "Main Hall",
    },
    {
      id: "V028",
      name: "Eco Friendly Shop",
      terminalId: "T23460",
      totalTransactions: 0,
      totalSales: 0,
      pendingPayout: 0,
      lastTransaction: null,
      status: "inactive",
      category: "Eco-friendly",
      location: "Outdoor Area",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              Vendors List
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage and track all your event vendors in one place
            </p>
          </div>
        </div>
        <StatsCards vendors={vendors} />
        <VendorManagementDashboard initialVendors={vendors} />
      </div>
    </div>
  );
};

export default VendorsListPage;
