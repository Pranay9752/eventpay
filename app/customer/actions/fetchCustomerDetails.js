"use server";

export async function fetchCustomerDetails(customerId) {
  try {
    if (!customerId) {
      return { error: "Customer ID is required" };
    }

    const res = await fetch(
      `https://nfcbackend-production.up.railway.app/api/transactions/get_cust_details_by_cust_id?customerId=${encodeURIComponent(
        customerId
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      // Capture server error messages if provided
      let errorMessage = `Failed to fetch customer details (status: ${res.status})`;
      try {
        const errorBody = await res.json();
        if (errorBody?.message) {
          errorMessage = errorBody.message;
        }
      } catch {
        // ignore if response is not JSON
      }
      return { error: errorMessage };
    }

    const data = await res.json();

    // Validate response shape
    if (!data || typeof data !== "object") {
      return { error: "Invalid response format from server" };
    }

    return data?.data || {};
  } catch (error) {
    // Handle fetch/network errors
    console.error("Error fetching customer details:", error);
    return {
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    };
  }
}
