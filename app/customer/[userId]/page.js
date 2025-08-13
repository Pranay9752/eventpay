import { Card } from "@/components/ui/card";
import {
  FinancialSummary,
  TopUpsTable,
  Transaction,
  TransactionsTable,
  UserDetailsProps,
  UserHeader,
  UserInfoCard,
} from "./components/UserHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, ShoppingBag } from "lucide-react";
import { fetchCustomerDetails } from "../actions/fetchCustomerDetails";
import { fetchCustomerTransactions } from "../actions/fetchCustomerTransactions";

const sampleUser = {
  id: "U12345",
  nfcCardId: "NFC7890",
  name: "Priya Sharma",
  email: "priya.sharma@example.com",
  phone: "+91 98765 43210",
  status: "active",
  profileImage: "/api/placeholder/300/300",
  registrationDate: new Date("2023-10-15"),
  lastLogin: new Date("2024-03-01T14:30:00"),
  totalSpent: 7850,
  remainingBalance: 1250,
  averageTransaction: 450,
};

const sampleTransactions = [
  {
    id: "TRX1001",
    dateTime: new Date("2024-03-01T12:30:00"),
    vendorName: "Food Court - Spice Delight",
    terminalId: "TERM01",
    amount: 450,
    remainingBalance: 1250,
    status: "completed",
  },
  {
    id: "TRX1000",
    dateTime: new Date("2024-03-01T10:15:00"),
    vendorName: "Ticket Counter - Main Stage",
    terminalId: "TERM03",
    amount: 1500,
    remainingBalance: 1700,
    status: "completed",
  },
  {
    id: "TRX999",
    dateTime: new Date("2024-02-29T16:45:00"),
    vendorName: "Merchandise Shop",
    terminalId: "TERM08",
    amount: 850,
    remainingBalance: 3200,
    status: "completed",
  },
  {
    id: "TRX998",
    dateTime: new Date("2024-02-29T14:20:00"),
    vendorName: "Beverage Stall - Refresh",
    terminalId: "TERM05",
    amount: 200,
    remainingBalance: 4050,
    status: "failed",
  },
];

const sampleTopUps = [
  {
    id: "TOP103",
    dateTime: new Date("2024-02-28T09:30:00"),
    amount: 2000,
    method: "Credit Card",
  },
  {
    id: "TOP102",
    dateTime: new Date("2024-02-25T11:20:00"),
    amount: 3000,
    method: "UPI",
  },
];
export default async function UserDetailsPage({
  topUps = sampleTopUps,
  onResetNFCCard = () => {},
  onBlockUser = () => {},
  onUnblockUser = () => {},
  onExportTransactions = () => {},
  params,
}) {
  const { userId } = await params;
  const user = await fetchCustomerDetails(userId);
  console.log('user: ', user);
  const transactions = await fetchCustomerTransactions(userId)
  console.log('transactions: ', transactions);

  return (
    <div className="container mx-auto p-4 m ax-w-6xl">
      {/* Header Section */}
      <UserHeader
        user={user || {}}
      />

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - User Details */}
        <div className="md:col-span-1">
          <UserInfoCard user={user} />
        </div>

        {/* Right Column - Financial & Transactions */}
        <div className="md:col-span-2 space-y-6">
          {/* Financial Summary Cards */}
          {/* <FinancialSummary user={user} /> */}

          {/* Tabs Section */}
          <Card className="border-none shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all">
            <Tabs defaultValue="transactions">
              <TabsList className="w-full bg-gray-50 p-1 grid grid-cols-2">
                <TabsTrigger
                  value="transactions"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-fuchsia-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" /> Transactions
                </TabsTrigger>
                {/* <TabsTrigger
                  value="topups"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-fuchsia-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md"
                >
                  <CreditCard className="h-4 w-4 mr-2" /> Top-Ups
                </TabsTrigger> */}
              </TabsList>

              {/* Transactions Tab */}
              <TabsContent value="transactions" className="p-0">
                <TransactionsTable
                  transactions={transactions?.data || []}
                  // onExport={onExportTransactions}
                />
              </TabsContent>

              {/* Top-Ups Tab */}
              <TabsContent value="topups" className="p-0">
                {/* <TopUpsTable topUps={topUps} onExport={onExportTransactions} /> */}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
