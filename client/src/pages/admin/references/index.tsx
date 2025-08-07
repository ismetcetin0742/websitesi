import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FileText, Image, Building, ArrowRight, BarChart3 } from "lucide-react";

export default function ReferencesManagement() {
  const sections = [
    {
      title: "İçerik Yönetimi",
      description: "Hero, CTA ve Güvenilen Çözüm Ortağınız bölümlerindeki yazıları düzenleyin",
      icon: <FileText className="h-8 w-8" />,
      href: "/admin/references/content",
      color: "bg-blue-500"
    },
    {
      title: "Partner Logoları",
      description: "Güvenilen Çözüm Ortağınız bölümündeki şirket logolarını yönetin",
      icon: <Image className="h-8 w-8" />,
      href: "/admin/references/logos",
      color: "bg-green-500"
    },
    {
      title: "Referans Projeleri",
      description: "Müşteri projelerini ve başarı hikayelerini yönetin",
      icon: <Building className="h-8 w-8" />,
      href: "/admin/references/projects",
      color: "bg-purple-500"
    },
    {
      title: "Sayfa İstatistikleri",
      description: "Ana sayfadaki istatistik bölümünü yönetin (100+ Başarılı Proje, %95 Müşteri Memnuniyeti, vb.)",
      icon: <BarChart3 className="h-8 w-8" />,
      href: "/admin/homepage/statistics",
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Referanslar Yönetimi</h1>
        <p className="text-gray-600">
          Referanslar sayfasındaki tüm içerikleri tek merkezden yönetin
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section) => (
          <Card key={section.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center text-white mb-4`}>
                {section.icon}
              </div>
              <CardTitle className="text-xl">{section.title}</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {section.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={section.href}>
                  Yönet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}