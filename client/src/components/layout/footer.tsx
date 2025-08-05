import { Link } from 'wouter';
import { Code, MapPin, Phone, Mail, Headphones, Linkedin, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/i18n';

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <Code className="w-8 h-8 text-primary mr-3" />
              <span className="text-2xl font-bold">Algotrom</span>
            </div>
            <p className="text-gray-300 mb-6">
              Dijital dönüşüm yolculuğunuzda güvenilir teknoloji ortağınız. 
              İş süreçlerinizi optimize ediyor, geleceğe hazırlıyoruz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Hızlı Linkler</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.about', language)}
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-gray-300 hover:text-white transition-colors">
                  Çözümler
                </Link>
              </li>
              <li>
                <Link href="/sectors" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.sectors', language)}
                </Link>
              </li>
              <li>
                <Link href="/references" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.references', language)}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-gray-300 hover:text-white transition-colors">
                  Kariyer
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Çözümlerimiz</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/solutions/eflow-bpm" className="text-gray-300 hover:text-white transition-colors">
                  e-Flow BPM
                </Link>
              </li>
              <li>
                <Link href="/solutions/document-management" className="text-gray-300 hover:text-white transition-colors">
                  Döküman Yönetimi
                </Link>
              </li>
              <li>
                <Link href="/solutions/integration" className="text-gray-300 hover:text-white transition-colors">
                  Entegrasyon
                </Link>
              </li>
              <li>
                <Link href="/solutions/business-intelligence" className="text-gray-300 hover:text-white transition-colors">
                  İş Zekası
                </Link>
              </li>
              <li>
                <Link href="/solutions/mobile" className="text-gray-300 hover:text-white transition-colors">
                  Mobil Çözümler
                </Link>
              </li>
              <li>
                <Link href="/solutions/security" className="text-gray-300 hover:text-white transition-colors">
                  Güvenlik
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('nav.contact', language)}</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">
                  Maslak Mahallesi, Büyükdere Cad.<br />
                  No: 123, 34485 Sarıyer/İstanbul
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-3" />
                <span className="text-gray-300">+90 212 XXX XX XX</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-3" />
                <span className="text-gray-300">info@algotrom.com.tr</span>
              </div>
              <div className="flex items-center">
                <Headphones className="w-5 h-5 text-primary mr-3" />
                <span className="text-gray-300">destek@algotrom.com.tr</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            <span>© 2024 Algotrom. Tüm hakları saklıdır.</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
              KVKK
            </Link>
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Gizlilik Politikası
            </Link>
            <Link href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
