// src/app/dashboard/users/page.tsx
import { Suspense } from "react";
import { UserStats } from "./components/UserStats";
import { UserListHeader } from "./components/UserListHeader";
import { CustomerListFilters } from "./components/UserListFilters";
import { UserListTable } from "./components/UserListTable";
import { fetchAllTransactions } from "../actions/fetchAllTransactions";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserListClient from "./components/UserFilter";

// Server-side filtering
function filterCustomers(
  customers,
  { search, status, spent, transactions, balance }
) {
  return customers.filter((cust) => {
    // Search filter
    if (search) {
      const term = search.toLowerCase();
      if (
        !cust.customer_name.toLowerCase().includes(term) &&
        !cust.card_uid.toLowerCase().includes(term)
      ) {
        return false;
      }
    }

    // Status filter (example — adjust based on your data)
    if (status && status !== "all") {
      if (status === "active" && cust.total_transactions === 0) return false;
      if (status === "blocked") return false; // Example placeholder
      if (status === "inactive" && cust.total_transactions > 0) return false;
    }

    // Spent amount filter
    if (spent && spent !== "all") {
      if (spent === "high" && cust.total_revenue <= 5000) return false;
      if (
        spent === "medium" &&
        (cust.total_revenue < 1000 || cust.total_revenue > 5000)
      )
        return false;
      if (spent === "low" && cust.total_revenue >= 1000) return false;
    }

    // Transactions filter
    if (transactions && transactions !== "all") {
      if (transactions === "high" && cust.total_transactions <= 20)
        return false;
      if (
        transactions === "medium" &&
        (cust.total_transactions < 5 || cust.total_transactions > 20)
      )
        return false;
      if (transactions === "low" && cust.total_transactions >= 5) return false;
    }

    // Balance filter
    if (balance && balance !== "all") {
      if (balance === "high" && cust.balance <= 1000) return false;
      if (balance === "medium" && (cust.balance < 200 || cust.balance > 1000))
        return false;
      if (balance === "low" && cust.balance >= 200) return false;
      if (balance === "empty" && cust.balance !== 0) return false;
    }

    return true;
  });
}

export default async function CustomerListPage() {

  const customersData = await fetchAllTransactions();
  const customers = customersData?.data || [];
  console.log('customers: ', customers);



  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-8">
        User Management
      </h1>

      <UserStats customers={customers || []} />
      <UserListClient initialCustomers={customers || []} />
    </div>
  );
}
