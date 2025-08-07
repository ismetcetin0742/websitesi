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
  Home
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
      title: "Hakkımızda Yönetimi",
      description: "Tüm hakkımızda bölümlerini tek yerden yönetin",
      icon: <Users className="h-6 w-6" />,
      href: "/admin/about",
      color: "bg-purple-500",
    },
    {
      title: "Referanslar Yönetimi",
      description: "Referanslar, partner logoları, projeler ve ana sayfa istatistikleri",
      icon: <Building className="h-6 w-6" />,
      href: "/admin/references",
      color: "bg-orange-500",
    },
    {
      title: "Site İçerikleri",
      description: "Ana sayfa, hakkımızda ve diğer sayfa içeriklerini düzenleyin",
      icon: <Globe className="h-6 w-6" />,
      href: "/admin/content",
      color: "bg-blue-500",
    },
    {
      title: "Blog Yazıları",
      description: "Blog yazılarını yönetin ve yeni yazılar ekleyin",
      icon: <FileText className="h-6 w-6" />,
      href: "/admin/blog",
      color: "bg-green-500",
    },
    {
      title: "Çözümler",
      description: "E-Flow BPM ve DMS çözümlerini yönetin",
      icon: <Target className="h-6 w-6" />,
      href: "/admin/solutions",
      color: "bg-orange-500",
    },
    {
      title: "Sektörler",
      description: "Sektör sayfalarını ve içeriklerini yönetin",
      icon: <Building className="h-6 w-6" />,
      href: "/admin/sectors",
      color: "bg-cyan-500",
    },
    {
      title: "İletişim Mesajları",
      description: "Gelen iletişim formlarını görüntüleyin",
      icon: <MessageSquare className="h-6 w-6" />,
      href: "/admin/contacts",
      color: "bg-red-500",
    },
    {
      title: "Demo Talepleri",
      description: "Demo taleplerini yönetin",
      icon: <BarChart3 className="h-6 w-6" />,
      href: "/admin/demos",
      color: "bg-indigo-500",
    },
    {
      title: "İş Başvuruları",
      description: "Kariyer başvurularını görüntüleyin",
      icon: <Briefcase className="h-6 w-6" />,
      href: "/admin/applications",
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

      {/* Stats Cards */}
      {!isLoading && stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam İletişim</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.contactMessages || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demo Talepleri</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.demoRequests || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Yazıları</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.blogPosts || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">İş Başvuruları</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.jobApplications || 0}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Admin Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => (
          <Card key={section.href} className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href={section.href}>
              <a className="block">
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
              </a>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}