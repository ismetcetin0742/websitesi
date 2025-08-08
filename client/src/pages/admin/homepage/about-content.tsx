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
import type { AboutContent } from '@shared/schema';

const LANGUAGE_OPTIONS = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
  { code: 'ru', label: 'Русский' },
  { code: 'de', label: 'Deutsch' }
];

const SECTION_OPTIONS = [
  { value: 'hero_text', label: 'Ana Sayfa Metni' },
  { value: 'mission', label: 'Misyon' },
  { value: 'vision', label: 'Vizyon' },
  { value: 'values', label: 'Değerler' },
  { value: 'about', label: 'Hakkımızda' }
];

interface AboutContentFormData {
  section: string;
  title: Record<string, string>;
  content: Record<string, string>;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminAboutContent() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('tr');
  const [formData, setFormData] = useState<AboutContentFormData>({
    section: '',
    title: { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
    content: { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
    displayOrder: 0,
    isActive: true
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: aboutContent = [], isLoading } = useQuery<AboutContent[]>({
    queryKey: ['/api/admin/about-content'],
  });

  const createMutation = useMutation({
    mutationFn: async (data: AboutContentFormData) => {
      return await apiRequest('/api/admin/about-content', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      toast({ title: "Başarılı", description: "İçerik oluşturuldu" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/about-content'] });
      resetForm();
      setIsCreating(false);
    },
    onError: () => {
      toast({ title: "Hata", description: "İçerik oluşturulamadı", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<AboutContentFormData> }) => {
      return await apiRequest(`/api/admin/about-content/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      toast({ title: "Başarılı", description: "İçerik güncellendi" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/about-content'] });
      setEditingId(null);
      resetForm();
    },
    onError: () => {
      toast({ title: "Hata", description: "İçerik güncellenemedi", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/admin/about-content/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      toast({ title: "Başarılı", description: "İçerik silindi" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/about-content'] });
    },
    onError: () => {
      toast({ title: "Hata", description: "İçerik silinemedi", variant: "destructive" });
    }
  });

  const resetForm = () => {
    setFormData({
      section: '',
      title: { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
      content: { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
      displayOrder: 0,
      isActive: true
    });
  };

  const handleEdit = (content: AboutContent) => {
    setEditingId(content.id);
    setFormData({
      section: content.section,
      title: content.title || { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
      content: content.content || { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
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

  const updateMultiLangField = (field: 'title' | 'content', lang: string, value: string) => {
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
          <h1 className="text-3xl font-bold text-gray-900">Hakkımızda İçerik Yönetimi</h1>
          <p className="text-gray-600">
            Ana sayfadaki hakkımızda bölümündeki metinleri yönetin
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating || editingId !== null}>
          <Plus className="h-4 w-4 mr-2" />
          Yeni İçerik Ekle
        </Button>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {editingId ? 'İçerik Düzenle' : 'Yeni İçerik Ekle'}
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

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Aktif</Label>
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
              <Label htmlFor="content">İçerik ({LANGUAGE_OPTIONS.find(l => l.code === currentLanguage)?.label})</Label>
              <Textarea
                id="content"
                value={formData.content[currentLanguage] || ''}
                onChange={(e) => updateMultiLangField('content', currentLanguage, e.target.value)}
                placeholder="İçerik girin"
                rows={6}
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
        {aboutContent.map((content) => (
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
                  <p className="text-sm text-gray-500 line-clamp-3">
                    {typeof content.content === 'object' ? content.content.tr : content.content}
                  </p>
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