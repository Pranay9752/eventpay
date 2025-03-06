// app/vendors/[vendorId]/page.tsx
import React from 'react';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VendorProfileHeader from './components/VendorProfileHeader';
import TransactionHistoryTable from './components/TransactionHistoryTable';
import FinancialInsights from './components/FinancialInsights';
import ActionButtons from './components/ActionButtons';

export default async function VendorDetailsPage({ 
  params 
}) {
  // Fetch data server-side
  const vendorDetails = await getVendorDetails(params.vendorId);
  const transactions = await getVendorTransactions(params.vendorId);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <VendorProfileHeader vendor={vendorDetails} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 shadow-md">
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="insights" className='lg:hidden'>Financial Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions" className="space-y-4">
                <TransactionHistoryTable transactions={transactions} />
              </TabsContent>
              
              <TabsContent value="insights" className="lg:hidden">
                <FinancialInsights vendor={vendorDetails} transactions={transactions} />
              </TabsContent>
            </Tabs>
          </Card>
          
          <ActionButtons vendorId={params.vendorId} />
        </div>
        
        <div className="hidden lg:block">
          <Card className="p-6 shadow-md sticky top-6">
            <FinancialInsights vendor={vendorDetails} transactions={transactions} />
          </Card>
        </div>
      </div>
    </div>
  );
}


// lib/data-fetching.ts
// This would typically connect to your API or database

export async function getVendorDetails(vendorId) {
    // In a real application, you would fetch this data from your API
    // For demonstration purposes, returning mock data
    return {
      id: vendorId,
      name: "Taste of India",
      logo: "", // URL to logo image
      terminalId: "TRM" + Math.floor(1000 + Math.random() * 9000),
      totalTransactions: 267,
      totalSales: 329500,
      pendingPayout: 42800,
      lastPayoutDate: "2025-02-15T10:30:00",
      lastTransactionDate: "2025-02-28T16:45:00",
      status: "active",
      platformFees: 16475 // 5% of total sales
    };
  }
  
  export async function getVendorTransactions(vendorId) {
    console.log('vendorId: ', vendorId);
    // In a real application, you would fetch this data from your API
    // For demonstration purposes, returning mock data
    const statuses = ['completed', 'failed', 'pending'];
    
    // Generate mock transactions
    return Array.from({ length: 200 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
      
      const amount = Math.floor(500 + Math.random() * 5000);
      const remainingBalance = Math.floor(1000 + Math.random() * 10000);
      const statusIndex = Math.floor(Math.random() * statuses.length);
      
      return {
        id: `TXN${100000 + i}`,
        date: date.toISOString(),
        userName: `Customer ${i + 1}`,
        nfcCardId: `NFC${10000 + Math.floor(Math.random() * 90000)}`,
        amount,
        remainingBalance,
        status: statuses[statusIndex]
      };
    });
  }