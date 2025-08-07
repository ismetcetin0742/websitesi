import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ReferencesContent } from "@shared/schema";
import { Pencil, FileText, Target, Megaphone } from "lucide-react";

interface ContentModalProps {
  content: ReferencesContent | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

function ContentModal({ content, onClose, onSave }: ContentModalProps) {
  const [formData, setFormData] = useState({
    title: content?.title || "",
    content: content?.content || "",
    buttonText: content?.buttonText || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>İçerik Düzenle</CardTitle>
          <CardDescription>
            {content?.section === 'hero' && 'Ana sayfa başlık ve açıklama'}
            {content?.section === 'trusted_partner' && 'Güvenilen Çözüm Ortağınız bölümü'}
            {content?.section === 'cta' && 'Başarı Hikayesi çağrı bölümü'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Bölüm başlığı"
                required
              />
            </div>

            <div>
              <Label htmlFor="content">İçerik</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Bölüm içeriği"
                rows={4}
                required
              />
            </div>

            {content?.section === 'cta' && (
              <div>
                <Label htmlFor="buttonText">Buton Metni</Label>
                <Input
                  id="buttonText"
                  value={formData.buttonText}
                  onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                  placeholder="Buton yazısı"
                />
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                İptal
              </Button>
              <Button type="submit">
                Kaydet
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ReferencesContentPage() {
  const { toast } = useToast();
  const [selectedContent, setSelectedContent] = useState<ReferencesContent | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { data: referencesContent = [], isLoading } = useQuery<ReferencesContent[]>({
    queryKey: ["/api/admin/references-content"],
  });

  const updateMutation = useMutation({
    mutationFn: ({ section, data }: { section: string; data: any }) =>
      apiRequest(`/api/admin/references-content/${section}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/references-content"] });
      queryClient.invalidateQueries({ queryKey: ["/api/references-content"] });
      setShowModal(false);
      setSelectedContent(null);
      toast({
        title: "Başarılı",
        description: "İçerik güncellendi",
      });
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Güncelleme sırasında hata oluştu",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (content: ReferencesContent) => {
    setSelectedContent(content);
    setShowModal(true);
  };

  const handleSave = (data: any) => {
    if (!selectedContent) return;
    updateMutation.mutate({ section: selectedContent.section, data });
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'hero': return <FileText className="w-6 h-6" />;
      case 'trusted_partner': return <Target className="w-6 h-6" />;
      case 'cta': return <Megaphone className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };

  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'hero': return 'Ana Sayfa Hero';
      case 'trusted_partner': return 'Güvenilen Çözüm Ortağınız';
      case 'cta': return 'Başarı Hikayesi CTA';
      default: return section;
    }
  };

  const getSectionColor = (section: string) => {
    switch (section) {
      case 'hero': return 'bg-blue-500';
      case 'trusted_partner': return 'bg-green-500';
      case 'cta': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Referanslar İçerik Yönetimi</h1>
        <p className="text-gray-600">
          Referanslar sayfasındaki yazıları düzenleyin
        </p>
      </div>

      <div className="grid gap-6">
        {referencesContent.map((content) => (
          <Card key={content.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${getSectionColor(content.section)} flex items-center justify-center text-white`}>
                    {getSectionIcon(content.section)}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{getSectionTitle(content.section)}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {content.title}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(content)}
                  disabled={updateMutation.isPending}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Düzenle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {content.content}
              </p>
              {content.buttonText && (
                <div className="text-sm text-gray-500">
                  <strong>Buton:</strong> {content.buttonText}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {showModal && (
        <ContentModal
          content={selectedContent}
          onClose={() => {
            setShowModal(false);
            setSelectedContent(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}