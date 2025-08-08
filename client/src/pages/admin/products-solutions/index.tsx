import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, Layers, Building2, Settings } from 'lucide-react';

export default function ProductsSolutionsManagement() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Ana Dashboard
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ürünler & Çözümler Yönetimi</h1>
        <p className="text-gray-600">
          Şirketin tüm ürün ve çözümlerinin içeriklerini bu bölümden yönetin
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/products-solutions/products">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Ürünler</CardTitle>
              <Package className="h-6 w-6 ml-auto text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                E-Flow BPM ve E-Flow DMS ürünlerinin içeriklerini düzenleyin
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/products-solutions/solutions">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Çözümler</CardTitle>
              <Layers className="h-6 w-6 ml-auto text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Özel yazılım geliştirme ve diğer çözümlerin içeriklerini düzenleyin
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/products-solutions/sectors">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Sektörel Çözümler</CardTitle>
              <Building2 className="h-6 w-6 ml-auto text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Farklı sektörler için özelleştirilmiş çözümlerin içeriklerini düzenleyin
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/products-solutions/categories">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Kategoriler</CardTitle>
              <Settings className="h-6 w-6 ml-auto text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Ürün ve çözüm kategorilerini düzenleyin
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed border-2">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-gray-500">Özellikler</CardTitle>
            <Package className="h-6 w-6 ml-auto text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Ürün özellikleri ve teknik detaylar (yakında)
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed border-2">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-gray-500">Entegrasyonlar</CardTitle>
            <Layers className="h-6 w-6 ml-auto text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Üçüncü parti entegrasyonlar ve API bilgileri (yakında)
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Bilgi Notu</h3>
        <p className="text-sm text-blue-800">
          Bu bölümden düzenlenen içerikler, ana sayfadaki çözümler bölümünde, çözümler sayfasında ve 
          sektörler sayfasında gösterilecek. Ana sayfa yönetiminden sadece gösterim sırası düzenlenebilir.
        </p>
      </div>
    </div>
  );
}