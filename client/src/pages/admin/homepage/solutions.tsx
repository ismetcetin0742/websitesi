import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Save, X, Plus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface HomepageSolution {
  id: string;
  title: {
    tr: string;
    en: string;
    fr: string;
    ar: string;
    ru: string;
    de: string;
  };
  description: {
    tr: string;
    en: string;
    fr: string;
    ar: string;
    ru: string;
    de: string;
  };
  icon: string;
  link: string;
  order: number;
}

export default function HomepageSolutions() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<HomepageSolution>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check for admin token on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
    }
  }, []);

  const { data: solutions, isLoading } = useQuery<HomepageSolution[]>({
    queryKey: ["/api/homepage-solutions"],
    queryFn: async () => {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/homepage-solutions', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Solutions fetch failed');
      }
      return response.json();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; updates: Partial<HomepageSolution> }) => {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/homepage-solutions/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data.updates),
      });
      if (!response.ok) {
        throw new Error('Update failed');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/homepage-solutions"] });
      toast({
        title: "Başarılı",
        description: "Çözüm güncellendi",
      });
      setEditingId(null);
      setEditData({});
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Çözüm güncellenirken hata oluştu",
        variant: "destructive",
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<HomepageSolution, 'id'>) => {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/homepage-solutions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Create failed');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/homepage-solutions"] });
      toast({
        title: "Başarılı",
        description: "Yeni çözüm eklendi",
      });
      setEditingId(null);
      setEditData({});
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Çözüm eklenirken hata oluştu",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/homepage-solutions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Delete failed');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/homepage-solutions"] });
      toast({
        title: "Başarılı",
        description: "Çözüm silindi",
      });
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Çözüm silinirken hata oluştu",
        variant: "destructive",
      });
    },
  });

  const startEdit = (solution: HomepageSolution) => {
    setEditingId(solution.id);
    setEditData(solution);
  };

  const startCreate = () => {
    setEditingId('new');
    setEditData({
      title: { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
      description: { tr: '', en: '', fr: '', ar: '', ru: '', de: '' },
      icon: '',
      link: '',
      order: (solutions?.length || 0) + 1,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveChanges = () => {
    if (editingId === 'new') {
      createMutation.mutate(editData as Omit<HomepageSolution, 'id'>);
    } else if (editingId && editData) {
      updateMutation.mutate({ id: editingId, updates: editData });
    }
  };

  const updateField = (field: string, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const updateMultiLangField = (field: string, lang: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: {
        ...prev[field as keyof typeof prev],
        [lang]: value
      }
    }));
  };

  if (isLoading) {
    return <div className="p-6">Yükleniyor...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ana Sayfa Çözümlerimiz</h1>
          <p className="text-gray-600 mt-1">Ana sayfada görünen çözümler bölümünü yönetin</p>
        </div>
        <Button onClick={startCreate} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Çözüm Ekle
        </Button>
      </div>

      <div className="grid gap-6">
        {solutions?.map((solution) => (
          <Card key={solution.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{solution.title.tr}</CardTitle>
                <div className="flex gap-2">
                  {editingId === solution.id ? (
                    <>
                      <Button 
                        size="sm" 
                        onClick={saveChanges}
                        disabled={updateMutation.isPending}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => startEdit(solution)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => deleteMutation.mutate(solution.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editingId === solution.id ? (
                <div className="space-y-4">
                  {/* Turkish */}
                  <div>
                    <Label>Başlık (Türkçe)</Label>
                    <Input
                      value={editData.title?.tr || ''}
                      onChange={(e) => updateMultiLangField('title', 'tr', e.target.value)}
                      placeholder="Türkçe başlık"
                    />
                  </div>
                  <div>
                    <Label>Açıklama (Türkçe)</Label>
                    <Textarea
                      value={editData.description?.tr || ''}
                      onChange={(e) => updateMultiLangField('description', 'tr', e.target.value)}
                      placeholder="Türkçe açıklama"
                      rows={3}
                    />
                  </div>

                  {/* English */}
                  <div>
                    <Label>Başlık (İngilizce)</Label>
                    <Input
                      value={editData.title?.en || ''}
                      onChange={(e) => updateMultiLangField('title', 'en', e.target.value)}
                      placeholder="English title"
                    />
                  </div>
                  <div>
                    <Label>Açıklama (İngilizce)</Label>
                    <Textarea
                      value={editData.description?.en || ''}
                      onChange={(e) => updateMultiLangField('description', 'en', e.target.value)}
                      placeholder="English description"
                      rows={3}
                    />
                  </div>

                  {/* Other fields */}
                  <div>
                    <Label>İkon (CSS sınıfı)</Label>
                    <Input
                      value={editData.icon || ''}
                      onChange={(e) => updateField('icon', e.target.value)}
                      placeholder="Örn: Settings, Database, vb."
                    />
                  </div>
                  <div>
                    <Label>Link</Label>
                    <Input
                      value={editData.link || ''}
                      onChange={(e) => updateField('link', e.target.value)}
                      placeholder="/solutions/eflow-bpm"
                    />
                  </div>
                  <div>
                    <Label>Sıra</Label>
                    <Input
                      type="number"
                      value={editData.order || 0}
                      onChange={(e) => updateField('order', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{solution.description.tr}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>İkon: {solution.icon}</span>
                    <span>Link: {solution.link}</span>
                    <span>Sıra: {solution.order}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* New Solution Form */}
        {editingId === 'new' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Yeni Çözüm Ekle</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={saveChanges}
                    disabled={createMutation.isPending}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelEdit}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Turkish */}
                <div>
                  <Label>Başlık (Türkçe)</Label>
                  <Input
                    value={editData.title?.tr || ''}
                    onChange={(e) => updateMultiLangField('title', 'tr', e.target.value)}
                    placeholder="Türkçe başlık"
                  />
                </div>
                <div>
                  <Label>Açıklama (Türkçe)</Label>
                  <Textarea
                    value={editData.description?.tr || ''}
                    onChange={(e) => updateMultiLangField('description', 'tr', e.target.value)}
                    placeholder="Türkçe açıklama"
                    rows={3}
                  />
                </div>

                {/* English */}
                <div>
                  <Label>Başlık (İngilizce)</Label>
                  <Input
                    value={editData.title?.en || ''}
                    onChange={(e) => updateMultiLangField('title', 'en', e.target.value)}
                    placeholder="English title"
                  />
                </div>
                <div>
                  <Label>Açıklama (İngilizce)</Label>
                  <Textarea
                    value={editData.description?.en || ''}
                    onChange={(e) => updateMultiLangField('description', 'en', e.target.value)}
                    placeholder="English description"
                    rows={3}
                  />
                </div>

                {/* Other fields */}
                <div>
                  <Label>İkon (CSS sınıfı)</Label>
                  <Input
                    value={editData.icon || ''}
                    onChange={(e) => updateField('icon', e.target.value)}
                    placeholder="Örn: Settings, Database, vb."
                  />
                </div>
                <div>
                  <Label>Link</Label>
                  <Input
                    value={editData.link || ''}
                    onChange={(e) => updateField('link', e.target.value)}
                    placeholder="/solutions/eflow-bpm"
                  />
                </div>
                <div>
                  <Label>Sıra</Label>
                  <Input
                    type="number"
                    value={editData.order || 0}
                    onChange={(e) => updateField('order', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}