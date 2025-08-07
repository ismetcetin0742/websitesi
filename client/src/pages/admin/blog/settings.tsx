import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Settings, Globe, Layout, Edit, Save, X } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function BlogSettings() {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    pageTitle: "Blog",
    metaDescription: "Algotrom'un blog sayfası - teknoloji ve iş süreçleri hakkında güncel yazılar",
    defaultLanguage: "tr",
    postsPerPage: 6,
    autoPublish: true,
    rssEnabled: true,
  });
  const { toast } = useToast();

  const handleEdit = (section: string) => {
    setEditingSection(section);
  };

  const handleSave = (section: string) => {
    setEditingSection(null);
    toast({
      title: "Başarılı",
      description: "Ayarlar güncellendi.",
    });
  };

  const handleCancel = () => {
    setEditingSection(null);
  };

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
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Sayfa Başlığı</h4>
                    <p className="text-sm text-gray-600">Blog sayfasının ana başlığı</p>
                  </div>
                  <div className="flex gap-2">
                    {editingSection === "pageTitle" ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleSave("pageTitle")}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleEdit("pageTitle")}>
                        <Edit className="h-4 w-4 mr-1" />
                        Düzenle
                      </Button>
                    )}
                  </div>
                </div>
                {editingSection === "pageTitle" ? (
                  <Input
                    value={settings.pageTitle}
                    onChange={(e) => setSettings({...settings, pageTitle: e.target.value})}
                    placeholder="Sayfa başlığı"
                  />
                ) : (
                  <p className="text-sm font-medium">{settings.pageTitle}</p>
                )}
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Meta Açıklama</h4>
                    <p className="text-sm text-gray-600">SEO için sayfa açıklaması</p>
                  </div>
                  <div className="flex gap-2">
                    {editingSection === "metaDescription" ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleSave("metaDescription")}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleEdit("metaDescription")}>
                        <Edit className="h-4 w-4 mr-1" />
                        Düzenle
                      </Button>
                    )}
                  </div>
                </div>
                {editingSection === "metaDescription" ? (
                  <Input
                    value={settings.metaDescription}
                    onChange={(e) => setSettings({...settings, metaDescription: e.target.value})}
                    placeholder="Meta açıklama"
                  />
                ) : (
                  <p className="text-sm font-medium">{settings.metaDescription}</p>
                )}
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
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Varsayılan Dil</h4>
                    <p className="text-sm text-gray-600">Yeni yazılar için varsayılan dil</p>
                  </div>
                  <div className="flex gap-2">
                    {editingSection === "defaultLanguage" ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleSave("defaultLanguage")}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleEdit("defaultLanguage")}>
                        <Edit className="h-4 w-4 mr-1" />
                        Düzenle
                      </Button>
                    )}
                  </div>
                </div>
                {editingSection === "defaultLanguage" ? (
                  <Select value={settings.defaultLanguage} onValueChange={(value) => setSettings({...settings, defaultLanguage: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr">Türkçe</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm font-medium">
                    {settings.defaultLanguage === "tr" ? "Türkçe" : 
                     settings.defaultLanguage === "en" ? "English" : "Français"}
                  </p>
                )}
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Desteklenen Diller</h4>
                    <p className="text-sm text-gray-600">Blog için etkin diller</p>
                  </div>
                  <p className="text-sm font-medium">Türkçe, English, Français</p>
                </div>
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
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Sayfa Başına Yazı Sayısı</h4>
                    <p className="text-sm text-gray-600">Blog listesinde gösterilecek yazı sayısı</p>
                  </div>
                  <div className="flex gap-2">
                    {editingSection === "postsPerPage" ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleSave("postsPerPage")}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleEdit("postsPerPage")}>
                        <Edit className="h-4 w-4 mr-1" />
                        Düzenle
                      </Button>
                    )}
                  </div>
                </div>
                {editingSection === "postsPerPage" ? (
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    value={settings.postsPerPage}
                    onChange={(e) => setSettings({...settings, postsPerPage: parseInt(e.target.value)})}
                  />
                ) : (
                  <p className="text-sm font-medium">{settings.postsPerPage}</p>
                )}
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Otomatik Yayınlama</h4>
                  <p className="text-sm text-gray-600">Yazıların otomatik olarak yayınlanması</p>
                </div>
                <Switch
                  checked={settings.autoPublish}
                  onCheckedChange={(checked) => {
                    setSettings({...settings, autoPublish: checked});
                    toast({
                      title: "Ayar Güncellendi",
                      description: `Otomatik yayınlama ${checked ? "etkinleştirildi" : "devre dışı bırakıldı"}.`,
                    });
                  }}
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">RSS Feed</h4>
                  <p className="text-sm text-gray-600">RSS besleme aktifliği</p>
                </div>
                <Switch
                  checked={settings.rssEnabled}
                  onCheckedChange={(checked) => {
                    setSettings({...settings, rssEnabled: checked});
                    toast({
                      title: "Ayar Güncellendi",
                      description: `RSS Feed ${checked ? "etkinleştirildi" : "devre dışı bırakıldı"}.`,
                    });
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}