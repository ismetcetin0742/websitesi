import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  FileText, 
  MessageSquare, 
  Briefcase,
  Settings,
  Globe,
  Target,
  Building,
  Home,
  Phone
} from "lucide-react";
import { Link } from "wouter";

interface AdminStats {
  contactMessages: number;
  demoRequests: number;
  blogPosts: number;
  jobApplications: number;
}

export default function AdminDashboard() {
  // Check for admin token on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    console.log('Dashboard - checking token:', token ? 'found' : 'not found');
    if (!token) {
      console.log('No admin token found, redirecting to login');
      window.location.href = '/admin/login';
    }
  }, []);

  const { data: stats, isLoading } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
    queryFn: async () => {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Stats fetch failed');
      }
      return response.json();
    }
  });

  const adminSections = [
    {
      title: "Ana Sayfa Yönetimi",
      description: "Ana sayfa çözümlerimiz bölümünü ve içeriklerini yönetin",
      icon: <Home className="h-6 w-6" />,
      href: "/admin/homepage",
      color: "bg-blue-600",
    },
    {
      title: "Hakkımızda Yönetimi",
      description: "Tüm hakkımızda bölümlerini tek yerden yönetin",
      icon: <Users className="h-6 w-6" />,
      href: "/admin/about",
      color: "bg-purple-500",
    },
    {
      title: "Blog Yönetimi",
      description: "Blog yazıları, yeni içerik oluşturma ve blog ayarları",
      icon: <FileText className="h-6 w-6" />,
      href: "/admin/blog",
      color: "bg-blue-500",
    },
    {
      title: "Referanslar Yönetimi",
      description: "Referanslar, partner logoları, projeler ve ana sayfa istatistikleri",
      icon: <Building className="h-6 w-6" />,
      href: "/admin/references",
      color: "bg-orange-500",
    },
    {
      title: "İletişim Sayfası Yönetimi",
      description: "İletişim sayfası içerikleri ve bilgilerini yönetin",
      icon: <Phone className="h-6 w-6" />,
      href: "/admin/contact",
      color: "bg-emerald-500",
    },
    {
      title: "Demo Talepleri",
      description: "Demo taleplerini yönetin",
      icon: <BarChart3 className="h-6 w-6" />,
      href: "/admin/demos",
      color: "bg-indigo-500",
    },
    {
      title: "Kariyer Yönetimi",
      description: "İş pozisyonları ve başvuruları yönetin",
      icon: <Briefcase className="h-6 w-6" />,
      href: "/admin/careers",
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Algotrom web sitesi yönetim paneli</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/settings">
            <Settings className="h-4 w-4 mr-2" />
            Ayarlar
          </Link>
        </Button>
      </div>



      {/* Admin Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg text-white ${section.color}`}>
                    {section.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}