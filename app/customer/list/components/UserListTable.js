// src/components/users/UserListTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";



export function UserListTable({ customers = [] }) {

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">User Name</TableHead>
            <TableHead>NFC ID</TableHead>
            <TableHead className="text-center">Transactions</TableHead>
            <TableHead className="text-center">Amount Spent (₹)</TableHead>
            <TableHead className="text-center">Balance (₹)</TableHead>
            <TableHead className="text-center">Last Transaction</TableHead>
            {/* <TableHead className="text-center">Status</TableHead> */}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((user) => (
            <TableRow
              key={user.customerId}
              className="cursor-pointer hover:bg-gray-50"
              // onClick={() => {}}
            >
              <TableCell className="font-medium">{user.customer_name || ""}</TableCell>
              <TableCell>{user.card_uid || ""}</TableCell>
              <TableCell className="text-center">
                {user.total_transactions || 0}
              </TableCell>
              <TableCell className="text-center">
                ₹{(user.total_revenue || 0).toLocaleString()}
              </TableCell>
              <TableCell className="text-center">
                ₹{(user.balance || 0).toLocaleString()}
              </TableCell>
              <TableCell className="text-center">
                {new Date(user.last_transaction_at).toLocaleString("en-IN", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              {/* <TableCell className="text-center">
                <Badge variant="outline" className={statusStyles[user.status]}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </Badge>
              </TableCell> */}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/customer/${user.customerId}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Export Report
                    </DropdownMenuItem> */}
                    {/* {user.status !== "blocked" ? (
                      <DropdownMenuItem className="text-red-600">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Block User
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className="text-green-600">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Unblock User
                      </DropdownMenuItem>
                    )} */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-4 py-3 border-t">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium">5</span> of{" "}
          <span className="font-medium">100</span> users
        </p>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-indigo-50">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
