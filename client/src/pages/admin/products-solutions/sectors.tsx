import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2, Edit, Save, X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function SectoralSolutionsManagement() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for sectoral solutions
  const [sectoralSolutions, setSectoralSolutions] = useState([
    {
      id: 'banking-solutions',
      name: 'Bankacılık Çözümleri',
      sector: 'Finans',
      status: 'active',
      description: {
        tr: 'Bankacılık sektörüne özel E-Flow BPM ve DMS çözümleri',
        en: 'Specialized E-Flow BPM and DMS solutions for banking sector'
      },
      features: [
        'Müşteri İşlemleri Otomasyonu',
        'Risk Yönetimi',
        'Uyumluluk Takibi',
        'Güvenlik Protokolleri'
      ],
      benefits: [
        'İşlem Sürelerinde %86 Azalma',
        'Operasyonel Verimlilikte Artış',
        'Uyumluluk Raporlama',
        'Güvenlik Standartları'
      ]
    },
    {
      id: 'manufacturing-solutions',
      name: 'Üretim Çözümleri',
      sector: 'Üretim',
      status: 'active',
      description: {
        tr: 'Üretim sektörüne özel süreç optimizasyonu ve doküman yönetimi',
        en: 'Specialized process optimization and document management for manufacturing'
      },
      features: [
        'Üretim Planlama',
        'Kalite Kontrol',
        'Envanter Yönetimi',
        'Makine Entegrasyonu'
      ],
      benefits: [
        'Üretim Verimliliğinde %86 Artış',
        'Kalite Standartlarında İyileşme',
        'Stok Optimizasyonu',
        'Makine Duruş Sürelerinde Azalma'
      ]
    }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/admin/products-solutions">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Ürünler & Çözümler
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sektörel Çözümler Yönetimi</h1>
            <p className="text-gray-600">
              Farklı sektörler için özelleştirilmiş çözümlerin içeriklerini düzenleyin
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-1" />
                  Kaydet
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-1" />
                  İptal
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Yeni Sektörel Çözüm
                </Button>
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Düzenle
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {sectoralSolutions.map((solution) => (
          <Card key={solution.id} className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Building2 className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-2xl">{solution.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{solution.sector}</Badge>
                      <Badge variant={solution.status === 'active' ? 'default' : 'secondary'}>
                        {solution.status === 'active' ? 'Aktif' : 'Pasif'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="content">İçerik</TabsTrigger>
                  <TabsTrigger value="features">Özellikler</TabsTrigger>
                  <TabsTrigger value="benefits">Faydalar</TabsTrigger>
                  <TabsTrigger value="settings">Ayarlar</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="desc-tr">Açıklama (Türkçe)</Label>
                      {isEditing ? (
                        <Textarea
                          id="desc-tr"
                          defaultValue={solution.description.tr}
                          placeholder="Sektörel çözüm açıklaması (Türkçe)"
                          className="min-h-[100px]"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md min-h-[100px] flex items-center">
                          {solution.description.tr}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="desc-en">Açıklama (İngilizce)</Label>
                      {isEditing ? (
                        <Textarea
                          id="desc-en"
                          defaultValue={solution.description.en}
                          placeholder="Sektörel çözüm açıklaması (İngilizce)"
                          className="min-h-[100px]"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md min-h-[100px] flex items-center">
                          {solution.description.en}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-4">
                  <Label>Sektörel Özellikler</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {solution.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {isEditing ? (
                          <Input
                            defaultValue={feature}
                            placeholder="Özellik adı"
                          />
                        ) : (
                          <div className="p-2 bg-blue-50 text-blue-900 rounded-md flex-1">
                            {feature}
                          </div>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        + Yeni Özellik Ekle
                      </Button>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="benefits" className="space-y-4">
                  <Label>Sektörel Faydalar</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {solution.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {isEditing ? (
                          <Input
                            defaultValue={benefit}
                            placeholder="Fayda açıklaması"
                          />
                        ) : (
                          <div className="p-2 bg-green-50 text-green-900 rounded-md flex-1">
                            {benefit}
                          </div>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        + Yeni Fayda Ekle
                      </Button>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sector">Sektör</Label>
                      {isEditing ? (
                        <Input
                          id="sector"
                          defaultValue={solution.sector}
                          placeholder="Sektör adı"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md">
                          {solution.sector}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Durum</Label>
                      {isEditing ? (
                        <select className="w-full p-3 border rounded-md">
                          <option value="active">Aktif</option>
                          <option value="inactive">Pasif</option>
                        </select>
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md">
                          {solution.status === 'active' ? 'Aktif' : 'Pasif'}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Bilgi Notu</h3>
        <p className="text-sm text-blue-800">
          Bu sayfada düzenlenen sektörel çözüm bilgileri, sektörler sayfasında ve sektör detay sayfalarında gösterilir.
          Her sektör için özelleştirilmiş çözümler ve faydalar tanımlanabilir.
        </p>
      </div>
    </div>
  );
}