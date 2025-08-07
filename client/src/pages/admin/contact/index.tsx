import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Settings, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function AdminContact() {
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
        <h1 className="text-3xl font-bold text-gray-900">İletişim Yönetimi</h1>
        <p className="text-gray-600">İletişim sayfası içeriklerini ve bilgilerini yönetin</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Content Management */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>İçerik Yönetimi</CardTitle>
                <CardDescription>
                  Sayfa başlıkları ve açıklamalarını düzenleyin
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/admin/contact/content">
              <Button className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                İçerikleri Yönet
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Contact Info Management */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>İletişim Bilgileri</CardTitle>
                <CardDescription>
                  Adres, telefon, e-posta ve çalışma saatlerini yönetin
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/admin/contact/info">
              <Button className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Bilgileri Yönet
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}