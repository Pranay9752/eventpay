import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';


export const VendorCards = ({
    vendors,
  }) => {
    return (
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        {vendors.map((vendor) => (
          <motion.div 
            key={vendor.id}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
          >
            <Card className="h-full hover:shadow-md transition-shadow overflow-hidden border-gray-200 dark:border-gray-700">
              <div className={`h-2 w-full ${
                vendor.status === 'active' 
                  ? 'bg-gradient-to-r from-green-400 to-green-500' 
                  : 'bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600'
              }`}></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-medium">
                      {vendor.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{vendor.name}</CardTitle>
                      <p className="text-xs text-gray-500">ID: {vendor.id} | Terminal: {vendor.terminalId}</p>
                    </div>
                  </div>
                  <Badge
                    className={`${
                      vendor.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                  >
                    {vendor.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="font-medium">{vendor.category}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-medium">{vendor.location}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Total Sales</p>
                    <p className="font-bold text-lg">{formatCurrency(vendor.totalSales)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Transactions</p>
                    <p className="font-bold text-lg">{vendor.totalTransactions}</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Pending payout:</span>
                    <span className="font-medium">{formatCurrency(vendor.pendingPayout)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last transaction:</span>
                    <span className="font-medium">{formatDate(vendor.lastTransaction)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-indigo-600">
                  View Details
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-indigo-600">
                  View Transactions
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    );
  };
  