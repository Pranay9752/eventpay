// src/components/users/UserListTable.tsx
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
  } from "@/components/ui/table";
  import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { 
    MoreHorizontal, 
    Eye, 
    FileText, 
    AlertCircle
  } from "lucide-react";
  import Link from "next/link";
  import { Badge } from "@/components/ui/badge";
  
  // Define the status types and their styles
  const statusStyles = {
    active: "bg-green-100 text-green-800 hover:bg-green-200",
    blocked: "bg-red-100 text-red-800 hover:bg-red-200",
    inactive: "bg-gray-100 text-gray-800 hover:bg-gray-200"
  };
  

  
  async function getUsers() {
    // In a real app, you would fetch this from your API
    return [
      {
        id: "1",
        name: "Priya Sharma",
        nfcId: "NFC-45612",
        totalTransactions: 24,
        amountSpent: 7450,
        remainingBalance: 550,
        lastTransaction: "2025-03-02T14:30:00",
        status: "active"
      },
      {
        id: "2",
        name: "Raj Kumar",
        nfcId: "NFC-78392",
        totalTransactions: 18,
        amountSpent: 5320,
        remainingBalance: 0,
        lastTransaction: "2025-03-01T19:45:00",
        status: "inactive"
      },
      {
        id: "3",
        name: "Ananya Patel",
        nfcId: "NFC-23857",
        totalTransactions: 32,
        amountSpent: 12480,
        remainingBalance: 1520,
        lastTransaction: "2025-03-03T10:15:00",
        status: "active"
      },
      {
        id: "4",
        name: "Vikram Singh",
        nfcId: "NFC-91043",
        totalTransactions: 5,
        amountSpent: 1250,
        remainingBalance: 750,
        lastTransaction: "2025-02-28T16:20:00",
        status: "blocked"
      },
      {
        id: "5",
        name: "Neha Gupta",
        nfcId: "NFC-67284",
        totalTransactions: 15,
        amountSpent: 4780,
        remainingBalance: 220,
        lastTransaction: "2025-03-02T20:10:00",
        status: "active"
      }
    ];
  }
  
  export async function UserListTable() {
    const users = await getUsers();
    
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
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow 
                key={user.id} 
                className="cursor-pointer hover:bg-gray-50"
                // onClick={() => {}}
              >
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.nfcId}</TableCell>
                <TableCell className="text-center">{user.totalTransactions}</TableCell>
                <TableCell className="text-center">₹{user.amountSpent.toLocaleString()}</TableCell>
                <TableCell className="text-center">₹{user.remainingBalance.toLocaleString()}</TableCell>
                <TableCell className="text-center">
                  {new Date(user.lastTransaction).toLocaleString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant="outline" 
                    className={statusStyles[user.status]}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </TableCell>
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
                        <Link href={`/customer/${user.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Export Report
                      </DropdownMenuItem>
                      {user.status !== "blocked" ? (
                        <DropdownMenuItem className="text-red-600">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          Block User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-600">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          Unblock User
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">5</span> of <span className="font-medium">100</span> users
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