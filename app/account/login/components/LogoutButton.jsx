'use client';

import { useFormStatus } from 'react-dom';
import {  Loader2 } from 'lucide-react';


function LogoutButton({ icon: Icon, title }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="flex items-center space-x-2 w-full text-left hover:bg-gray-100 p-2 rounded"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Icon className="w-5 h-5" />
      )}
      <span>{pending ? 'Logging out...' : title}</span>
    </button>
  );
}


export default LogoutButton