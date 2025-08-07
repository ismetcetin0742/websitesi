import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase, User, Calendar, FileText, Phone, Mail } from "lucide-react";
import { Link } from "wouter";
import type { JobApplication } from "@shared/schema";

export default function AdminApplications() {
  const { data: applications, isLoading } = useQuery<JobApplication[]>({
    queryKey: ["/api/admin/applications"],
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
          <h1 className="text-3xl font-bold">İş Başvuruları</h1>
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
          <h1 className="text-3xl font-bold">İş Başvuruları</h1>
        </div>
        <Badge variant="secondary">
          {applications?.length || 0} Başvuru
        </Badge>
      </div>

      <div className="space-y-4">
        {applications?.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Henüz hiç iş başvurusu yok.</p>
            </CardContent>
          </Card>
        ) : (
          applications?.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{application.name}</span>
                      <Badge variant="outline">{application.position}</Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{application.email}</span>
                      </span>
                      {application.phone && (
                        <span className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{application.phone}</span>
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {application.createdAt ? new Date(application.createdAt).toLocaleDateString("tr-TR") : ""}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.cvFile && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">CV Dosyası</span>
                      </div>
                      <p className="text-sm text-blue-800">{application.cvFile}</p>
                    </div>
                  )}
                  
                  {application.coverLetter && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-gray-900">Ön Yazı</span>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{application.coverLetter}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}