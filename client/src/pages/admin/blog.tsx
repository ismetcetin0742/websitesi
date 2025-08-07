import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Plus, Edit, Calendar } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

export default function AdminBlog() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Blog Yazıları</h1>
        </div>
        <div className="text-center py-8">Yükleniyor...</div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold">Blog Yazıları</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {blogPosts?.length || 0} Yazı
          </Badge>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Yazı
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {blogPosts?.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Henüz hiç blog yazısı yok.</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                İlk Yazıyı Ekle
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {blogPosts?.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>{post.title}</span>
                      </CardTitle>
                      <CardDescription>
                        {post.excerpt || "Açıklama mevcut değil"}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {post.createdAt ? new Date(post.createdAt).toLocaleDateString("tr-TR") : ""}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Düzenle
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {post.content && (
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        {typeof post.content === 'string' 
                          ? post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '')
                          : (post.content as any)?.tr?.substring(0, 150) + ((post.content as any)?.tr?.length > 150 ? '...' : '') || "İçerik mevcut değil"}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}