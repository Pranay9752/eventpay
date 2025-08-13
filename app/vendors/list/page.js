import { StatsCards } from "./components/StatsCards";
import { VendorManagementDashboard } from "./components/VendorDashboard";
import AddVendorDialog from "./components/AddVendorDialog";
import { fetchVendors } from "../actions/addVendor";


function transformVendors(vendors) {


  return vendors.map((vendor, index) => {
    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const pendingPayout =  vendor?.totalRevenue;
    const lastTransaction = new Date(
      Date.now() - randomInt(0, 7 * 24 * 60 * 60 * 1000)
    ).toISOString(); // within last 7 days

    return {
      id: vendor?.uniqueid || "",
      name: vendor.businessname,
      vendorId: vendor._id,
      terminalId: vendor?.vendorId,
      totalTransactions: vendor?.totalTransactions || 0,
      totalSales: vendor?.totalRevenue || 0,
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

  const data = await fetchVendors();
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
