/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createAdminClient, getLoggedInUser } from "@/lib/appwrite/server";
import { Query } from "node-appwrite";
import { Product } from "../domains/product.domain";

const DATABASE_ID = "Core";
const PRODUCTS_COLLECTION_ID = "Products";

// CREATE
export async function createProduct(product: Omit<Product, "$id">) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const newProduct = await databases.createDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      "unique()",
      {
        name: product.name,
        apy: product.apy,
        risk: product.risk,
        min_investment: product.min_investment,
        max_investment: product.max_investment,
        investors: product.investors,
        status: product.status,
        category: product.category,
        features: product.features,
      }
    );

    return { data: newProduct };
  } catch (error: any) {
    console.error("Error creating product:", error);
    return { error: error.message || "Failed to create product" };
  }
}

// READ
export async function getProducts(limit = 10000) {
  try {
    const { databases } = await createAdminClient();

    const products = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: products.documents, total: products.total };
  } catch (error: any) {
    console.error("Error getting products:", error);
    return { error: error.message || "Failed to get products" };
  }
}

export async function getProductById(productId: string) {
  try {
    const { databases } = await createAdminClient();

    const product = await databases.getDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      productId
    );

    return { data: product };
  } catch (error: any) {
    console.error("Error getting product:", error);
    return { error: error.message || "Failed to get product" };
  }
}

// UPDATE
export async function updateProduct(
  productId: string,
  updates: Partial<Product>
) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const updatedProduct = await databases.updateDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      productId,
      updates
    );

    return { data: updatedProduct };
  } catch (error: any) {
    console.error("Error updating product:", error);
    return { error: error.message || "Failed to update product" };
  }
}

// DELETE
export async function deleteProduct(productId: string) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      productId
    );

    return { message: "Product deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return { error: error.message || "Failed to delete product" };
  }
}

// Admin operations
export async function adminGetAllProducts(limit = 10000) {
  try {
    const { databases } = await createAdminClient();

    const products = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: products.documents, total: products.total };
  } catch (error: any) {
    console.error("Error getting all products:", error);
    return { error: error.message || "Failed to get all products" };
  }
}

export async function adminUpdateProduct(
  productId: string,
  updates: Partial<Product>
) {
  try {
    const { databases } = await createAdminClient();

    const updatedProduct = await databases.updateDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      productId,
      updates
    );

    return { data: updatedProduct };
  } catch (error: any) {
    console.error("Error updating product:", error);
    return { error: error.message || "Failed to update product" };
  }
}

export async function adminDeleteProduct(productId: string) {
  try {
    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      productId
    );

    return { message: "Product deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return { error: error.message || "Failed to delete product" };
  }
}
