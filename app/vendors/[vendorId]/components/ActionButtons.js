import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CreditCard, DownloadCloud, Users, PowerOff, AlertCircle } from "lucide-react";
import { deactivateVendor, settlePayout } from "../actions/vendorActions";

export default function ActionButtons({ vendorId }) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Settle Payout - Uses a form submission */}
      {/* <form action={settlePayout.bind(null, vendorId)}>
        <Button 
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Settle Payout
        </Button>
      </form> */}

      {/* Export Report (Handled on client, no backend needed) */}
      {/* <Button variant="outline" >
        <DownloadCloud className="mr-2 h-4 w-4" />
        Export Report
      </Button> */}

      {/* View Transactions (Handled on client, no backend needed) */}
      <Button variant="outline" >
        <Users className="mr-2 h-4 w-4" />
        View User Transactions
      </Button>

      {/* Deactivate Vendor - Uses a form submission */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50">
            <PowerOff className="mr-2 h-4 w-4" />
            Deactivate Vendor
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertCircle className="h-6 w-6 text-red-500 mb-2" />
            <AlertDialogTitle>Deactivate this vendor?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will prevent the vendor from processing new transactions. 
              Existing data will be preserved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={deactivateVendor.bind(null, vendorId)}>
              <AlertDialogAction type="submit" className="bg-red-500 hover:bg-red-600">
                Deactivate
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}