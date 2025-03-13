import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Users, ShoppingBag, TrendingUp, Wallet } from "lucide-react";

export const StatsCards = ({ vendors }) => {
    // Stats calculation
    const totalVendors = vendors.length;
    const totalTransactions = vendors.reduce((sum, vendor) => sum + vendor.totalTransactions, 0);
    const totalRevenue = vendors.reduce((sum, vendor) => sum + vendor.totalSales, 0);
    const totalPending = vendors.reduce((sum, vendor) => sum + vendor.pendingPayout, 0);
  
    const stats = [
      { title: "Total Vendors", value: totalVendors, icon: <Users className="h-5 w-5 text-blue-500" />, color: "blue" },
      { title: "Total Transactions", value: totalTransactions, icon: <ShoppingBag className="h-5 w-5 text-purple-500" />, color: "purple" },
      { title: "Total Revenue", value: formatCurrency(totalRevenue), icon: <TrendingUp className="h-5 w-5 text-green-500" />, color: "green" },
      // { title: "Pending Payouts", value: formatCurrency(totalPending), icon: <Wallet className="h-5 w-5 text-amber-500" />, color: "amber" },
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map(({ title, value, icon, color }, index) => (
          <Card key={index} className="relative overflow-hidden border-none shadow-md ">
            <div className={`absolute inset-0 bg-gradient-to-br from-${color}-50 to-${color}-100 dark:from-${color}-900/20 dark:to-${color}-800/10 z-0`}></div>
            <CardHeader className="relative z-10 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className={`text-sm font-medium text-${color}-600 dark:text-${color}-300`}>{title}</CardTitle>
                {icon}
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl md:text-3xl font-bold">{value}</div>
            </CardContent>
          </Card>
      ))}
    </div>
    );
  };
  