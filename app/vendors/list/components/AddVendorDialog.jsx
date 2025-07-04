


'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { createVendor } from '../../actions/addVendor';
import { toast } from 'sonner';


const VendorSchema = z.object({
  businessname: z.string().min(1, 'Business name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone number must be 10 digits'),
});

export function AddVendorDialog({ onVendorAdded }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
        resolver: zodResolver(VendorSchema),
  });

  async function onSubmit(data) {
    try {
      const result = await createVendor(data);

      if (result.success) {
        toast({ title: 'Success', description: 'Vendor created successfully!' });
        reset();
        setOpen(false);
        onVendorAdded?.();
      } else {
        toast({
          title: 'Error',
          description: result.message || 'Failed to create vendor',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => !isSubmitting && setOpen(!open)}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Vendor</DialogTitle>
          <DialogDescription>Fill in the details to create a new vendor account.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="businessname">Business Name</Label>
            <Input id="businessname" {...register('businessname')} disabled={isSubmitting} />
            {errors.businessname && <p className="text-xs text-red-500">{errors.businessname.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...register('email')} disabled={isSubmitting} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} disabled={isSubmitting} />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" {...register('phone')} disabled={isSubmitting} />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Vendor'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default AddVendorDialog;