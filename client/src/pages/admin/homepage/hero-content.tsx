import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Plus, Edit3, Trash2, Save, X, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import type { HeroContent } from '@shared/schema';

const LANGUAGE_OPTIONS = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
  { code: 'ru', label: 'Русский' },
  { code: 'de', label: 'Deutsch' }
];

const SECTION_OPTIONS = [
  { value: 'solutions_intro', label: 'Çözümler Tanıtım Bölümü' },
  { value: 'main_banner', label: 'Ana Banner' },
  { value: 'cta_section', label: 'Eylem Çağrısı Bölümü' }
];

interface HeroContentFormData {
  section: string;
  title: Record<string, string>;
  description: Record<string, string>;
  buttonText: Record<string, string>;
  buttonLink: string;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminHeroContent() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('tr');
  const [formData, setFormData] = useState<HeroContentFormData>({
    section: '',
    title: { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
    description: { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
    buttonText: { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
    buttonLink: '',
    displayOrder: 0,
    isActive: true
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: heroContent = [], isLoading } = useQuery<HeroContent[]>({
    queryKey: ['/api/admin/hero-content'],
  });

  const createMutation = useMutation({
    mutationFn: async (data: HeroContentFormData) => {
      return await apiRequest('/api/admin/hero-content', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      toast({ title: "Başarılı", description: "Hero içerik oluşturuldu" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/hero-content'] });
      resetForm();
      setIsCreating(false);
    },
    onError: () => {
      toast({ title: "Hata", description: "Hero içerik oluşturulamadı", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<HeroContentFormData> }) => {
      return await apiRequest(`/api/admin/hero-content/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      toast({ title: "Başarılı", description: "Hero içerik güncellendi" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/hero-content'] });
      setEditingId(null);
      resetForm();
    },
    onError: () => {
      toast({ title: "Hata", description: "Hero içerik güncellenemedi", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/admin/hero-content/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      toast({ title: "Başarılı", description: "Hero içerik silindi" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/hero-content'] });
    },
    onError: () => {
      toast({ title: "Hata", description: "Hero içerik silinemedi", variant: "destructive" });
    }
  });

  const resetForm = () => {
    setFormData({
      section: '',
      title: { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
      description: { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
      buttonText: { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
      buttonLink: '',
      displayOrder: 0,
      isActive: true
    });
  };

  const handleEdit = (content: HeroContent) => {
    setEditingId(content.id);
    setFormData({
      section: content.section,
      title: content.title || { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
      description: content.description || { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
      buttonText: content.buttonText || { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
      buttonLink: content.buttonLink || '',
      displayOrder: content.displayOrder || 0,
      isActive: content.isActive || true
    });
  };

  const handleSave = () => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    resetForm();
  };

  const updateMultiLangField = (field: 'title' | 'description' | 'buttonText', lang: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-8">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin/homepage">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Geri
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Hero Bölümü Yönetimi</h1>
          <p className="text-gray-600">
            Ana sayfadaki hero bölümü metinlerini yönetin (Çözümlerimizle Tanışmak İster Misiniz? vb.)
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating || editingId !== null}>
          <Plus className="h-4 w-4 mr-2" />
          Yeni Hero İçerik Ekle
        </Button>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {editingId ? 'Hero İçerik Düzenle' : 'Yeni Hero İçerik Ekle'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="section">Bölüm</Label>
                <Select value={formData.section} onValueChange={(value) => setFormData({ ...formData, section: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bölüm seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTION_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="displayOrder">Sıralama</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive">Aktif</Label>
              </div>
              <div>
                <Label htmlFor="buttonLink">Buton Linki</Label>
                <Input
                  id="buttonLink"
                  value={formData.buttonLink}
                  onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                  placeholder="/demo-request"
                />
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <Label>Dil Seçimi</Label>
              <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Multi-language fields */}
            <div>
              <Label htmlFor="title">Başlık ({LANGUAGE_OPTIONS.find(l => l.code === currentLanguage)?.label})</Label>
              <Input
                id="title"
                value={formData.title[currentLanguage] || ''}
                onChange={(e) => updateMultiLangField('title', currentLanguage, e.target.value)}
                placeholder="Başlık girin"
              />
            </div>

            <div>
              <Label htmlFor="description">Açıklama ({LANGUAGE_OPTIONS.find(l => l.code === currentLanguage)?.label})</Label>
              <Textarea
                id="description"
                value={formData.description[currentLanguage] || ''}
                onChange={(e) => updateMultiLangField('description', currentLanguage, e.target.value)}
                placeholder="Açıklama girin"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="buttonText">Buton Metni ({LANGUAGE_OPTIONS.find(l => l.code === currentLanguage)?.label})</Label>
              <Input
                id="buttonText"
                value={formData.buttonText[currentLanguage] || ''}
                onChange={(e) => updateMultiLangField('buttonText', currentLanguage, e.target.value)}
                placeholder="Buton metni girin"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                Kaydet
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                İptal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content List */}
      <div className="grid gap-4">
        {heroContent.map((content) => (
          <Card key={content.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">
                      {SECTION_OPTIONS.find(s => s.value === content.section)?.label || content.section}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded ${content.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {content.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {typeof content.title === 'object' ? content.title.tr : content.title}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                    {typeof content.description === 'object' ? content.description.tr : content.description}
                  </p>
                  {content.buttonLink && (
                    <p className="text-xs text-blue-600">
                      Buton Linki: {content.buttonLink}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(content)}
                    disabled={editingId !== null || isCreating}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteMutation.mutate(content.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}