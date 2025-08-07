import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Globe, Layout } from "lucide-react";
import { Link } from "wouter";

export default function BlogSettings() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/blog">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Blog Yönetimi
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Blog Ayarları</h1>
        <p className="text-gray-600">Blog sayfası genel ayarları ve yapılandırması</p>
      </div>

      <div className="grid gap-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5" />
              Sayfa Düzeni
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Blog sayfasının genel görünümü ve düzeni ayarları.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Sayfa Başlığı</h4>
                  <p className="text-sm text-gray-600">Blog sayfasının ana başlığı</p>
                </div>
                <Button variant="outline" size="sm">
                  Düzenle
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Meta Açıklama</h4>
                  <p className="text-sm text-gray-600">SEO için sayfa açıklaması</p>
                </div>
                <Button variant="outline" size="sm">
                  Düzenle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Dil Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Blog içeriklerinin çok dilli yönetimi.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Varsayılan Dil</h4>
                  <p className="text-sm text-gray-600">Yeni yazılar için varsayılan dil</p>
                </div>
                <Button variant="outline" size="sm">
                  Türkçe
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Desteklenen Diller</h4>
                  <p className="text-sm text-gray-600">Blog için etkin diller</p>
                </div>
                <Button variant="outline" size="sm">
                  Yönet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Genel Ayarlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Blog işlevselliği ve davranış ayarları.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Sayfa Başına Yazı Sayısı</h4>
                  <p className="text-sm text-gray-600">Blog listesinde gösterilecek yazı sayısı</p>
                </div>
                <Button variant="outline" size="sm">
                  6
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Otomatik Yayınlama</h4>
                  <p className="text-sm text-gray-600">Yazıların otomatik olarak yayınlanması</p>
                </div>
                <Button variant="outline" size="sm">
                  Etkin
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">RSS Feed</h4>
                  <p className="text-sm text-gray-600">RSS besleme aktifliği</p>
                </div>
                <Button variant="outline" size="sm">
                  Etkin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}