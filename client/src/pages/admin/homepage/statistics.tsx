import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Plus, Edit3, Trash2, Save, X, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import type { HomepageStatistic } from '@shared/schema';

interface StatisticFormData {
  key: string;
  value: string;
  label: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
}

const iconOptions = [
  { value: 'TrendingUp', label: 'Trending Up' },
  { value: 'Star', label: 'Star' },
  { value: 'Calendar', label: 'Calendar' },
  { value: 'Users', label: 'Users' },
  { value: 'Award', label: 'Award' },
  { value: 'Target', label: 'Target' },
  { value: 'Building', label: 'Building' },
  { value: 'Heart', label: 'Heart' }
];

export default function AdminHomepageStatistics() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<StatisticFormData>({
    key: '',
    value: '',
    label: '',
    icon: 'TrendingUp',
    displayOrder: 0,
    isActive: true
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: statistics = [], isLoading } = useQuery<HomepageStatistic[]>({
    queryKey: ['/api/admin/homepage-statistics'],
  });

  const createMutation = useMutation({
    mutationFn: async (data: StatisticFormData) => {
      return await apiRequest('/api/admin/homepage-statistics', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({ title: "Başarılı", description: "İstatistik eklendi" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/homepage-statistics'] });
      setIsCreating(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "Hata", description: "İstatistik eklenemedi", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: StatisticFormData }) => {
      return await apiRequest(`/api/admin/homepage-statistics/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({ title: "Başarılı", description: "İstatistik güncellendi" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/homepage-statistics'] });
      setEditingId(null);
      resetForm();
    },
    onError: () => {
      toast({ title: "Hata", description: "İstatistik güncellenemedi", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/admin/homepage-statistics/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      toast({ title: "Başarılı", description: "İstatistik silindi" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/homepage-statistics'] });
    },
    onError: () => {
      toast({ title: "Hata", description: "İstatistik silinemedi", variant: "destructive" });
    }
  });

  const resetForm = () => {
    setFormData({
      key: '',
      value: '',
      label: '',
      icon: 'TrendingUp',
      displayOrder: 0,
      isActive: true
    });
  };

  const handleEdit = (statistic: HomepageStatistic) => {
    setEditingId(statistic.id);
    setFormData({
      key: statistic.key,
      value: statistic.value,
      label: statistic.label,
      icon: statistic.icon || 'TrendingUp',
      displayOrder: statistic.displayOrder || 0,
      isActive: statistic.isActive || true
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
          <h1 className="text-3xl font-bold text-gray-900">İstatistikler Yönetimi</h1>
          <p className="text-gray-600">
            Ana sayfadaki istatistik bölümünü yönetin
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating || editingId !== null}>
          <Plus className="h-4 w-4 mr-2" />
          Yeni İstatistik
        </Button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Yeni İstatistik Ekle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="key">Anahtar</Label>
                <Input
                  id="key"
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  placeholder="Örn: projects"
                />
              </div>
              <div>
                <Label htmlFor="value">Değer</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="Örn: 100+"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="label">Etiket</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="Örn: Başarılı Proje"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="icon">İkon</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="İkon seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
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
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={createMutation.isPending}>
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

      {/* Statistics List */}
      <div className="grid gap-4">
        {statistics.map((statistic) => (
          <Card key={statistic.id}>
            <CardContent className="p-6">
              {editingId === statistic.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`key-${statistic.id}`}>Anahtar</Label>
                      <Input
                        id={`key-${statistic.id}`}
                        value={formData.key}
                        onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`value-${statistic.id}`}>Değer</Label>
                      <Input
                        id={`value-${statistic.id}`}
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`label-${statistic.id}`}>Etiket</Label>
                    <Input
                      id={`label-${statistic.id}`}
                      value={formData.label}
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`icon-${statistic.id}`}>İkon</Label>
                      <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {iconOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor={`displayOrder-${statistic.id}`}>Sıralama</Label>
                      <Input
                        id={`displayOrder-${statistic.id}`}
                        type="number"
                        value={formData.displayOrder}
                        onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`isActive-${statistic.id}`}
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label htmlFor={`isActive-${statistic.id}`}>Aktif</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={updateMutation.isPending}>
                      <Save className="h-4 w-4 mr-2" />
                      Kaydet
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-primary">{statistic.value}</div>
                    <div>
                      <div className="font-medium">{statistic.label}</div>
                      <div className="text-sm text-gray-500">
                        Anahtar: {statistic.key} | İkon: {statistic.icon} | Sıra: {statistic.displayOrder}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-full text-xs ${statistic.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      {statistic.isActive ? 'Aktif' : 'Pasif'}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(statistic)}
                      disabled={editingId !== null || isCreating}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteMutation.mutate(statistic.id)}
                      disabled={deleteMutation.isPending || editingId !== null || isCreating}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}