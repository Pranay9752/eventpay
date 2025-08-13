// src/components/users/UserListHeader.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";

export function UserListHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search by name or NFC ID..." 
          className="pl-10 w-full"
        />
      </div>
      {/* <Button className="bg-indigo-600 hover:bg-indigo-700">
        <Download className="mr-2 h-4 w-4" />
        Export All
      </Button> */}
    </div>
  );
}