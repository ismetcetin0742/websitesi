import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Settings } from 'lucide-react';

export default function AdminHomepage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ana Sayfa Yönetimi</h1>
        <p className="text-gray-600">
          Ana sayfa bileşenlerini ve içeriklerini yönetin
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/homepage/statistics">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Hakkımızda Bölümü</CardTitle>
              <BarChart3 className="h-6 w-6 ml-auto text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Ana sayfadaki hakkımızda bölümündeki istatistikleri yönetin (100+ Başarılı Proje, %95 Müşteri Memnuniyeti, vb.)
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/homepage/solutions">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Çözümlerimiz Yönetimi</CardTitle>
              <Settings className="h-6 w-6 ml-auto text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Ana sayfadaki "Çözümlerimiz" bölümünü yönetin (E-Flow BPM, E-Flow DMS, vb.)
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer opacity-50">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Hero Bölümü</CardTitle>
            <TrendingUp className="h-6 w-6 ml-auto text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Ana sayfadaki hero bölümü içeriklerini düzenleyin
            </p>
            <p className="text-xs text-gray-500 mt-2">Yakında eklenecek</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}