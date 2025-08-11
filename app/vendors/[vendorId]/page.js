// app/vendors/[vendorId]/page.tsx
import React from "react";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VendorProfileHeader from "./components/VendorProfileHeader";
import TransactionHistoryTable from "./components/TransactionHistoryTable";
import FinancialInsights from "./components/FinancialInsights";
import ActionButtons from "./components/ActionButtons";
import {
  getVendorDetails,
  getVendorTransactions,
} from "./actions/vendorActions";

export default async function VendorDetailsPage({ params }) {
  const { vendorId } = await params;
  // Fetch data server-side
  const vendorDetails = await getVendorDetails(vendorId);
  console.log("vendorDetails: ", vendorDetails);
  const transactions = await getVendorTransactions(vendorId);
  console.log("transactions: ", transactions);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <VendorProfileHeader vendor={vendorDetails?.data || {}} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 shadow-md">
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="insights" className="lg:hidden">
                  Financial Insights
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transactions" className="space-y-4">
                <TransactionHistoryTable
                  transactions={transactions?.data || []}
                />
              </TabsContent>

              <TabsContent value="insights" className="lg:hidden">
                {/* <FinancialInsights
                  vendor={vendorDetails}
                  transactions={transactions}
                /> */}
              </TabsContent>
            </Tabs>
          </Card>

          <ActionButtons vendorId={vendorId} />
        </div>

        <div className="hidden lg:block">
          <Card className="p-6 shadow-md sticky top-6">
            {/* <FinancialInsights
              vendor={vendorDetails}
              transactions={transactions}
            /> */}
          </Card>
        </div>
      </div>
    </div>
  );
}
