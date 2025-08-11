"use server";

import { cookies } from "next/headers";


export async function settlePayout(vendorId) {

  console.log(`Settling payout for vendor: ${vendorId}`);
  // Call API or database operation here
}

export async function deactivateVendor(vendorId) {
  console.log(`Deactivating vendor: ${vendorId}`);
  // Call API or database operation here
}


export async function getVendorDetails(vendorId) {

  try {
    const response = await fetch(
      `https://nfcbackend-production.up.railway.app/api/vendor/get_vendor_details?vendorId=${encodeURIComponent(vendorId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || `HTTP error! status: ${response.status}`,
      };
    }

    // Revalidate a relevant path if needed (optional)
    // revalidatePath("/vendors/details");

    return {
      success: true,
      data: result?.data || {},
      message: "Vendor details fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching vendor details:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch vendor details",
    };
  }
}



export async function getVendorTransactions(vendorId) {
  try {
    const eventId = (await cookies()).get("event_id")?.value;
    console.log('eventId: ', eventId);

    if (!vendorId || !eventId) {
      return {
        success: false,
        message: "vendorId or event_id is missing",
      };
    }

    console.log("Fetching transactions for:", vendorId, "Event:", eventId);

    const response = await fetch(
      `https://nfcbackend-production.up.railway.app/api/transactions/get_transaction_by_vendorid?vendorId=${encodeURIComponent(vendorId)}&event_id=${encodeURIComponent(eventId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // ensures fresh data
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
      data: result?.data,
      message: "Transactions fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch transactions",
    };
  }
}
