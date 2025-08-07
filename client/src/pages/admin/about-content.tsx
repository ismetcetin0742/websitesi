import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Edit, Loader2, Save } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function AdminAboutContent() {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Static content that can be edited
  const [content, setContent] = useState({
    about: {
      title: "Hakkımızda",
      description: "15 yılı aşkın deneyimimizle, işletmelerin dijital dönüşüm yolculuğunda güvenilir teknoloji partneri olarak yer alıyoruz."
    },
    mission: {
      title: "Misyonumuz",
      description: "İşletmelerin dijital dönüşüm süreçlerinde güvenilir teknoloji partneri olarak, iş süreçlerini optimize eden, verimliliği artıran ve rekabet avantajı sağlayan yenilikçi çözümler sunmaktır. Müşterilerimizin başarısına odaklanarak, kaliteli yazılım çözümleri ve sürekli destek hizmeti sağlarız."
    },
    vision: {
      title: "Vizyonumuz", 
      description: "Türkiye'nin önde gelen dijital dönüşüm çözümleri sağlayıcısı olarak, işletmelerin küresel rekabette öne çıkmasını sağlamak. Teknolojinin gücünü kullanarak sürdürülebilir büyüme ve yenilikçi iş modelleri yaratmak, dijital çağda liderlik eden kuruluşlar yetiştirmektir."
    },
    values: {
      title: "Değerlerimiz",
      description: "Çalışma prensiplerimizi şekillendiren temel değerler"
    }
  });

  const [editingContent, setEditingContent] = useState("");

  const handleEdit = (section: string) => {
    setEditMode(section);
    setEditingContent(content[section as keyof typeof content].description);
  };

  const handleSave = async (section: string) => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setContent(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          description: editingContent
        }
      }));

      toast({
        title: "Başarılı",
        description: "İçerik güncellendi.",
      });
      setEditMode(null);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Güncelleme sırasında bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
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

      <div className="grid gap-6">
        {sections.map((section) => {
          const sectionData = content[section.key as keyof typeof content];
          const Icon = section.icon;
          const isEditing = editMode === section.key;

          return (
            <Card key={section.key} className="border-l-4" style={{ borderLeftColor: `var(--${section.color}-500)` }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center space-x-2">
                      <Icon className="h-5 w-5" style={{ color: `var(--${section.color}-500)` }} />
                      <span>{sectionData.title}</span>
                    </CardTitle>
                  </div>
                  {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => handleEdit(section.key)}>
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
                      <Label htmlFor={`${section.key}-content`}>İçerik</Label>
                      <Textarea
                        id={`${section.key}-content`}
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        rows={6}
                        className="mt-2"
                        placeholder="İçeriği buraya yazın..."
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleSave(section.key)}
                        disabled={saving}
                      >
                        {saving ? (
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
                    <p className="text-gray-700 leading-relaxed">{sectionData.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}