"use client";

import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";


const VendorFilters = ({
  filters,
  updateFilter,
  resetFilters,
  maxSales,
  maxTransactions,
  activeFilters,
  CATEGORIES,
  LOCATIONS,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search vendors by name or ID..."
          className="pl-9 h-10 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-10 rounded-xl flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Status:{" "}
              {filters.status === "all"
                ? "All"
                : filters.status.charAt(0).toUpperCase() +
                  filters.status.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => updateFilter("status", "all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilter("status", "active")}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilter("status", "inactive")}
            >
              Inactive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
                <label>Category</label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => updateFilter("category", value)}
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
                <label>Location</label>
                <Select
                  value={filters.location}
                  onValueChange={(value) => updateFilter("location", value)}
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
                <label>Sales Range (₹)</label>
                <Slider
                  defaultValue={filters.salesRange}
                  min={0}
                  max={maxSales}
                  step={1000}
                  onValueChange={(value) => updateFilter("salesRange", value)}
                  className="my-4"
                />
              </div>

              <div className="space-y-4">
                <label>Transaction Count</label>
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
    </div>
  );
};

export default VendorFilters;
