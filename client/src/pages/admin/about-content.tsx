import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Edit, Loader2, Save } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { AboutContent } from "@shared/schema";

export default function AdminAboutContent() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  // Fetch about content from API
  const { data: content = [], isLoading } = useQuery<AboutContent[]>({
    queryKey: ['/api/about-content'],
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ section, title, content }: { section: string; title: string; content: string }) => {
      return apiRequest(`/api/admin/about-content/${section}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "İçerik güncellendi.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/about-content'] });
      setEditMode(null);
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Güncelleme sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  });

  const handleEdit = (item: AboutContent) => {
    setEditMode(item.section);
    setEditingContent(item.content);
  };

  const handleSave = async (section: string) => {
    const item = content.find(c => c.section === section);
    if (!item) return;

    updateMutation.mutate({ 
      section, 
      title: item.title, 
      content: editingContent 
    });
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditingContent("");
  };

  const sections = [
    { key: 'about', icon: FileText, color: 'blue' },
    { key: 'mission', icon: FileText, color: 'green' },
    { key: 'vision', icon: FileText, color: 'purple' },
    { key: 'values', icon: FileText, color: 'orange' }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Hakkımızda İçerik Yönetimi</h1>
        </div>
        <Badge variant="secondary">
          4 Bölüm
        </Badge>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>İçerik yükleniyor...</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {content.map((item) => {
            const Icon = FileText;
            const isEditing = editMode === item.section;
            const colorMap = {
              about: 'blue',
              mission: 'green', 
              vision: 'purple',
              values: 'orange'
            };
            const color = colorMap[item.section as keyof typeof colorMap] || 'gray';

            return (
              <Card key={item.section} className="border-l-4" style={{ borderLeftColor: `hsl(var(--${color}-500))` }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center space-x-2">
                        <Icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </CardTitle>
                    </div>
                    {!isEditing && (
                      <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Düzenle
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`${item.section}-content`}>İçerik</Label>
                        <Textarea
                          id={`${item.section}-content`}
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          rows={6}
                          className="mt-2"
                          placeholder="İçeriği buraya yazın..."
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleSave(item.section)}
                          disabled={updateMutation.isPending}
                        >
                          {updateMutation.isPending ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Kaydet
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          İptal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">{item.content}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}