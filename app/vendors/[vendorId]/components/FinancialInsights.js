

// components/vendors/FinancialInsights.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LineChart, BarChart } from 'lucide-react';

export default function FinancialInsights({
  vendor,
  transactions
}) {
  // Calculate platform fees (if not provided)
  const platformFees = vendor.platformFees || vendor.totalSales * 0.05; // Assume 5% platform fee
  const finalAmount = vendor.totalSales - platformFees;
  
  // Calculate average transaction value
  const completedTransactions = transactions.filter(t => t.status === 'completed');
  const avgTransactionValue = completedTransactions.length > 0 
    ? completedTransactions.reduce((sum, t) => sum + t.amount, 0) / completedTransactions.length
    : 0;
  
  // Determine most active time period (simplified version)
  const mostActiveTime = getMostActiveTime(transactions);
  const salesData = getDailySalesData(transactions);
  console.log('salesData: ', salesData);  

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Financial Insights</h3>
          <div className="flex space-x-2">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <LineChart className="h-4 w-4 text-gray-500" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100 bg-gray-100">
              <BarChart className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg mb-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Daily Sales Trend</p>
            <p className="text-xs text-gray-400">(Interactive chart would render here)</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <MetricCard
            label="Average Transaction"
            value={`₹${avgTransactionValue.toFixed(2)}`}
          />
          <MetricCard
            label="Most Active Time"
            value={mostActiveTime}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Payout Summary</h3>
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Sales</span>
              <span className="font-medium">₹{vendor.totalSales.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Platform Fees (5%)</span>
              <span className="font-medium text-red-500">-₹{platformFees.toLocaleString()}</span>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between items-center font-semibold">
              <span>Final Amount</span>
              <span className="text-lg text-purple-600">₹{finalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">Payout Status</span>
              <span className={`text-sm px-2 py-0.5 rounded-full ${
                vendor.pendingPayout > 0 
                  ? 'bg-yellow-100 text-yellow-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {vendor.pendingPayout > 0 ? 'Pending' : 'Completed'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="p-3 bg-white rounded-lg border">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function getMostActiveTime(transactions) {
  // This would typically involve more complex analysis
  // Simplified version for the example
  console.log(transactions)
  return "14:00 - 17:00";
}

function getDailySalesData(transactions) {
  const salesMap = transactions.reduce((acc, t) => {
    const date = new Date(t.date).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + t.amount;
    return acc;
  }, {});

  return Object.keys(salesMap).map((date) => ({
    date,
    sales: salesMap[date],
  }));
}