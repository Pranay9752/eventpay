"use client";
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Search,
  Filter,
  Calendar,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  LogOut,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CreateEventPage from "../account/create-event/page";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LogoutButton from "../account/login/components/LogoutButton";
import { logoutAction } from "../account/login/actions/logout";
import { redirect } from "next/navigation";

// Mock data
const mockEvents = [
  {
    id: "EVT001",
    name: "Tech Conference 2024",
    date: "2024-03-15",
    vendors: 25,
    revenue: 125000,
    status: "Active",
    transactions: 340,
    users: 850,
  },
  {
    id: "EVT002",
    name: "Food Festival Spring",
    date: "2024-04-22",
    vendors: 18,
    revenue: 89000,
    status: "Upcoming",
    transactions: 267,
    users: 620,
  },
  {
    id: "EVT003",
    name: "Art & Craft Fair",
    date: "2024-02-10",
    vendors: 32,
    revenue: 156000,
    status: "Completed",
    transactions: 445,
    users: 1200,
  },
  {
    id: "EVT004",
    name: "Music Festival Summer",
    date: "2024-07-08",
    vendors: 42,
    revenue: 298000,
    status: "Upcoming",
    transactions: 789,
    users: 2100,
  },
  {
    id: "EVT005",
    name: "Business Expo",
    date: "2024-01-28",
    vendors: 38,
    revenue: 234000,
    status: "Completed",
    transactions: 612,
    users: 1450,
  },
];

const mockVendors = [
  { id: 1, name: "TechCorp Solutions", payoutStatus: "Paid", sales: 25000 },
  { id: 2, name: "Creative Designs", payoutStatus: "Pending", sales: 18500 },
  { id: 3, name: "Food Delights", payoutStatus: "Paid", sales: 32000 },
  { id: 4, name: "Craft Masters", payoutStatus: "Processing", sales: 15800 },
];

const mockTransactions = [
  {
    id: "TXN001",
    user: "John Doe",
    vendor: "TechCorp Solutions",
    amount: 299,
    date: "2024-03-15",
  },
  {
    id: "TXN002",
    user: "Jane Smith",
    vendor: "Creative Designs",
    amount: 150,
    date: "2024-03-15",
  },
  {
    id: "TXN003",
    user: "Mike Johnson",
    vendor: "Food Delights",
    amount: 45,
    date: "2024-03-14",
  },
  {
    id: "TXN004",
    user: "Sarah Wilson",
    vendor: "Craft Masters",
    amount: 89,
    date: "2024-03-14",
  },
];

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", ticketType: "VIP" },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    ticketType: "Standard",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    ticketType: "Premium",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    ticketType: "Standard",
  },
];

const revenueData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
];

// Metric Card Component
const MetricCard = ({ title, value, icon: Icon, color, trend }) => (
  <Card className="hover:shadow-md transition-shadow duration-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-slate-600">
        {title}
      </CardTitle>
      <Icon className={`h-4 w-4 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      {trend && (
        <p className="text-xs text-slate-500 mt-1">
          <span className="text-emerald-600">+{trend}%</span> from last month
        </p>
      )}
    </CardContent>
  </Card>
);

// Events Dashboard Component
const EventsDashboard = ({ onEventSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const itemsPerPage = 5;

  const filteredEvents = useMemo(() => {
    return mockEvents
      .filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (statusFilter === "All" || event.status === statusFilter)
      )
      .sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (sortOrder === "asc") {
          return aVal > bVal ? 1 : -1;
        }
        return aVal < bVal ? 1 : -1;
      });
  }, [searchTerm, statusFilter, sortField, sortOrder]);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEvents, currentPage]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const totalMetrics = useMemo(() => {
    return mockEvents.reduce(
      (acc, event) => ({
        vendors: acc.vendors + event.vendors,
        transactions: acc.transactions + event.transactions,
        users: acc.users + event.users,
        revenue: acc.revenue + event.revenue,
      }),
      { vendors: 0, transactions: 0, users: 0, revenue: 0 }
    );
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      Active: "bg-emerald-100 text-emerald-800",
      Upcoming: "bg-sky-100 text-sky-800",
      Completed: "bg-slate-100 text-slate-800",
    };
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-start gap-5">
          <h1 className="text-3xl font-bold text-slate-900 mr-auto">Event Dashboard</h1>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Calendar className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <CreateEventPage onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
          <form action={logoutAction}>
            <LogoutButton  className={"w-fit"} icon={LogOut} title={"Logout"} />
          </form>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Vendors"
            value={totalMetrics.vendors.toLocaleString()}
            icon={ShoppingBag}
            color="text-emerald-600"
            trend={12}
          />
          <MetricCard
            title="Total Transactions"
            value={totalMetrics.transactions.toLocaleString()}
            icon={TrendingUp}
            color="text-sky-600"
            trend={8}
          />
          <MetricCard
            title="Total Users"
            value={totalMetrics.users.toLocaleString()}
            icon={Users}
            color="text-indigo-600"
            trend={15}
          />
          <MetricCard
            title="Total Revenue"
            value={`₹${(totalMetrics.revenue / 1000).toFixed(0)}K`}
            icon={DollarSign}
            color="text-amber-600"
            trend={23}
          />
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Events Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search events by name..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="w-4 h-4 mr-2" />
                    Status: {statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Active")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Upcoming")}>
                    Upcoming
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("Completed")}
                  >
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Events Table */}
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead
                      className="cursor-pointer hover:bg-slate-100"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        Event Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-slate-100"
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-slate-100"
                      onClick={() => handleSort("vendors")}
                    >
                      <div className="flex items-center">
                        Vendors
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-slate-100"
                      onClick={() => handleSort("revenue")}
                    >
                      <div className="flex items-center">
                        Revenue
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEvents.map((event) => (
                    <TableRow
                      key={event.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {event.name}
                      </TableCell>
                      <TableCell>
                        {new Date(event.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(event.status)}</TableCell>
                      <TableCell>{event.vendors}</TableCell>
                      <TableCell>₹{event.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                            onClick={() => redirect('/vendors/list')}
                          className="hover:bg-indigo-50 hover:text-indigo-700"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredEvents.length)} of{" "}
                {filteredEvents.length} events
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <span className="text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Event Details Component
const EventDetails = ({ event, onBack }) => {
  const getPayoutStatusBadge = (status) => {
    const colors = {
      Paid: "bg-emerald-100 text-emerald-800",
      Pending: "bg-amber-100 text-amber-800",
      Processing: "bg-sky-100 text-sky-800",
    };
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  const getTicketTypeBadge = (type) => {
    const colors = {
      VIP: "bg-purple-100 text-purple-800",
      Premium: "bg-indigo-100 text-indigo-800",
      Standard: "bg-slate-100 text-slate-800",
    };
    return <Badge className={colors[type]}>{type}</Badge>;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="hover:bg-slate-100"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{event.name}</h1>
            <p className="text-slate-600">
              Event ID: {event.id} • {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Vendors"
            value={event.vendors}
            icon={ShoppingBag}
            color="text-emerald-600"
          />
          <MetricCard
            title="Transactions"
            value={event.transactions}
            icon={TrendingUp}
            color="text-sky-600"
          />
          <MetricCard
            title="Revenue"
            value={`$${event.revenue.toLocaleString()}`}
            icon={DollarSign}
            color="text-amber-600"
          />
          <MetricCard
            title="Registered Users"
            value={event.users}
            icon={Users}
            color="text-indigo-600"
          />
        </div>

        {/* Tabs Section */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="vendors" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="vendors">Vendors</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="vendors" className="space-y-4">
                <h3 className="text-lg font-semibold">Vendor Management</h3>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead>Vendor Name</TableHead>
                        <TableHead>Sales Amount</TableHead>
                        <TableHead>Payout Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockVendors.map((vendor) => (
                        <TableRow key={vendor.id} className="hover:bg-slate-50">
                          <TableCell className="font-medium">
                            {vendor.name}
                          </TableCell>
                          <TableCell>
                            ${vendor.sales.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {getPayoutStatusBadge(vendor.payoutStatus)}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4">
                <h3 className="text-lg font-semibold">Transaction History</h3>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTransactions.map((transaction) => (
                        <TableRow
                          key={transaction.id}
                          className="hover:bg-slate-50"
                        >
                          <TableCell className="font-mono text-sm">
                            {transaction.id}
                          </TableCell>
                          <TableCell>{transaction.user}</TableCell>
                          <TableCell>{transaction.vendor}</TableCell>
                          <TableCell>${transaction.amount}</TableCell>
                          <TableCell>
                            {new Date(transaction.date).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="users" className="space-y-4">
                <h3 className="text-lg font-semibold">Registered Users</h3>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Ticket Type</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-slate-50">
                          <TableCell className="font-medium">
                            {user.name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {getTicketTypeBadge(user.ticketType)}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <h3 className="text-lg font-semibold">Revenue Analytics</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-slate-200"
                      />
                      <XAxis dataKey="name" className="text-slate-600" />
                      <YAxis className="text-slate-600" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main App Component
const EventDashboardApp = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setCurrentView("details");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedEvent(null);
  };

  return (
    <>
      <EventsDashboard onEventSelect={handleEventSelect} />
    </>
  );
};

export default EventDashboardApp;
