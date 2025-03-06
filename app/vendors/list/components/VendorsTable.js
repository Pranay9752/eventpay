import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronRight, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const VendorsTable = ({
  vendors,
  handleSort,
  SortIcon,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-900/50">
            <TableHead
              className="cursor-pointer hover:text-indigo-600 transition-colors font-semibold"
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center">
                ID <SortIcon field="id" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-indigo-600 transition-colors font-semibold"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Vendor <SortIcon field="name" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-indigo-600 transition-colors font-semibold"
              onClick={() => handleSort("totalTransactions")}
            >
              <div className="flex items-center">
                Transactions <SortIcon field="totalTransactions" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-indigo-600 transition-colors font-semibold"
              onClick={() => handleSort("totalSales")}
            >
              <div className="flex items-center">
                Sales <SortIcon field="totalSales" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-indigo-600 transition-colors font-semibold"
              onClick={() => handleSort("pendingPayout")}
            >
              <div className="flex items-center">
                Pending <SortIcon field="pendingPayout" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-indigo-600 transition-colors font-semibold"
              onClick={() => handleSort("lastTransaction")}
            >
              <div className="flex items-center">
                Last Activity <SortIcon field="lastTransaction" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-indigo-600 transition-colors font-semibold"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                Status <SortIcon field="status" />
              </div>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow
              key={vendor.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors cursor-pointer"
            >
              <TableCell className="font-medium">{vendor.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-300 to-purple-300 flex items-center justify-center text-white font-medium">
                      {vendor.name.charAt(0)}
                    </div>
                    {vendor.status === "active" && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{vendor.name}</div>
                    <div className="text-xs text-gray-500">
                      Terminal ID: {vendor.terminalId}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{vendor.totalTransactions}</TableCell>
              <TableCell>{formatCurrency(vendor.totalSales)}</TableCell>
              <TableCell>{formatCurrency(vendor.pendingPayout)}</TableCell>
              <TableCell>{formatDate(vendor.lastTransaction)}</TableCell>
              <TableCell>
                <Badge
                  className={`${
                    vendor.status === "active"
                      ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {vendor.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80">
                      <div className="space-y-3">
                        <h4 className="font-medium">{vendor.name} Details</h4>
                        <Separator />
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <span className="text-gray-500">Category:</span>
                          <span>{vendor.category}</span>
                          <span className="text-gray-500">Location:</span>
                          <span>{vendor.location}</span>
                          <span className="text-gray-500">Terminal ID:</span>
                          <span>{vendor.terminalId}</span>
                          <span className="text-gray-500">Status:</span>
                          <span>
                            {vendor.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-end">
                          <Button asChild size="sm"><Link href={`/vendors/${vendor.id}`}>View Full Details</Link></Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/vendors/${vendor.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem>Edit Vendor</DropdownMenuItem> */}
                      <DropdownMenuItem>View Transactions</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className={
                          vendor.status === "active"
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {vendor.status === "active"
                          ? "Deactivate Vendor"
                          : "Activate Vendor"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
