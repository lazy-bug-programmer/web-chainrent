/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createAdminClient, getLoggedInUser } from "@/lib/appwrite/server";
import { Query } from "node-appwrite";
import { Contact } from "../domains/contact.domain";

const DATABASE_ID = "Core";
const CONTACTS_COLLECTION_ID = "Contacts";

// CREATE
export async function createContact(contact: Omit<Contact, "$id">) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const newContact = await databases.createDocument(
      DATABASE_ID,
      CONTACTS_COLLECTION_ID,
      "unique()",
      {
        name: contact.name,
        email: contact.email,
        messages: contact.messages,
      }
    );

    return { data: newContact };
  } catch (error: any) {
    console.error("Error creating contact:", error);
    return { error: error.message || "Failed to create contact" };
  }
}

// READ
export async function getContacts(limit = 10000) {
  try {
    const { databases } = await createAdminClient();

    const contacts = await databases.listDocuments(
      DATABASE_ID,
      CONTACTS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: contacts.documents, total: contacts.total };
  } catch (error: any) {
    console.error("Error getting contacts:", error);
    return { error: error.message || "Failed to get contacts" };
  }
}

export async function getContactById(contactId: string) {
  try {
    const { databases } = await createAdminClient();

    const contact = await databases.getDocument(
      DATABASE_ID,
      CONTACTS_COLLECTION_ID,
      contactId
    );

    return { data: contact };
  } catch (error: any) {
    console.error("Error getting contact:", error);
    return { error: error.message || "Failed to get contact" };
  }
}

// UPDATE
export async function updateContact(contactId: string, updates: Partial<Contact>) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const updatedContact = await databases.updateDocument(
      DATABASE_ID,
      CONTACTS_COLLECTION_ID,
      contactId,
      updates
    );

    return { data: updatedContact };
  } catch (error: any) {
    console.error("Error updating contact:", error);
    return { error: error.message || "Failed to update contact" };
  }
}

// DELETE
export async function deleteContact(contactId: string) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      CONTACTS_COLLECTION_ID,
      contactId
    );

    return { message: "Contact deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting contact:", error);
    return { error: error.message || "Failed to delete contact" };
  }
}

// Admin operations
export async function adminGetAllContacts(limit = 10000) {
  try {
    const { databases } = await createAdminClient();

    const contacts = await databases.listDocuments(
      DATABASE_ID,
      CONTACTS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: contacts.documents, total: contacts.total };
  } catch (error: any) {
    console.error("Error getting all contacts:", error);
    return { error: error.message || "Failed to get all contacts" };
  }
}

export async function adminUpdateContact(
  contactId: string,
  updates: Partial<Contact>
) {
  try {
    const { databases } = await createAdminClient();

    const updatedContact = await databases.updateDocument(
      DATABASE_ID,
      CONTACTS_COLLECTION_ID,
      contactId,
      updates
    );

    return { data: updatedContact };
  } catch (error: any) {
    console.error("Error updating contact:", error);
    return { error: error.message || "Failed to update contact" };
  }
}

export async function adminDeleteContact(contactId: string) {
  try {
    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      CONTACTS_COLLECTION_ID,
      contactId
    );

    return { message: "Contact deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting contact:", error);
    return { error: error.message || "Failed to delete contact" };
  }
}
