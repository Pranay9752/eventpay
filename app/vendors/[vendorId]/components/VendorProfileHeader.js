// components/vendors/VendorProfileHeader.tsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  CreditCard, 
  Terminal, 
  Clock,
  Activity
} from 'lucide-react';



export default function VendorProfileHeader({ 
  vendor 
}) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100">
      {/* Colorful top banner with patterns */}
      <div className="h-28 relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
                 backgroundSize: '20px 20px'
               }}>
          </div>
        </div>
        <div className="absolute top-6 right-6">
          <Badge className={`${
            vendor.status === 'active' 
              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
              : 'bg-red-100 text-red-800 hover:bg-red-100'
          } px-3 py-1 text-sm font-medium rounded-full`}>
            {vendor.status === 'active' ? '● Active' : '● Inactive'}
          </Badge>
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar section */}
          <div className="-mt-12 flex flex-col items-center md:items-start">
            <Avatar className="w-24 h-24 rounded-xl border-4 border-white shadow-lg bg-white">
              {vendor.logo ? (
                <AvatarImage src={vendor.logo} alt={vendor.name} />
              ) : (
                <AvatarFallback className="text-2xl rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                  {vendor.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="mt-3 text-center md:text-left">
              <h1 className="text-2xl font-bold">{vendor.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Terminal className="h-3 w-3 text-gray-400" />
                <span className="text-sm text-gray-500">ID: {vendor.id} • Terminal: {vendor.terminalId}</span>
              </div>
            </div>
          </div>
          
          {/* Stats cards section - desktop layout */}
          <div className="hidden md:flex flex-1 justify-end items-center mt-3">
            <div className="grid grid-cols-4 gap-3 w-full max-w-3xl">
              <StatCard 
                icon={<ShoppingBag className="w-5 h-5" />}
                label="Transactions"
                value={vendor.totalTransactions.toString()}
                color="bg-blue-500"
              />
              <StatCard 
                icon={<CreditCard className="w-5 h-5" />}
                label="Total Sales"
                value={`₹${vendor.totalSales.toLocaleString()}`}
                color="bg-purple-500"
              />
              <StatCard 
                icon={<Activity className="w-5 h-5" />}
                label="Pending Payout"
                value={`₹${vendor.pendingPayout.toLocaleString()}`}
                color="bg-pink-500"
              />
              <StatCard 
                icon={<Clock className="w-5 h-5" />}
                label="Last Transaction"
                value={formatDate(vendor.lastTransactionDate)}
                color="bg-indigo-500"
              />
            </div>
          </div>
        </div>
        
        {/* Stats cards section - mobile layout */}
        <div className="md:hidden grid grid-cols-2 gap-3 mt-4">
          <StatCard 
            icon={<ShoppingBag className="w-5 h-5" />}
            label="Transactions"
            value={vendor.totalTransactions.toString()}
            color="bg-blue-500"
          />
          <StatCard 
            icon={<CreditCard className="w-5 h-5" />}
            label="Total Sales"
            value={`₹${vendor.totalSales.toLocaleString()}`}
            color="bg-purple-500"
          />
          <StatCard 
            icon={<Activity className="w-5 h-5" />}
            label="Pending Payout"
            value={`₹${vendor.pendingPayout.toLocaleString()}`}
            color="bg-pink-500"
          />
          <StatCard 
            icon={<Clock className="w-5 h-5" />}
            label="Last Transaction"
            value={formatDate(vendor.lastTransactionDate)}
            color="bg-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  color = "bg-blue-500"
}) {
  return (
    <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden relative group">
      <div className={`absolute -top-6 -left-6 w-12 h-12 rounded-full ${color} opacity-10 group-hover:scale-150 transition-transform duration-300`}></div>
      <div className={`w-8 h-8 rounded-full ${color} bg-opacity-10 flex items-center justify-center mb-2`}>
        <div className={`text-${color.replace('bg-', '')}`}>
          {icon}
        </div>
      </div>
      <p className="text-gray-500 text-xs font-medium">{label}</p>
      <p className="font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', { 
    day: 'numeric', 
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
}