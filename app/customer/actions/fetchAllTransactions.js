"use server";

import { cookies } from "next/headers";

export async function fetchAllTransactions() {
  try {
    const eventId = (await cookies()).get("event_id")?.value?.trim();

    if (!eventId) {
      throw new Error("Event ID not found in cookies");
    }

    const url = `https://nfcbackend-production.up.railway.app/api/transactions/getAllTransactions?event_id=${eventId}`;
    console.log("Fetching transactions from:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // always fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch transactions. Status: ${res.status}`);
    }

    const data = await res.json();
    return { success: true, data: data?.data || [] };
  } catch (error) {
    console.error("Error fetching all transactions:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
