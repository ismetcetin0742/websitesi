import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, User, Calendar } from "lucide-react";
import { Link } from "wouter";
import type { ContactMessage } from "@shared/schema";

export default function AdminContacts() {
  const { data: contacts, isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/admin/contacts"],
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">İletişim Mesajları</h1>
        </div>
        <div className="text-center py-8">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">İletişim Mesajları</h1>
        </div>
        <Badge variant="secondary">
          {contacts?.length || 0} Mesaj
        </Badge>
      </div>

      <div className="space-y-4">
        {contacts?.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Henüz hiç iletişim mesajı yok.</p>
            </CardContent>
          </Card>
        ) : (
          contacts?.map((contact) => (
            <Card key={contact.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{contact.name}</span>
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{contact.email}</span>
                      </span>
                      {contact.phone && (
                        <span className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{contact.phone}</span>
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString("tr-TR") : ""}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}