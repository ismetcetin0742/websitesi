import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Plus, Edit, Calendar } from "lucide-react";
import { Link } from "wouter";
import { EditModal } from "@/components/EditModal";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  content: string | { tr: string; en: string };
  excerpt?: string;
  category: string;
  publishedAt: Date | null;
}

export default function AdminBlogPosts() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  const handleSave = async (data: any) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/blog/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Blog yazısı güncellendi.",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Güncelleme başarısız');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Güncelleme sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const editFields = [
    { key: 'title', label: 'Başlık', type: 'text' as const, required: true },
    { key: 'category', label: 'Kategori', type: 'text' as const, required: true },
    { key: 'excerpt', label: 'Özet', type: 'textarea' as const },
    { key: 'content', label: 'İçerik', type: 'textarea' as const, required: true },
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/admin/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Blog Yönetimi
            </Button>
          </Link>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/admin/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Blog Yönetimi
            </Button>
          </Link>
        </div>
        <Link href="/admin/blog/create">
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            Yeni Yazı
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Blog Yazıları</h1>
        <p className="text-gray-600">Tüm blog yazılarını görüntüleyin ve düzenleyin</p>
      </div>

      <div className="grid gap-6">
        {blogPosts?.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    {post.publishedAt && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                      </div>
                    )}
                  </div>
                  {post.excerpt && (
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(post)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Düzenle
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}

        {!blogPosts?.length && (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Henüz blog yazısı yok
              </h3>
              <p className="text-gray-600 mb-4">
                İlk blog yazınızı oluşturmak için butona tıklayın.
              </p>
              <Link href="/admin/blog/create">
                <Button>
                  <Plus className="h-4 w-4 mr-1" />
                  Yeni Yazı Oluştur
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Blog Yazısını Düzenle"
        data={selectedPost || {}}
        fields={editFields}
        onSave={handleSave}
      />
    </div>
  );
}