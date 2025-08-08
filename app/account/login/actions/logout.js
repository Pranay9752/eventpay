"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  try {
    const cookieStore = cookies();
    // List of cookies to delete
    const cookieKeys = [
      "vendor_id",
      "vendorId",
      "user",
      "email",
      "eveny_id",
      "authcode",
    ];

    // Delete each cookie
    cookieKeys.forEach((key) => {
      cookieStore.delete(key);
    });

    // Redirect to login page
  } catch (error) {
    console.error("Error during logout:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to log out",
    };
  }
  redirect("/account/login");
}
