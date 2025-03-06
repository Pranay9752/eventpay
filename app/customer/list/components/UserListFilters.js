// src/components/users/UserListFilters.tsx
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from "@/components/ui/select";
  
  export function CustomerListFilters() {
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <Select defaultValue="all">
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
          
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Spent Amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Amounts</SelectItem>
              <SelectItem value="high">High ({'>'}₹5000)</SelectItem>
              <SelectItem value="medium">Medium (₹1000-₹5000)</SelectItem>
              <SelectItem value="low">Low ({'<'}₹1000)</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="high">High ({'>'}20)</SelectItem>
              <SelectItem value="medium">Medium (5-20)</SelectItem>
              <SelectItem value="low">Low ({'<'}5)</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Balance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Balances</SelectItem>
              <SelectItem value="high">High ({'>'}₹1000)</SelectItem>
              <SelectItem value="medium">Medium (₹200-₹1000)</SelectItem>
              <SelectItem value="low">Low ({'<'}₹200)</SelectItem>
              <SelectItem value="empty">Empty (₹0)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
            Status: Active
            <X className="h-3 w-3 ml-1 cursor-pointer" />
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
            Amount: High ({'>'}₹5000)
            <X className="h-3 w-3 ml-1 cursor-pointer" />
          </Badge>
        </div> */}
      </div>
    );
  }
  