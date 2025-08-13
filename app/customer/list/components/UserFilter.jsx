'use client';

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserListTable } from "./UserListTable";

// Client-side filtering logic
function filterCustomers(customers, { search, status, spent, transactions, balance }) {
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

    // Status filter
    if (status && status !== "all") {
      if (status === "active" && cust.total_transactions === 0) return false;
      if (status === "blocked") return false; // Placeholder
      if (status === "inactive" && cust.total_transactions > 0) return false;
    }

    // Spent amount filter
    if (spent && spent !== "all") {
      if (spent === "high" && cust.total_revenue <= 5000) return false;
      if (spent === "medium" && (cust.total_revenue < 1000 || cust.total_revenue > 5000)) return false;
      if (spent === "low" && cust.total_revenue >= 1000) return false;
    }

    // Transactions filter
    if (transactions && transactions !== "all") {
      if (transactions === "high" && cust.total_transactions <= 20) return false;
      if (transactions === "medium" && (cust.total_transactions < 5 || cust.total_transactions > 20)) return false;
      if (transactions === "low" && cust.total_transactions >= 5) return false;
    }

    // Balance filter
    if (balance && balance !== "all") {
      if (balance === "high" && cust.balance <= 1000) return false;
      if (balance === "medium" && (cust.balance < 200 || cust.balance > 1000)) return false;
      if (balance === "low" && cust.balance >= 200) return false;
      if (balance === "empty" && cust.balance !== 0) return false;
    }

    return true;
  });
}

// Client-side component to handle filters and table
function UserListClient({ initialCustomers }) {
    console.log('initialCustomers: ', initialCustomers);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    spent: "all",
    transactions: "all",
    balance: "all",
  });
  const [filteredCustomers, setFilteredCustomers] = useState(initialCustomers);

  // Update filtered customers when filters or initial data change
  useEffect(() => {
    const result = filterCustomers(initialCustomers, filters);
    setFilteredCustomers(result);
  }, [filters, initialCustomers]);

  // Handle input changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="flex   justify-between items-start sm:items-center gap-4">

        <div className="flex flex-1 flex-wrap gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder="Search by name or NFC ID..."
            className="pl-10 w-full"
          />
        </div>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.spent}
            onValueChange={(value) => handleFilterChange("spent", value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Spent Amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Amounts</SelectItem>
              <SelectItem value="high">High (&gt;₹5000)</SelectItem>
              <SelectItem value="medium">Medium (₹1000-₹5000)</SelectItem>
              <SelectItem value="low">Low (&lt;₹1000)</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.transactions}
            onValueChange={(value) => handleFilterChange("transactions", value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="high">High (&gt;20)</SelectItem>
              <SelectItem value="medium">Medium (5-20)</SelectItem>
              <SelectItem value="low">Low (&lt;5)</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.balance}
            onValueChange={(value) => handleFilterChange("balance", value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Balance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Balances</SelectItem>
              <SelectItem value="high">High (&gt;₹1000)</SelectItem>
              <SelectItem value="medium">Medium (₹200-₹1000)</SelectItem>
              <SelectItem value="low">Low (&lt;₹200)</SelectItem>
              <SelectItem value="empty">Empty (₹0)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


      <UserListTable customers={filteredCustomers} />
    </div>
  );
}

export default UserListClient