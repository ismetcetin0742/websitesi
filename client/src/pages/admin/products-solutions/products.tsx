import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, Edit, Save, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function ProductsManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  // Mock data for products
  const [products, setProducts] = useState([
    {
      id: 'eflow-bpm',
      name: 'E-Flow BPM',
      category: 'İş Süreç Yönetimi',
      status: 'active',
      description: {
        tr: 'İş süreçlerinizi dijitalleştirerek verimliliği artırın',
        en: 'Increase efficiency by digitalizing your business processes'
      },
      features: [
        'Süreç Otomasyonu',
        'İş Akışı Yönetimi', 
        'Performans Analizi',
        'Entegrasyon Desteği'
      ],
      integrations: [
        'SAP', 'Oracle', 'Microsoft', 'Salesforce'
      ]
    },
    {
      id: 'eflow-dms',
      name: 'E-Flow DMS',
      category: 'Doküman Yönetimi',
      status: 'active',
      description: {
        tr: 'Belgelerinizi güvenli ve organize şekilde yönetin',
        en: 'Manage your documents securely and organized'
      },
      features: [
        'Doküman Arşivleme',
        'Versiyon Kontrolü',
        'Güvenlik Yönetimi',
        'Arama ve Filtreleme'
      ],
      integrations: [
        'Office 365', 'Google Workspace', 'Dropbox', 'OneDrive'
      ]
    }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    setEditingProduct(null);
    // Here you would save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingProduct(null);
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ürünler Yönetimi</h1>
            <p className="text-gray-600">
              E-Flow BPM ve E-Flow DMS ürünlerinin içeriklerini düzenleyin
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
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-1" />
                Düzenle
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {products.map((product) => (
          <Card key={product.id} className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Package className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{product.category}</Badge>
                      <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                        {product.status === 'active' ? 'Aktif' : 'Pasif'}
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
                  <TabsTrigger value="integrations">Entegrasyonlar</TabsTrigger>
                  <TabsTrigger value="settings">Ayarlar</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="desc-tr">Açıklama (Türkçe)</Label>
                      {isEditing ? (
                        <Textarea
                          id="desc-tr"
                          defaultValue={product.description.tr}
                          placeholder="Ürün açıklaması (Türkçe)"
                          className="min-h-[100px]"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md min-h-[100px] flex items-center">
                          {product.description.tr}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="desc-en">Açıklama (İngilizce)</Label>
                      {isEditing ? (
                        <Textarea
                          id="desc-en"
                          defaultValue={product.description.en}
                          placeholder="Ürün açıklaması (İngilizce)"
                          className="min-h-[100px]"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md min-h-[100px] flex items-center">
                          {product.description.en}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-4">
                  <Label>Ürün Özellikleri</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
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

                <TabsContent value="integrations" className="space-y-4">
                  <Label>Entegrasyonlar</Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {product.integrations.map((integration, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {isEditing ? (
                          <Input
                            defaultValue={integration}
                            placeholder="Entegrasyon adı"
                          />
                        ) : (
                          <div className="p-2 bg-green-50 text-green-900 rounded-md flex-1 text-center">
                            {integration}
                          </div>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        + Yeni Entegrasyon Ekle
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
                          defaultValue={product.category}
                          placeholder="Ürün kategorisi"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md">
                          {product.category}
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
                          {product.status === 'active' ? 'Aktif' : 'Pasif'}
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
          Bu sayfada düzenlenen ürün bilgileri, ana sayfada, çözümler sayfasında ve ürün detay sayfalarında gösterilir.
          Değişiklikler anında site genelinde yansıtılır.
        </p>
      </div>
    </div>
  );
}