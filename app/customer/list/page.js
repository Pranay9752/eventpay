// src/app/dashboard/users/page.tsx
import { Suspense } from 'react';
import { UserStats } from './components/UserStats';
import { UserListHeader } from './components/UserListHeader';
import { CustomerListFilters } from './components/UserListFilters';
import { UserListTable } from './components/UserListTable';

export default function CustomerListPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold tracking-tight mb-8">User Management</h1>
      
      <Suspense fallback={<div>Loading stats...</div>}>
        <UserStats />
      </Suspense>
      
      <div className="mt-8 space-y-6">
        <UserListHeader />
        <CustomerListFilters />
        <Suspense fallback={<div>Loading users...</div>}>
          <UserListTable />
        </Suspense>
      </div>
    </div>
  );
}