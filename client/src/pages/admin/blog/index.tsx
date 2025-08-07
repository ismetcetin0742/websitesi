import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FileText, Plus, Edit, Settings, ArrowLeft } from "lucide-react";

export default function BlogManagementPage() {
  const blogSections = [
    {
      title: "Blog Yazıları",
      description: "Tüm blog yazılarını görüntüleyin, düzenleyin ve yönetin",
      icon: <FileText className="h-8 w-8" />,
      href: "/admin/blog/posts",
      color: "bg-blue-500"
    },
    {
      title: "Yeni Yazı Oluştur",
      description: "Yeni blog yazısı ekleyin",
      icon: <Plus className="h-8 w-8" />,
      href: "/admin/blog/create",
      color: "bg-green-500"
    },
    {
      title: "Blog Ayarları",
      description: "Blog sayfası genel ayarları ve yapılandırması",
      icon: <Settings className="h-8 w-8" />,
      href: "/admin/blog/settings",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Dashboard'a Dön
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Yönetimi</h1>
        <p className="text-gray-600">
          Blog sayfasındaki tüm içerikleri tek merkezden yönetin
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogSections.map((section, index) => (
          <Link key={index} href={section.href}>
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer h-full border-l-4 border-l-transparent hover:border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`${section.color} p-3 rounded-lg text-white`}>
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm mb-4">
                  {section.description}
                </CardDescription>
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