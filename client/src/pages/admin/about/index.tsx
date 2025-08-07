import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FileText, Target, Users, Building, Award } from "lucide-react";

export default function AboutManagementPage() {
  const aboutSections = [
    {
      title: "Genel İçerik",
      description: "Hakkımızda, Misyon, Vizyon bölümlerini düzenleyin",
      icon: <FileText className="h-6 w-6" />,
      href: "/admin/about/content",
      color: "bg-blue-500",
    },
    {
      title: "Şirket Değerleri",
      description: "Müşteri Odaklılık, İnovasyon, Takım Çalışması vb.",
      icon: <Target className="h-6 w-6" />,
      href: "/admin/about/values",
      color: "bg-emerald-500",
    },
    {
      title: "Takım Üyeleri",
      description: "Yönetim ekibi ve personel bilgilerini yönetin",
      icon: <Users className="h-6 w-6" />,
      href: "/admin/about/team",
      color: "bg-purple-500",
    },
    {
      title: "Şirket İstatistikleri",
      description: "Deneyim yılı, proje sayısı, müşteri sayısı vb.",
      icon: <Award className="h-6 w-6" />,
      href: "/admin/about/stats",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hakkımızda Yönetimi</h1>
        <p className="text-gray-600">Hakkımızda sayfasındaki tüm içerikleri buradan yönetebilirsiniz</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {aboutSections.map((section, index) => (
          <Link key={index} href={section.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`${section.color} p-3 rounded-lg text-white`}>
                    {section.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {section.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Yönet
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}