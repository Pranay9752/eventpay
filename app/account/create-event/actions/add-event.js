'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const CreateEventSchema = z.object({
  event_name: z.string().min(1, 'Event name is required').max(100, 'Event name is too long'),
  event_address: z.string().min(1, 'Event address is required').max(200, 'Event address is too long'),
  event_phone: z.string().regex(/^\d{10}$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phoneNo: z.string().regex(/^\d{10}$/, 'Invalid phone number format'),
});

export async function createEventAction(formData) {
  try {
    const data = Object.fromEntries(formData);

    const validatedData = CreateEventSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.issues[0].message,
      };
    }

    const response = await fetch('https://nfcbackend-production.up.railway.app/api/event/create_event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData.data),
    });

    const result = await response.json();

    // if (!response.ok) {
    //   return {
    //     success: false,
    //     message: result.message || `HTTP error! status: ${response.status}`,
    //   };
    // }

    revalidatePath("/events")
  } catch (error) {
    console.error('Error creating event:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create event',
    };
  }
  
  // Redirect after successful event creation
  // redirect('/events');
}