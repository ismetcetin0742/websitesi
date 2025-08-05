import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Code, Menu, Phone, Mail, Linkedin, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { languages, t, Language } from '@/lib/i18n';

export function Header() {
  const { language, setLanguage } = useLanguage();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { href: '/about', label: t('nav.about', language) },
    { 
      href: '/solutions', 
      label: t('nav.solutions', language),
      submenu: [
        { href: '/solutions/eflow-bpm', label: 'e-Flow BPM' },
        { href: '/solutions/document-management', label: 'Döküman Yönetim Sistemi' },
        { href: '/solutions/integration', label: 'Entegrasyon Çözümleri' }
      ]
    },
    { 
      href: '/sectors', 
      label: t('nav.sectors', language),
      submenu: [
        { href: '/sectors/manufacturing', label: 'Üretim' },
        { href: '/sectors/service', label: 'Hizmet' },
        { href: '/sectors/energy', label: 'Enerji' },
        { href: '/sectors/retail', label: 'Perakende' }
      ]
    },
    { href: '/references', label: t('nav.references', language) },
    { href: '/blog', label: t('nav.blog', language) },
    { href: '/career', label: t('nav.career', language) },
    { href: '/contact', label: t('nav.contact', language) }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <div className="text-sm text-gray-600 flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+90 212 XXX XX XX</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@algotrom.com.tr</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                <SelectTrigger className="w-32 border-none bg-transparent text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languages).map(([code, { name, flag }]) => (
                    <SelectItem key={code} value={code}>
                      {flag} {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex space-x-2">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center text-2xl font-bold text-primary">
            <Code className="w-8 h-8 mr-2" />
            <span>Algotrom</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.href} className="relative group">
                <Link 
                  href={item.href}
                  className={`text-gray-700 hover:text-primary transition-colors font-medium ${
                    location.startsWith(item.href) ? 'text-primary' : ''
                  }`}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button asChild className="hidden lg:inline-flex">
              <Link href="/demo-request">
                {t('nav.demoRequest', language)}
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {item.submenu && (
                        <div className="ml-4 space-y-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block py-1 text-sm text-gray-600 hover:text-primary"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <Button asChild className="mt-4">
                    <Link href="/demo-request" onClick={() => setIsMobileMenuOpen(false)}>
                      {t('nav.demoRequest', language)}
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
