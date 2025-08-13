"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createVendor(vendorData) {
  try {
    const eventId = (await cookies()).get("event_id")?.value;
    console.log("vendorData: ", vendorData, eventId);

    const response = await fetch(
      "https://nfcbackend-production.up.railway.app/vendor/createVendor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...vendorData,
          event_id: eventId,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || `HTTP error! status: ${response.status}`,
      };
    }

    return {
      success: true,
      data: result,
      message: "Vendor created successfully",
    };
  } catch (error) {
    console.error("Error creating vendor:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create vendor",
    };
  }
}

export async function fetchVendors() {
  try {

    const eventId = (await cookies()).get("event_id")?.value;

    const res = await fetch(
      `https://nfcbackend-production.up.railway.app/api/vendor/list?event_id=${eventId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store", // ✅ always fetch fresh data if needed
      }
    );

    if (!res.ok) throw new Error("Failed to fetch vendor list");

    const data = await res.json();
    return data; // ✅ No revalidatePath here
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return { error: "Could not fetch vendor list" };
  }
}

