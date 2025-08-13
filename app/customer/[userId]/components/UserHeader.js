"use client"
import React, { JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
  User,
  CreditCard,
  Download,
  AlertTriangle,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  DollarSign,
  Activity,
} from "lucide-react";






const getStatusColor = (status) => {
  switch (status) {
    case true:
      return "bg-green-500";
    case false:
      return "bg-yellow-500";
    case "blocked":
      return "bg-red-500";
    case "completed":
      return "text-green-600";
    case "pending":
      return "text-yellow-600";
    case "failed":
      return "text-red-600";
    default:
      return "bg-gray-500";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "true":
      return <CheckCircle className="w-4 h-4 mr-1" />;
    case "pending":
      return <Clock className="w-4 h-4 mr-1" />;
    case "false":
      return <XCircle className="w-4 h-4 mr-1" />;
    default:
      return null;
  }
};




export const UserHeader = ({
  user,
  onResetNFCCard,
  onBlockUser,
  onUnblockUser,
}) => (
  <div className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 rounded-2xl p-6 shadow-lg mb-6 relative overflow-hidden">
    {/* Abstract background shapes */}
    <div className="absolute top-0 left-0 w-full h-full opacity-10">
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white"></div>
      <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-white"></div>
    </div>

    <div className="flex flex-wrap items-center justify-between relative z-10">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <div className="relative">
          <Avatar className="h-20 w-20 border-4 border-white shadow-md">
            <AvatarImage src={user?.profileImage} alt={user?.name} />
            <AvatarFallback className="bg-white text-fuchsia-600 text-2xl">
              {user.name?.split(" ")?.map((n) => n[0])?.join("") || ""}
            </AvatarFallback>
          </Avatar>
          <span
            className={`absolute bottom-0 right-0 w-6 h-6 rounded-full ${getStatusColor(
              user.status
            )} border-4 border-white`}
          ></span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <div className="flex items-center mt-1">
            <Badge className="bg-white/20 text-white mr-2">
            {user.status ? "Active" : "In-active"}
            </Badge>
            <span className="text-white/80 text-sm">ID: {user.customerId}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {/* <Button
          variant="outline"
          className="bg-white/10 text-white hover:bg-white/20 border-white/20 transition-all hover:scale-105"
          onClick={onResetNFCCard}
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Reset NFC Card
        </Button> */}
        {/* {user.status === "blocked" ? (
          <Button
            variant="outline"
            className="bg-white/10 text-white hover:bg-white/20 border-white/20 transition-all hover:scale-105"
            onClick={onUnblockUser}
          >
            <CheckCircle className="mr-2 h-4 w-4" /> Unblock User
          </Button>
        ) : (
          <Button
            variant="outline"
            className="bg-white/10 text-white hover:bg-white/20 border-white/20 transition-all hover:scale-105"
            onClick={onBlockUser}
          >
            <AlertTriangle className="mr-2 h-4 w-4" /> Block User
          </Button>
        )} */}
      </div>
    </div>
  </div>
);


export const UserInfoCard = ({ user }) => (
  <Card className="overflow-hidden border-none shadow-md bg-white hover:shadow-lg transition-all duration-300">
    <CardHeader className="bg-gradient-to-r from-violet-50 to-fuchsia-50 py-4">
      <CardTitle className="flex items-center text-violet-700">
        <User className="mr-2 h-5 w-5" /> User Information
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-6">
      <dl className="space-y-4">
        <div>
          <dt className="text-sm font-medium text-gray-500">Email</dt>
          <dd className="mt-1 text-sm">{user?.email || ""}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Phone</dt>
          <dd className="mt-1 text-sm">{user?.phoneNo || ""}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">NFC Card ID</dt>
          <dd className="mt-1 text-sm font-mono bg-gray-100 p-1 rounded">
            {user?.card_uid || ""}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">
            Registration Date
          </dt>
          <dd className="mt-1 text-sm">
            {format(user.createdAt, "PPP")}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Last Login</dt>
          <dd className="mt-1 text-sm">{format(user.updatedAt, "PPP p")}</dd>
        </div>
      </dl>
    </CardContent>
  </Card>
);


export const FinancialSummary = ({ user }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
    <Card className="border-none shadow-md bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
      <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-green-200 opacity-40"></div>
      <CardContent className="pt-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-green-500/10 mb-3">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-sm font-medium text-gray-600">Total Spent</p>
          <p className="text-2xl font-bold text-gray-800">
            ₹{user.totalSpent.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>

    <Card className="border-none shadow-md bg-gradient-to-br from-blue-50 to-cyan-100 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
      <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-blue-200 opacity-40"></div>
      <CardContent className="pt-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-blue-500/10 mb-3">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-sm font-medium text-gray-600">Balance</p>
          <p className="text-2xl font-bold text-gray-800">
            ₹{user.remainingBalance.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>

    <Card className="border-none shadow-md bg-gradient-to-br from-purple-50 to-indigo-100 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-purple-200 opacity-40"></div>
      <CardContent className="pt-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-purple-500/10 mb-3">
            <Activity className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-sm font-medium text-gray-600">Avg. Transaction</p>
          <p className="text-2xl font-bold text-gray-800">
            ₹{user.averageTransaction.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);


export const TransactionsTable = ({
  transactions,
  // onExport,
}) => (
  <div className="p-4 bg-white rounded-lg">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-gray-800">Transaction History</h3>
      <div className="flex space-x-2">
        {/* <Button
          variant="outline"
          size="sm"
          className="hover:bg-gray-100 transition-all"
        >
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button> */}
        {/* <Button
          variant="outline"
          size="sm"
          className="hover:bg-gray-100 transition-all"
          onClick={onExport}
        >
          <Download className="h-4 w-4 mr-2" /> Export
        </Button> */}
      </div>
    </div>

    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Amount</TableHead>
            {/* <TableHead>Balance</TableHead> */}
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id} className="hover:bg-gray-50">
              <TableCell className="font-mono text-xs">
                {transaction._id}
              </TableCell>
              <TableCell>
                {format(transaction.createdAt, "dd MMM yyyy, HH:mm")}
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{transaction.vendorName || ""}</div>
                  <div className="text-xs text-gray-500">
                    Terminal: {transaction.card_uid}
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                ₹{transaction?.amount || 0}
              </TableCell>
              {/* <TableCell>₹{transaction.remainingBalance}</TableCell> */}
              <TableCell>
                <div
                  className={`flex items-center font-semibold ${
                    transaction.status == "true"  ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {getStatusIcon(transaction.status)}
                 
                    {
                      transaction.status == "true" ? "Completed" : "Failed"
                    }
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);


export const TopUpsTable = ({
  topUps,
}) => (
  <div className="p-4 bg-white rounded-lg">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-gray-800">Top-Up History</h3>
      {/* <Button
        variant="outline"
        size="sm"
        className="hover:bg-gray-100 transition-all"
        onClick={onExport}
      >
        <Download className="h-4 w-4 mr-2" /> Export
      </Button> */}
    </div>

    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topUps.map((topUp) => (
            <TableRow key={topUp.id} className="hover:bg-gray-50">
              <TableCell className="font-mono text-xs">{topUp.id}</TableCell>
              <TableCell>
                {format(topUp.dateTime, "dd MMM yyyy, HH:mm")}
              </TableCell>
              <TableCell className="font-medium">₹{topUp.amount}</TableCell>
              <TableCell>{topUp.method}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);
