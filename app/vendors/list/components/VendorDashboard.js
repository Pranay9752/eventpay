"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  SlidersHorizontal,
  ShoppingBag,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  FileDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { VendorsTable } from "./VendorsTable";
import { VendorCards } from "./VendorCards";
import { formatCurrency } from "@/lib/utils";

// Define constants
const CATEGORIES = [
  "Electronics",
  "Food & Beverage",
  "Apparel",
  "Services",
  "Software",
];
const LOCATIONS = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
];

export const VendorManagementDashboard = ({
  initialVendors,
}) => {
  // Sample vendor data - in real app, this would come from props (initialVendors)
  const vendors = initialVendors || [
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

  // Determine max values for sliders
  const maxSales = Math.max(...vendors.map((v) => v?.totalSales));
  const maxTransactions = Math.max(...vendors.map((v) => v.totalTransactions));

  // State variables
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    category: "all",
    location: "all",
    salesRange: [0, maxSales],
    transactionRange: [0, maxTransactions],
    dateRange: {
      from: new Date(2024, 0, 1),
      to: new Date(),
    },
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState("table");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Apply all filters
  const filteredVendors = vendors.filter((vendor) => {
    // Search filter (checks name and ID)
    const matchesSearch =
      !filters.search ||
      vendor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      vendor.id.toLowerCase().includes(filters.search.toLowerCase());

    // Status filter
    const matchesStatus =
      filters.status === "all" || vendor.status === filters.status;

    // Category filter
    const matchesCategory =
      filters.category === "all" || vendor.category === filters.category;

    // Location filter
    const matchesLocation =
      filters.location === "all" || vendor.location === filters.location;

    // Sales range filter
    const matchesSales =
      vendor.totalSales >= filters.salesRange[0] &&
      vendor.totalSales <= filters.salesRange[1];

    // Transaction range filter
    const matchesTransactions =
      vendor.totalTransactions >= filters.transactionRange[0] &&
      vendor.totalTransactions <= filters.transactionRange[1];

    // Date range filter
    let matchesDateRange = true;
    if (filters.dateRange && filters.dateRange.from && filters.dateRange.to) {
      if (vendor.lastTransaction) {
        const txnDate = new Date(vendor.lastTransaction);
        matchesDateRange =
          txnDate >= filters.dateRange.from && txnDate <= filters.dateRange.to;
      } else {
        matchesDateRange = false; // No transaction date doesn't match date filter
      }
    }

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesLocation &&
      matchesSales &&
      matchesTransactions &&
      matchesDateRange
    );
  });

  // Sorting logic
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    // For numeric comparisons and handling null values (e.g., lastTransaction)
    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return sortDirection === "asc" ? -1 : 1;
    if (bValue === null) return sortDirection === "asc" ? 1 : -1;

    // TypeScript needs this check even though we've handled null
    if (aValue && bValue) {
      return sortDirection === "asc"
        ? aValue < bValue
          ? -1
          : 1
        : bValue < aValue
        ? -1
        : 1;
    }

    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendors = sortedVendors.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedVendors.length / itemsPerPage);

  // Calculate active filters count
  const activeFilters = Object.entries(filters).reduce(
    (count, [key, value]) => {
      if (key === "search" && value !== "") return count + 1;
      if (key === "status" && value !== "all") return count + 1;
      if (key === "category" && value !== "all") return count + 1;
      if (key === "location" && value !== "all") return count + 1;
      if (key === "salesRange" && (value[0] > 0 || value[1] < maxSales))
        return count + 1;
      if (
        key === "transactionRange" &&
        (value[0] > 0 || value[1] < maxTransactions)
      )
        return count + 1;
      return count;
    },
    0
  );

  // Handler functions
   const updateFilter = (
     key,
     value
   ) => {
     setFilters((prev) => ({ ...prev, [key]: value }));
     if (currentPage !== 1) setCurrentPage(1); // Reset to first page when filter changes
   };

  const resetFilters = () => {
    setFilters({
      search: "",
      status: "all",
      category: "all",
      location: "all",
      salesRange: [0, maxSales],
      transactionRange: [0, maxTransactions],
      dateRange: {
        from: new Date(2024, 0, 1),
        to: new Date(),
      },
    });
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    const newDirection =
      field === sortField && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
  };



  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ArrowUpDown className="ml-1 h-4 w-4" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  return (
    <div>
      {/* View mode toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <FileDown className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Print View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search vendors by name or ID..."
            className="pl-9 h-10 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={filters.search}
            onChange={(e) =>
              updateFilter("search", e.target.value)
            }
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 rounded-xl flex items-center gap-1"
              >
                <Filter className="h-4 w-4" />
                Status:{" "}
                {filters.status === "all"
                  ? "All"
                  : filters.status === "active"
                  ? "Active"
                  : "Inactive"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => updateFilter("status", "all")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateFilter("status", "active")}
              >
                Active
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateFilter("status", "inactive")}
              >
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="h-10 rounded-xl flex items-center gap-1 relative"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Advanced Filters
                {activeFilters > 0 && (
                  <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full ml-1 bg-indigo-600">
                    {activeFilters}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md px-5 py-2">
              <SheetHeader>
                <SheetTitle>Filter Vendors</SheetTitle>
                <SheetDescription>
                  Apply multiple filters to narrow down your vendor list
                </SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) =>
                      updateFilter("category", value)
                    }
                  >
                    <SelectTrigger className="h-10 rounded-lg w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select
                    value={filters.location}
                    onValueChange={(value) =>
                      updateFilter("location", value)
                    }
                  >
                    <SelectTrigger className="h-10 rounded-lg w-full">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {LOCATIONS.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Sales Range (₹)</Label>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{formatCurrency(filters.salesRange[0])}</span>
                    <span>{formatCurrency(filters.salesRange[1])}</span>
                  </div>
                  <Slider
                    defaultValue={filters.salesRange}
                    min={0}
                    max={maxSales}
                    step={1000}
                    onValueChange={(value) =>
                      updateFilter("salesRange", value)
                    }
                    className="my-4"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Transaction Count</Label>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{filters.transactionRange[0]}</span>
                    <span>{filters.transactionRange[1]}</span>
                  </div>
                  <Slider
                    defaultValue={filters.transactionRange}
                    min={0}
                    max={maxTransactions}
                    step={5}
                    onValueChange={(value) =>
                      updateFilter("transactionRange", value)
                    }
                    className="my-4"
                  />
                </div>
              </div>

              <SheetFooter className="flex flex-row gap-2 sm:justify-end">
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
                <SheetClose asChild>
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    Apply Filters
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

        </div>
        <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={() =>
              setViewMode(viewMode === "table" ? "cards" : "table")
            }
          >
            {viewMode === "table" ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <ShoppingBag className="h-4 w-4" />
            )}
            {viewMode === "table" ? "Card View" : "Table View"}
          </Button>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="all" className="mb-6">
        

        <TabsContent value="all">
          {viewMode === "table" ? (
            <VendorsTable
              vendors={currentVendors}
              handleSort={handleSort}
              sortField={sortField}
              SortIcon={SortIcon}
            />
          ) : (
            <VendorCards vendors={currentVendors} />
          )}
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {sortedVendors.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, sortedVendors.length)} of{" "}
            {sortedVendors.length} vendors
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-lg"
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
              }
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            <div className="flex items-center">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Logic to show current page and nearby pages
                let pageToShow = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageToShow = currentPage - 3 + i;
                }
                if (pageToShow > totalPages) return null;

                return (
                  <Button
                    key={pageToShow}
                    variant={currentPage === pageToShow ? "default" : "outline"}
                    size="sm"
                    className={`h-9 w-9 rounded-lg ${
                      currentPage === pageToShow ? "bg-indigo-600" : ""
                    }`}
                    onClick={() => setCurrentPage(pageToShow)}
                  >
                    {pageToShow}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-lg"
              onClick={() =>
                setCurrentPage(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* No results state */}
      {filteredVendors.length === 0 && (
        <div className="text-center py-16">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-200">
            No vendors found
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter parameters
          </p>
          <Button variant="outline" className="mt-4" onClick={resetFilters}>
            Reset all filters
          </Button>
        </div>
      )}
    </div>
  );
};
