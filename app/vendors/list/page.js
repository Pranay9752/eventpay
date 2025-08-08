import { StatsCards } from "./components/StatsCards";
import { VendorManagementDashboard } from "./components/VendorDashboard";
import AddVendorDialog from "./components/AddVendorDialog";
import { fetchVendors } from "../actions/addVendor";

const dummyData = [
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

function transformVendors(vendors) {
  const categories = [
    "Retail",
    "Tech",
    "Food & Beverage",
    "General",
    "Electronics",
  ];
  const locations = [
    "Stall A1",
    "Stall B2",
    "Main Hall",
    "Main Stage",
    "Stall C3",
    "Stall D4",
    "Hall B",
    "Stall E1",
    "Stall E2",
    "Stall C4",
  ];
  const statuses = ["active", "inactive"];

  return vendors.map((vendor, index) => {
    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const totalTransactions = randomInt(80, 350);
    const totalSales = totalTransactions * randomInt(400, 800); // mock ₹ avg per transaction
    const pendingPayout = totalSales - randomInt(0, totalSales * 0.1); // up to 10% already paid
    const lastTransaction = new Date(
      Date.now() - randomInt(0, 7 * 24 * 60 * 60 * 1000)
    ).toISOString(); // within last 7 days

    return {
      id: vendor?.uniqueid || "",
      name: vendor.businessname,
      terminalId: vendor._id,
      totalTransactions,
      totalSales,
      pendingPayout,
      lastTransaction,
      // status: statuses[index % statuses.length],
      status: "active",
      email: vendor?.email || "",
      phone: vendor?.phone || "",
      // category: categories[index % categories.length],
      // location: locations[index % locations.length],
    };
  });
}

// Now this is a client component that receives server-fetched data
const VendorsListPage = async ({}) => {
  // Sample vendor data - in real app, this would come from props (initialVendors)

  const data = await fetchVendors();
  console.log('data: ', data);
  const formattedVendors = transformVendors(data?.vendors || []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Vendor Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your vendor accounts and relationships
            </p>
          </div>
          <div className="flex items-center gap-3">
            <AddVendorDialog />
          </div>
        </div>
        <StatsCards
          totalRevenue={data?.totalRevenue}
          totalTransactions={data?.totalTransactions}
          totalVendors={data?.totalVendors}
        />
        <VendorManagementDashboard initialVendors={formattedVendors} />
      </div>
    </div>
  );
};

export default VendorsListPage;
