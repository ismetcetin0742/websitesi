import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Layers, Edit, Save, X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function SolutionsManagement() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for solutions
  const [solutions, setSolutions] = useState([
    {
      id: 'custom-software',
      name: 'Özel Yazılım Geliştirme',
      category: 'Yazılım Geliştirme',
      status: 'active',
      description: {
        tr: 'İhtiyaçlarınıza özel yazılım çözümleri geliştiriyoruz',
        en: 'We develop custom software solutions for your needs'
      },
      features: [
        'İhtiyaç Analizi',
        'Özel Tasarım',
        'Agile Metodoloji',
        'Destek ve Bakım'
      ],
      technologies: [
        '.NET', 'React', 'Node.js', 'PostgreSQL', 'Azure', 'AWS'
      ]
    },
    {
      id: 'digital-transformation',
      name: 'Dijital Dönüşüm Danışmanlığı',
      category: 'Danışmanlık',
      status: 'active',
      description: {
        tr: 'Şirketinizin dijital dönüşüm yolculuğunda rehberlik ediyoruz',
        en: 'We guide your company through digital transformation journey'
      },
      features: [
        'Strateji Geliştirme',
        'Süreç Optimizasyonu',
        'Teknoloji Entegrasyonu',
        'Değişim Yönetimi'
      ],
      technologies: [
        'Business Intelligence', 'Analytics', 'Cloud Computing', 'IoT'
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Çözümler Yönetimi</h1>
            <p className="text-gray-600">
              Özel yazılım geliştirme ve diğer çözümlerin içeriklerini düzenleyin
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
                  Yeni Çözüm
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
        {solutions.map((solution) => (
          <Card key={solution.id} className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Layers className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-2xl">{solution.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{solution.category}</Badge>
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
                  <TabsTrigger value="technologies">Teknolojiler</TabsTrigger>
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
                          placeholder="Çözüm açıklaması (Türkçe)"
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
                          placeholder="Çözüm açıklaması (İngilizce)"
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
                  <Label>Çözüm Özellikleri</Label>
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

                <TabsContent value="technologies" className="space-y-4">
                  <Label>Kullanılan Teknolojiler</Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {solution.technologies.map((tech, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {isEditing ? (
                          <Input
                            defaultValue={tech}
                            placeholder="Teknoloji adı"
                          />
                        ) : (
                          <div className="p-2 bg-purple-50 text-purple-900 rounded-md flex-1 text-center">
                            {tech}
                          </div>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        + Yeni Teknoloji Ekle
                      </Button>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      {isEditing ? (
                        <Input
                          id="category"
                          defaultValue={solution.category}
                          placeholder="Çözüm kategorisi"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md">
                          {solution.category}
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
          Bu sayfada düzenlenen çözüm bilgileri, ana sayfada, çözümler sayfasında ve çözüm detay sayfalarında gösterilir.
          Değişiklikler anında site genelinde yansıtılır.
        </p>
      </div>
    </div>
  );
}