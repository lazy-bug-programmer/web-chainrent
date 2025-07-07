/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createAdminClient, getLoggedInUser } from "@/lib/appwrite/server";
import { Query } from "node-appwrite";
import { Testimonial } from "../domains/testimonial.domain";

const DATABASE_ID = "Core";
const TESTIMONIALS_COLLECTION_ID = "Testimonials";

// CREATE
export async function createTestimonial(testimonial: Omit<Testimonial, "$id">) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const newTestimonial = await databases.createDocument(
      DATABASE_ID,
      TESTIMONIALS_COLLECTION_ID,
      "unique()",
      {
        name: testimonial.name,
        position: testimonial.position,
        content: testimonial.content,
        rating: testimonial.rating,
        status: testimonial.status,
        created_at: testimonial.created_at,
      }
    );

    return { data: newTestimonial };
  } catch (error: any) {
    console.error("Error creating testimonial:", error);
    return { error: error.message || "Failed to create testimonial" };
  }
}

// READ
export async function getTestimonials(limit = 10000) {
  try {
    const { databases } = await createAdminClient();

    const testimonials = await databases.listDocuments(
      DATABASE_ID,
      TESTIMONIALS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: testimonials.documents, total: testimonials.total };
  } catch (error: any) {
    console.error("Error getting testimonials:", error);
    return { error: error.message || "Failed to get testimonials" };
  }
}

export async function getTestimonialById(testimonialId: string) {
  try {
    const { databases } = await createAdminClient();

    const testimonial = await databases.getDocument(
      DATABASE_ID,
      TESTIMONIALS_COLLECTION_ID,
      testimonialId
    );

    return { data: testimonial };
  } catch (error: any) {
    console.error("Error getting testimonial:", error);
    return { error: error.message || "Failed to get testimonial" };
  }
}

// UPDATE
export async function updateTestimonial(
  testimonialId: string,
  updates: Partial<Testimonial>
) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const updatedTestimonial = await databases.updateDocument(
      DATABASE_ID,
      TESTIMONIALS_COLLECTION_ID,
      testimonialId,
      updates
    );

    return { data: updatedTestimonial };
  } catch (error: any) {
    console.error("Error updating testimonial:", error);
    return { error: error.message || "Failed to update testimonial" };
  }
}

// DELETE
export async function deleteTestimonial(testimonialId: string) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      TESTIMONIALS_COLLECTION_ID,
      testimonialId
    );

    return { message: "Testimonial deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting testimonial:", error);
    return { error: error.message || "Failed to delete testimonial" };
  }
}

// Admin operations
export async function adminGetAllTestimonials(limit = 10000) {
  try {
    const { databases } = await createAdminClient();

    const testimonials = await databases.listDocuments(
      DATABASE_ID,
      TESTIMONIALS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: testimonials.documents, total: testimonials.total };
  } catch (error: any) {
    console.error("Error getting all testimonials:", error);
    return { error: error.message || "Failed to get all testimonials" };
  }
}

export async function adminUpdateTestimonial(
  testimonialId: string,
  updates: Partial<Testimonial>
) {
  try {
    const { databases } = await createAdminClient();

    const updatedTestimonial = await databases.updateDocument(
      DATABASE_ID,
      TESTIMONIALS_COLLECTION_ID,
      testimonialId,
      updates
    );

    return { data: updatedTestimonial };
  } catch (error: any) {
    console.error("Error updating testimonial:", error);
    return { error: error.message || "Failed to update testimonial" };
  }
}

export async function adminDeleteTestimonial(testimonialId: string) {
  try {
    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      TESTIMONIALS_COLLECTION_ID,
      testimonialId
    );

    return { message: "Testimonial deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting testimonial:", error);
    return { error: error.message || "Failed to delete testimonial" };
  }
}
