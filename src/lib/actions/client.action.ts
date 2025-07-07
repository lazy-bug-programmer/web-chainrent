/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createAdminClient, getLoggedInUser } from "@/lib/appwrite/server";
import { Query } from "node-appwrite";
import { Client } from "../domains/client.domain";

const DATABASE_ID = "Core";
const CLIENTS_COLLECTION_ID = "Clients";

// CREATE
export async function createClient(client: Omit<Client, "$id">) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const newClient = await databases.createDocument(
      DATABASE_ID,
      CLIENTS_COLLECTION_ID,
      "unique()",
      {
        name: client.name,
        location: client.location,
        investment: client.investment,
        earnings: client.earnings,
        period: client.period,
      }
    );

    return { data: newClient };
  } catch (error: any) {
    console.error("Error creating client:", error);
    return { error: error.message || "Failed to create client" };
  }
}

// READ
export async function getClients(limit = 10000) {
  try {
    const { databases } = await createAdminClient();

    const clients = await databases.listDocuments(
      DATABASE_ID,
      CLIENTS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: clients.documents, total: clients.total };
  } catch (error: any) {
    console.error("Error getting clients:", error);
    return { error: error.message || "Failed to get clients" };
  }
}

export async function getClientById(clientId: string) {
  try {
    const { databases } = await createAdminClient();

    const client = await databases.getDocument(
      DATABASE_ID,
      CLIENTS_COLLECTION_ID,
      clientId
    );

    return { data: client };
  } catch (error: any) {
    console.error("Error getting client:", error);
    return { error: error.message || "Failed to get client" };
  }
}

// UPDATE
export async function updateClient(clientId: string, updates: Partial<Client>) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const updatedClient = await databases.updateDocument(
      DATABASE_ID,
      CLIENTS_COLLECTION_ID,
      clientId,
      updates
    );

    return { data: updatedClient };
  } catch (error: any) {
    console.error("Error updating client:", error);
    return { error: error.message || "Failed to update client" };
  }
}

// DELETE
export async function deleteClient(clientId: string) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      CLIENTS_COLLECTION_ID,
      clientId
    );

    return { message: "Client deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting client:", error);
    return { error: error.message || "Failed to delete client" };
  }
}

// Admin operations
export async function adminGetAllClients(limit = 10000) {
  try {
    const { databases } = await createAdminClient();

    const clients = await databases.listDocuments(
      DATABASE_ID,
      CLIENTS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: clients.documents, total: clients.total };
  } catch (error: any) {
    console.error("Error getting all clients:", error);
    return { error: error.message || "Failed to get all clients" };
  }
}

export async function adminUpdateClient(
  clientId: string,
  updates: Partial<Client>
) {
  try {
    const { databases } = await createAdminClient();

    const updatedClient = await databases.updateDocument(
      DATABASE_ID,
      CLIENTS_COLLECTION_ID,
      clientId,
      updates
    );

    return { data: updatedClient };
  } catch (error: any) {
    console.error("Error updating client:", error);
    return { error: error.message || "Failed to update client" };
  }
}

export async function adminDeleteClient(clientId: string) {
  try {
    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      CLIENTS_COLLECTION_ID,
      clientId
    );

    return { message: "Client deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting client:", error);
    return { error: error.message || "Failed to delete client" };
  }
}
