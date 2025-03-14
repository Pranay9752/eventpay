// src/components/users/UserStats.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Users, CreditCard, IndianRupee } from "lucide-react";

async function getStats() {
  // In a real app, this would fetch from your API
  return {
    totalUsers: 1245,
    totalTransactions: 8647,
    totalAmountSpent: 543250
  };
}

export async function UserStats() {
  const stats = await getStats();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard 
        icon={<Users className="h-8 w-8 text-purple-500" />}
        title="Total Users"
        value={stats.totalUsers.toLocaleString()}
        bgColor="bg-purple-50"
      />
      <StatCard 
        icon={<CreditCard className="h-8 w-8 text-blue-500" />}
        title="Total Transactions"
        value={stats.totalTransactions.toLocaleString()}
        bgColor="bg-blue-50"
      />
      <StatCard 
        icon={<IndianRupee className="h-8 w-8 text-emerald-500" />}
        title="Total Amount Spent"
        value={`₹${stats.totalAmountSpent.toLocaleString()}`}
        bgColor="bg-emerald-50"
      />
    </div>
  );
}


function StatCard({ icon, title, value, bgColor }) {
  return (
    <Card className={`border-none shadow-sm ${bgColor} transition-all hover:shadow-md`}>
      <CardContent className="flex items-center p-6">
        <div className="mr-4">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
