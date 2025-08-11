import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export default function CategoriesManagement() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for categories
  const [categories, setCategories] = useState([
    {
      id: 'business-process',
      name: 'İş Süreç Yönetimi',
      nameEn: 'Business Process Management',
      description: 'İş süreçlerinin dijitalleştirilmesi ve otomasyonu',
      descriptionEn: 'Digitalization and automation of business processes',
      color: '#3B82F6',
      status: 'active',
      productsCount: 1
    },
    {
      id: 'document-management',
      name: 'Doküman Yönetimi',
      nameEn: 'Document Management',
      description: 'Belge ve doküman organizasyonu, arşivleme',
      descriptionEn: 'Document organization and archiving',
      color: '#10B981',
      status: 'active',
      productsCount: 1
    },
    {
      id: 'software-development',
      name: 'Yazılım Geliştirme',
      nameEn: 'Software Development',
      description: 'Özel yazılım ve uygulama geliştirme hizmetleri',
      descriptionEn: 'Custom software and application development services',
      color: '#8B5CF6',
      status: 'active',
      productsCount: 2
    },
    {
      id: 'consulting',
      name: 'Danışmanlık',
      nameEn: 'Consulting',
      description: 'Dijital dönüşüm ve teknoloji danışmanlığı',
      descriptionEn: 'Digital transformation and technology consulting',
      color: '#F59E0B',
      status: 'active',
      productsCount: 1
    }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Kategoriler Yönetimi</h1>
            <p className="text-gray-600">
              Ürün ve çözüm kategorilerini düzenleyin
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
                  Yeni Kategori
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

      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: category.color + '20' }}
                  >
                    <Settings 
                      className="h-6 w-6" 
                      style={{ color: category.color }}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={category.status === 'active' ? 'default' : 'secondary'}>
                        {category.status === 'active' ? 'Aktif' : 'Pasif'}
                      </Badge>
                      <Badge variant="outline">
                        {category.productsCount} ürün
                      </Badge>
                    </div>
                  </div>
                </div>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-tr-${category.id}`}>Kategori Adı (Türkçe)</Label>
                  {isEditing ? (
                    <Input
                      id={`name-tr-${category.id}`}
                      defaultValue={category.name}
                      placeholder="Kategori adı (Türkçe)"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-md">
                      {category.name}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`name-en-${category.id}`}>Kategori Adı (İngilizce)</Label>
                  {isEditing ? (
                    <Input
                      id={`name-en-${category.id}`}
                      defaultValue={category.nameEn}
                      placeholder="Kategori adı (İngilizce)"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-md">
                      {category.nameEn}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`desc-tr-${category.id}`}>Açıklama (Türkçe)</Label>
                  {isEditing ? (
                    <Textarea
                      id={`desc-tr-${category.id}`}
                      defaultValue={category.description}
                      placeholder="Kategori açıklaması (Türkçe)"
                      className="min-h-[80px]"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-md min-h-[80px] flex items-center">
                      {category.description}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`desc-en-${category.id}`}>Açıklama (İngilizce)</Label>
                  {isEditing ? (
                    <Textarea
                      id={`desc-en-${category.id}`}
                      defaultValue={category.descriptionEn}
                      placeholder="Kategori açıklaması (İngilizce)"
                      className="min-h-[80px]"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-md min-h-[80px] flex items-center">
                      {category.descriptionEn}
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`color-${category.id}`}>Kategori Rengi</Label>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="color"
                          id={`color-${category.id}`}
                          defaultValue={category.color}
                          className="w-12 h-10 rounded border"
                        />
                        <Input
                          defaultValue={category.color}
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm text-gray-600">{category.color}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`status-${category.id}`}>Durum</Label>
                    {isEditing ? (
                      <select 
                        id={`status-${category.id}`}
                        className="w-full p-3 border rounded-md"
                        defaultValue={category.status}
                      >
                        <option value="active">Aktif</option>
                        <option value="inactive">Pasif</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md">
                        {category.status === 'active' ? 'Aktif' : 'Pasif'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isEditing && (
        <Card className="mt-6 border-dashed border-2">
          <CardHeader>
            <CardTitle className="text-gray-500">Yeni Kategori Ekle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Kategori adı (Türkçe)" />
              <Input placeholder="Kategori adı (İngilizce)" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Textarea placeholder="Açıklama (Türkçe)" className="min-h-[80px]" />
              <Textarea placeholder="Açıklama (İngilizce)" className="min-h-[80px]" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-2">
                <input
                  type="color"
                  defaultValue="#3B82F6"
                  className="w-12 h-10 rounded border"
                />
                <Input
                  placeholder="#3B82F6"
                  className="flex-1"
                />
              </div>
              <select className="w-full p-3 border rounded-md">
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </select>
            </div>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Kategori Ekle
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Bilgi Notu</h3>
        <p className="text-sm text-blue-800">
          Kategoriler, ürün ve çözümlerin organize edilmesi için kullanılır. Her kategori için belirlenen renk,
          site genelinde kategori gösterimlerinde kullanılır. Kategori silme işlemi, o kategorideki ürünler
          başka kategorilere taşındıktan sonra yapılmalıdır.
        </p>
      </div>
    </div>
  );
}