import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2, Factory, Truck, Heart, GraduationCap, Shield, Settings, BarChart3 } from 'lucide-react';

export default function SectorsManagement() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sektörler Yönetimi</h1>
        <p className="text-gray-600">
          Farklı sektörler için özelleştirilmiş çözümlerin içeriklerini yönetin
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/sectors/banking">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Bankacılık & Finans</CardTitle>
              <Building2 className="h-6 w-6 ml-auto text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Bankacılık sektörü için özelleştirilmiş BPM ve DMS çözümlerini düzenleyin
              </p>
              <p className="text-xs text-blue-600 mt-1">
                %86 verimlilik artışı
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/sectors/manufacturing">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">İmalat & Üretim</CardTitle>
              <Factory className="h-6 w-6 ml-auto text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Üretim süreçleri ve kalite yönetimi için özel çözümleri düzenleyin
              </p>
              <p className="text-xs text-blue-600 mt-1">
                %86 verimlilik artışı
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/sectors/logistics">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Lojistik & Taşımacılık</CardTitle>
              <Truck className="h-6 w-6 ml-auto text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Tedarik zinciri ve lojistik süreçleri için özel çözümleri düzenleyin
              </p>
              <p className="text-xs text-blue-600 mt-1">
                %86 verimlilik artışı
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/sectors/healthcare">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Sağlık & Hastane</CardTitle>
              <Heart className="h-6 w-6 ml-auto text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Hasta yönetimi ve hastane süreçleri için özel çözümleri düzenleyin
              </p>
              <p className="text-xs text-blue-600 mt-1">
                %86 verimlilik artışı
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/sectors/education">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Eğitim & Akademi</CardTitle>
              <GraduationCap className="h-6 w-6 ml-auto text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Eğitim kurumları için öğrenci ve akademik süreç yönetimi çözümlerini düzenleyin
              </p>
              <p className="text-xs text-blue-600 mt-1">
                %86 verimlilik artışı
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/sectors/government">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Kamu & Devlet</CardTitle>
              <Shield className="h-6 w-6 ml-auto text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Kamu kurumları için e-devlet ve vatandaş hizmetleri çözümlerini düzenleyin
              </p>
              <p className="text-xs text-blue-600 mt-1">
                %86 verimlilik artışı
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/sectors/general">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Genel Ayarlar</CardTitle>
              <Settings className="h-6 w-6 ml-auto text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Sektör kategorileri, ortak özellikler ve genel ayarları yönetin
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/sectors/statistics">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Sektör İstatistikleri</CardTitle>
              <BarChart3 className="h-6 w-6 ml-auto text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Sektörel başarı oranları ve verimlilik metriklerini düzenleyin
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed border-2">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-gray-500">Özel Sektörler</CardTitle>
            <Building2 className="h-6 w-6 ml-auto text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Diğer sektörler için özel çözümler (yakında)
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-900 mb-2">Sektörel Çözümler Hakkında</h3>
        <p className="text-sm text-green-800">
          Bu bölümden düzenlenen içerikler sektörler sayfasında gösterilir. Her sektör için özel çözümler,
          başarı hikayeleri, verimlilik oranları ve teknik detayları yönetebilirsiniz.
        </p>
        <ul className="text-sm text-green-700 mt-2 list-disc list-inside">
          <li>Sektörel çözüm açıklamaları</li>
          <li>Başarı hikayeleri ve referanslar</li>
          <li>Verimlilik artış oranları (%86)</li>
          <li>Özel özellikler ve entegrasyonlar</li>
        </ul>
      </div>
    </div>
  );
}