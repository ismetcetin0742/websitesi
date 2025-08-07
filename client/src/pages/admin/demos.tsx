import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3, Building, User, Calendar, FileText } from "lucide-react";
import { Link } from "wouter";
import type { DemoRequest } from "@shared/schema";

export default function AdminDemos() {
  const { data: demos, isLoading } = useQuery<DemoRequest[]>({
    queryKey: ["/api/admin/demos"],
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
          <h1 className="text-3xl font-bold">Demo Talepleri</h1>
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
          <h1 className="text-3xl font-bold">Demo Talepleri</h1>
        </div>
        <Badge variant="secondary">
          {demos?.length || 0} Talep
        </Badge>
      </div>

      <div className="space-y-4">
        {demos?.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Henüz hiç demo talebi yok.</p>
            </CardContent>
          </Card>
        ) : (
          demos?.map((demo) => (
            <Card key={demo.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{demo.name}</span>
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-4">
                      <span>{demo.email}</span>
                      <span className="flex items-center space-x-1">
                        <Building className="h-3 w-3" />
                        <span>{demo.company}</span>
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {demo.createdAt ? new Date(demo.createdAt).toLocaleDateString("tr-TR") : ""}
                    </span>
                  </div>
                </div>
              </CardHeader>
              {demo.message && (
                <CardContent>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Mesaj</span>
                    </div>
                    <p className="text-sm text-blue-800 whitespace-pre-wrap">{demo.message}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}