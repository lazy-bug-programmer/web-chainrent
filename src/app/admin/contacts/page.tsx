"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Eye, Trash2, MessageSquare, Mail, Reply } from "lucide-react";
import { AdminPageHeader } from "../layout";
import {
  adminGetAllContacts,
  adminDeleteContact,
} from "@/lib/actions/contact.action";
import { Contact } from "@/lib/domains/contact.domain";

interface ContactWithMeta extends Contact {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactWithMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] =
    useState<ContactWithMeta | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const result = await adminGetAllContacts();
      if (result.data) {
        setContacts(result.data as unknown as ContactWithMeta[]);
      } else {
        console.error("Failed to fetch contacts:", result.error);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    if (confirm("Are you sure you want to delete this contact message?")) {
      const result = await adminDeleteContact(contactId);
      if (result.message) {
        setContacts(contacts.filter((c) => c.$id !== contactId));
      } else {
        console.error("Failed to delete contact:", result.error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <>
        <AdminPageHeader
          title="Contact Messages"
          description="Manage and respond to customer inquiries"
          icon={<MessageSquare className="h-6 w-6 text-white" />}
        />
        <div className="mx-auto container">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-400">Loading contacts...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminPageHeader
        title="Contact Messages"
        description="Manage and respond to customer inquiries"
        icon={<MessageSquare className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto container">
        {/* Contacts Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Messages ({contacts.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">Name</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden sm:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Message Preview
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm hidden md:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.$id}>
                      <TableCell className="text-xs sm:text-sm font-medium">
                        {contact.name}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm hidden sm:table-cell text-gray-400">
                        {contact.email}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm max-w-xs truncate">
                        {contact.messages.substring(0, 50)}...
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm hidden md:table-cell text-gray-400">
                        {formatDate(contact.$createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 sm:gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedContact(contact)}
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 h-8 w-8 p-0"
                            onClick={() => handleDeleteContact(contact.$id)}
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {contacts.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-gray-400"
                      >
                        No contact messages found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Contact Detail Dialog */}
        {selectedContact && (
          <Dialog
            open={!!selectedContact}
            onOpenChange={() => setSelectedContact(null)}
          >
            <DialogContent className="bg-gray-900 border-gray-700 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Message Details
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-400">From</Label>
                    <p className="text-white font-medium">
                      {selectedContact.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {selectedContact.email}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-400">Date</Label>
                    <p className="text-white">
                      {formatDate(selectedContact.$createdAt)}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-gray-400">Message</Label>
                  <div className="bg-gray-800/50 rounded-lg p-4 mt-2">
                    <p className="text-white leading-relaxed whitespace-pre-wrap">
                      {selectedContact.messages}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="gradient-bg flex-1">
                    <Reply className="h-4 w-4 mr-2" />
                    Reply via Email
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 bg-transparent"
                    onClick={() => setSelectedContact(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}
