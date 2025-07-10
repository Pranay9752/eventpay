"use server";

import FormData from "form-data";
// import fs from "fs";
// import path from "path";

// Adjust this function if you want to pass dynamic data from the client
export async function createProductAction({ title, prices, vendorId, images }) {
  console.log(
    "title, prices, vendorId, images33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333: ",
    title,
    prices,
    vendorId,
    images
  );
  const form = new FormData();

  // Form fields
  form.append("title", title);
  form.append("prices", prices);
  form.append("vendorId", vendorId);
  form.append("images", images);

  const res = await fetch(
    "https://nfcbackend-production.up.railway.app/product/createProduct",
    {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to create product: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
