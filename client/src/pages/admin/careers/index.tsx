import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, FileText, Plus, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function AdminCareers() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Admin Paneli
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Kariyer Yönetimi</h1>
        <p className="text-gray-600">İş pozisyonları ve başvuruları yönetin</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Job Positions Management */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>İş Pozisyonları</CardTitle>
                <CardDescription>
                  Açık pozisyonları yönetin ve düzenleyin
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/admin/careers/positions">
                <Button className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Pozisyonları Görüntüle
                </Button>
              </Link>
              <Link href="/admin/careers/positions/create">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Pozisyon Ekle
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Career Content Management */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>Kariyer İçerikleri</CardTitle>
                <CardDescription>
                  Değerler ve faydaları yönetin
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/admin/careers/content">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  İçerikleri Yönet
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Job Applications Management */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle>Başvurular</CardTitle>
                <CardDescription>
                  İş başvurularını görüntüleyin ve yönetin
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/admin/applications">
                <Button className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Başvuruları Görüntüle
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}