// This is a server component
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { VendorsTable } from "./VendorsTable";
import { VendorCards } from "./VendorCards";



export const VendorTabs = ({
  vendors,
  viewMode = "table",
  handleSort,
  sortField,
  SortIcon,
}) => {
  return (
    <Tabs defaultValue="all" className="mb-6">
      <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        <TabsTrigger value="all" className="rounded-lg">
          All Vendors
        </TabsTrigger>
        <TabsTrigger value="active" className="rounded-lg">
          Active
        </TabsTrigger>
        <TabsTrigger value="inactive" className="rounded-lg">
          Inactive
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        {viewMode === "table" ? (
          <VendorsTable
            vendors={vendors}
            handleSort={handleSort}
            sortField={sortField}
            SortIcon={SortIcon}
          />
        ) : (
          <VendorCards vendors={vendors} />
        )}
      </TabsContent>

      <TabsContent value="active">
        {viewMode === "table" ? (
          <VendorsTable
            vendors={vendors.filter((v) => v.status === "active")}
            handleSort={handleSort}
            sortField={sortField}
            SortIcon={SortIcon}
          />
        ) : (
          <VendorCards
            vendors={vendors.filter((v) => v.status === "active")}
          />
        )}
      </TabsContent>

      <TabsContent value="inactive">
        {viewMode === "table" ? (
          <VendorsTable
            vendors={vendors.filter((v) => v.status === "inactive")}
            handleSort={handleSort}
            sortField={sortField}
            SortIcon={SortIcon}
          />
        ) : (
          <VendorCards
            vendors={vendors.filter((v) => v.status === "inactive")}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};