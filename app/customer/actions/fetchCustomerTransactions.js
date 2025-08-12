"use server";
import { cookies } from "next/headers";

export async function fetchCustomerTransactions(customerId) {
  try {
    const eventId = (await cookies()).get("event_id")?.value;

    if (!eventId) {
      throw new Error("Event ID not found in cookies");
    }

    const res = await fetch(
      `https://nfcbackend-production.up.railway.app/api/transactions/get_cust_transaction_by_customer_id?customerId=${encodeURIComponent(
        customerId
      )}&event_id=${encodeURIComponent(eventId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok)
      throw new Error(`Failed to fetch transactions. Status: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching customer transactions:", error);
    return { error: error.message || "Could not fetch customer transactions" };
  }
}
