"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const VendorLoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function loginVendorAction(formData) {
  try {
    const data = Object.fromEntries(formData);
    console.log("data", data);
    // const validatedData = VendorLoginSchema.safeParse(data);
    // console.log('validatedData: ', validatedData.data);
    // if (!validatedData.success) {
    //   return {
    //     success: false,
    //     message: validatedData.error.issues[0].message,
    //   };
    // }

    const response = await fetch(
      "https://nfcbackend-production.up.railway.app/api/vendor/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data?.email,
          password: data?.password,
        }),
      }
    );
    console.log(response);

    const result = await response.json();
    console.log('result: ', result);

    if (!response.ok) {
      return {
        success: false,
        message: result.message || `HTTP error! status: ${response.status}`,
      };
    }

    // Store API response data in cookies
    const cookieStore = cookies();
    cookieStore.set("vendor_id", result.data._id, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    cookieStore.set("vendorId", result.data.vendorId, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    cookieStore.set("user", result.data.user, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    cookieStore.set("email", result.data.email, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    cookieStore.set("eveny_id", result.data.eveny_id, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    cookieStore.set("authcode", result.data.authcode, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    revalidatePath("/vendors/list");
  } catch (error) {
    console.error("Error logging in vendor:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to log in",
    };
  }
  redirect("/vendors/list");
}
