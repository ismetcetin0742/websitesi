import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/i18n';
import { BlogPost } from '@shared/schema';
import {
  Search,
  ArrowRight,
  Calendar,
  User,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  BookOpen
} from 'lucide-react';

export default function Blog() {
  const params = useParams();
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Helper function to get text from multilingual content
  const getMultilingualText = (content: any) => {
    if (!content) return '';
    if (typeof content === 'string') return content;
    if (typeof content === 'object') {
      return content[language] || content.tr || Object.values(content)[0] || '';
    }
    return '';
  };

  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const { data: singlePost, isLoading: singlePostLoading } = useQuery<BlogPost>({
    queryKey: ['/api/blog', params.id],
    enabled: !!params.id,
  });

  const categories = [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'Dijital Dönüşüm', label: 'Dijital Dönüşüm' },
    { value: 'BPM', label: 'BPM' },
    { value: 'Güvenlik', label: 'Güvenlik' },
    { value: 'İş Zekası', label: 'İş Zekası' },
    { value: 'Teknoloji', label: 'Teknoloji' }
  ];

  // If showing single blog post
  if (params.id) {
    if (singlePostLoading) {
      return (
        <div className="py-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">{t('common.loading', language)}</p>
          </div>
        </div>
      );
    }

    if (!singlePost) {
      return (
        <div className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog yazısı bulunamadı</h1>
            <Button asChild>
              <Link href="/blog">Blog'a Dön</Link>
            </Button>
          </div>
        </div>
      );
    }

    const postTitle = getMultilingualText(singlePost.title as any);
    const postContent = getMultilingualText(singlePost.content as any);

    return (
      <div className="py-12">
        {/* Blog Post Header */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Link href="/blog" className="text-primary hover:text-blue-700 transition-colors inline-flex items-center">
                  ← Blog'a Dön
                </Link>
              </div>
              
              <div className="flex items-center mb-6">
                <Badge className="mr-4">{singlePost.category}</Badge>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{singlePost.publishedAt ? new Date(singlePost.publishedAt).toLocaleDateString('tr-TR') : ''}</span>
                </div>
              </div>

              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {postTitle}
              </h1>

              {singlePost.image && (
                <div className="mb-8">
                  <img 
                    src={singlePost.image} 
                    alt={postTitle}
                    className="w-full h-96 object-cover rounded-2xl shadow-lg" 
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Blog Post Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-12">
                <div className="lg:col-span-3">
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: postContent.replace(/\n/g, '<br />') }} />
                  </div>

                  {/* Social Share */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Bu yazıyı paylaş</h3>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="sm">
                        <Facebook className="w-4 h-4 mr-2" />
                        Facebook
                      </Button>
                      <Button variant="outline" size="sm">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Kopyala
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Yazılar</h3>
                      {blogPosts?.slice(0, 3).map((post) => (
                        <div key={post.id} className="mb-4 pb-4 border-b border-gray-100 last:border-0">
                          <Link 
                            href={`/blog/${post.id}`}
                            className="text-gray-900 hover:text-primary transition-colors font-medium line-clamp-2"
                          >
                            {getMultilingualText(post.title as any)}
                          </Link>
                          <p className="text-sm text-gray-600 mt-1">
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('tr-TR') : ''}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Filter blog posts
  const filteredPosts = blogPosts?.filter(post => {
    const postTitle = getMultilingualText(post.title as any);
    const matchesSearch = searchTerm === '' || 
      postTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {t('nav.blog', language)}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Teknoloji dünyasından son gelişmeler, uzman görüşleri ve dijital dönüşüm rehberleri.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Blog yazılarında ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center">
              <p className="text-gray-600">{t('common.loading', language)}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Blog yazısı bulunamadı</h3>
              <p className="text-gray-600">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover-lift overflow-hidden">
                  <div className="aspect-video">
                    <img 
                      src={post.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600"} 
                      alt="Blog post" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-gray-500 text-sm ml-auto flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('tr-TR') : ''}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary transition-colors cursor-pointer">
                      <Link href={`/blog/${post.id}`}>
                        {getMultilingualText(post.title as any)}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {getMultilingualText(post.excerpt as any)}
                    </p>
                    <Link 
                      href={`/blog/${post.id}`}
                      className="text-primary font-semibold hover:text-blue-700 transition-colors inline-flex items-center"
                    >
                      {t('common.readMore', language)} <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredPosts.length > 9 && (
            <div className="text-center mt-12">
              <Button variant="outline">
                Daha Fazla Yükle
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sıkça Sorulan Sorular</h2>
            <p className="text-lg text-gray-600">
              En çok merak edilen konulara hızlı yanıtlar
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'Demo talep etmek ücretsiz mi?',
                answer: 'Evet, ürün demolarımız tamamen ücretsizdir. Uzmanlarımız size ürünlerimizi detaylı olarak tanıtır.'
              },
              {
                question: 'Teknik destek hizmeti var mı?',
                answer: 'Evet, 7/24 teknik destek hizmeti sunuyoruz. Telefon, e-posta ve uzaktan erişim ile destek alabilirsiniz.'
              },
              {
                question: 'Mevcut sistemlerimizle entegre olabilir mi?',
                answer: 'Evet, çözümlerimiz mevcut ERP, CRM ve diğer sistemlerle sorunsuz entegre olabilir.'
              }
            ].map((faq, index) => (
              <Card key={index} className="border-gray-100">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h4>
                  <p className="text-gray-700">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* LinkedIn Integration */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">LinkedIn'de Takip Edin</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            En güncel içeriklerimizi ve sektör haberlerini LinkedIn sayfamızdan takip edebilirsiniz.
            Blog yazılarımız otomatik olarak LinkedIn'de paylaşılır.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <a href="https://linkedin.com/company/algotrom" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn'de Takip Et
            </a>
          </Button>
        </div>
      </section>

    </div>
  );
}
