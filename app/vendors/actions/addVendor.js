"use server";

import { revalidatePath } from "next/cache";

export async function createVendor(vendorData) {
  try {
    const response = await fetch(
      "https://nfcbackend-production.up.railway.app/vendor/createVendor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vendorData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || `HTTP error! status: ${response.status}`,
      };
    }

    // Revalidate the vendors page to refresh the data
    revalidatePath("/vendors/list");

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
    const res = await fetch(
      "https://nfcbackend-production.up.railway.app/api/vendor/list",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch vendor list");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return { error: "Could not fetch vendor list" };
  }
}
