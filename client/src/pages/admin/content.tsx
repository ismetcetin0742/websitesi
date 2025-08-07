import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe, Edit, Home, Info, Phone, Users, Building, Target } from "lucide-react";
import { Link } from "wouter";

// Static content data - in a real app this would come from the database
const siteContent = [
  {
    id: "homepage",
    title: "Ana Sayfa",
    titleEn: "Homepage",
    description: "Ana sayfa içeriği ve banner metinleri",
    type: "page",
    status: "active",
    lastUpdated: "2025-01-07",
    sections: ["Hero Banner", "Çözümler Özeti", "Neden Algotrom", "İstatistikler"]
  },
  {
    id: "about",
    title: "Hakkımızda",
    titleEn: "About Us", 
    description: "Şirket hikayesi ve değerler",
    type: "page",
    status: "active",
    lastUpdated: "2025-01-05",
    sections: ["Şirket Hikayesi", "Misyon & Vizyon", "Değerlerimiz", "Yönetim Ekibi"]
  },
  {
    id: "contact",
    title: "İletişim",
    titleEn: "Contact",
    description: "İletişim bilgileri ve ofis adresleri",
    type: "page", 
    status: "active",
    lastUpdated: "2025-01-06",
    sections: ["Ofis Adresi", "İletişim Bilgileri", "Çalışma Saatleri", "Harita"]
  },
  {
    id: "footer",
    title: "Footer",
    titleEn: "Footer",
    description: "Alt sayfa genel bilgileri",
    type: "component",
    status: "active", 
    lastUpdated: "2024-12-20",
    sections: ["Şirket Bilgileri", "Hızlı Linkler", "Sosyal Medya", "Telif Hakkı"]
  },
  {
    id: "navigation",
    title: "Navigasyon",
    titleEn: "Navigation",
    description: "Menü yapısı ve linkler",
    type: "component",
    status: "active",
    lastUpdated: "2024-12-15",
    sections: ["Ana Menü", "Alt Menüler", "Mobil Menü", "Breadcrumb"]
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "page":
      return <Globe className="h-4 w-4" />;
    case "component":
      return <Building className="h-4 w-4" />;
    default:
      return <Target className="h-4 w-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "page":
      return "bg-blue-500";
    case "component":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export default function AdminContent() {
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
          <h1 className="text-3xl font-bold">Site İçerikleri</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {siteContent.length} İçerik
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {siteContent.map((content) => (
          <Card key={content.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center space-x-2">
                    {getTypeIcon(content.type)}
                    <span>{content.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {content.type === "page" ? "Sayfa" : "Bileşen"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    <div className="space-y-1">
                      <div>{content.description}</div>
                      <div className="text-xs text-gray-400">{content.titleEn}</div>
                    </div>
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {new Date(content.lastUpdated).toLocaleDateString("tr-TR")}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" />
                    Düzenle
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Bölümler</p>
                  <div className="flex flex-wrap gap-2">
                    {content.sections.map((section, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {section}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${content.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-gray-600">
                      {content.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}