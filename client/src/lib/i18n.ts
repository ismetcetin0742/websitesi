export type Language = 'tr' | 'en' | 'fr' | 'ar' | 'ru' | 'de';

export const languages: Record<Language, { name: string; flag: string }> = {
  tr: { name: 'Türkçe', flag: '🇹🇷' },
  en: { name: 'English', flag: '🇺🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  ru: { name: 'Русский', flag: '🇷🇺' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
};

export const translations = {
  // Navigation
  nav: {
    about: {
      tr: 'Hakkımızda',
      en: 'About Us',
      fr: 'À propos',
      ar: 'من نحن',
      ru: 'О нас',
      de: 'Über uns'
    },
    solutions: {
      tr: 'Ürünler / Çözümler',
      en: 'Products / Solutions',
      fr: 'Produits / Solutions',
      ar: 'المنتجات / الحلول',
      ru: 'Продукты / Решения',
      de: 'Produkte / Lösungen'
    },
    sectors: {
      tr: 'Sektörler',
      en: 'Sectors',
      fr: 'Secteurs',
      ar: 'القطاعات',
      ru: 'Секторы',
      de: 'Sektoren'
    },
    references: {
      tr: 'Referanslar',
      en: 'References',
      fr: 'Références',
      ar: 'المراجع',
      ru: 'Рекомендации',
      de: 'Referenzen'
    },
    blog: {
      tr: 'Blog / Haberler',
      en: 'Blog / News',
      fr: 'Blog / Actualités',
      ar: 'المدونة / الأخبار',
      ru: 'Блог / Новости',
      de: 'Blog / Nachrichten'
    },
    career: {
      tr: 'İK / Kariyer',
      en: 'HR / Career',
      fr: 'RH / Carrière',
      ar: 'الموارد البشرية / المهنة',
      ru: 'HR / Карьера',
      de: 'HR / Karriere'
    },
    contact: {
      tr: 'İletişim',
      en: 'Contact',
      fr: 'Contact',
      ar: 'اتصل بنا',
      ru: 'Контакты',
      de: 'Kontakt'
    },
    demoRequest: {
      tr: 'Demo Talep Et',
      en: 'Request Demo',
      fr: 'Demander une démo',
      ar: 'طلب عرض توضيحي',
      ru: 'Запросить демо',
      de: 'Demo anfordern'
    }
  },
  
  // Hero Section
  hero: {
    title: {
      tr: 'Süreçlerinizi Dijitalleştirin, Geleceğe Hazır Olun',
      en: 'Digitize Your Processes, Get Ready for the Future',
      fr: 'Numérisez vos processus, préparez-vous pour l\'avenir',
      ar: 'رقمنة عملياتك، استعد للمستقبل',
      ru: 'Оцифруйте свои процессы, будьте готовы к будущему',
      de: 'Digitalisieren Sie Ihre Prozesse, bereiten Sie sich auf die Zukunft vor'
    },
    subtitle: {
      tr: 'İş süreçlerinizi otomatikleştirin, verimliliği artırın ve rekabet avantajı kazanın.',
      en: 'Automate your business processes, increase efficiency and gain competitive advantage.',
      fr: 'Automatisez vos processus métier, augmentez l\'efficacité et obtenez un avantage concurrentiel.',
      ar: 'أتمتة عمليات عملك، وزيادة الكفاءة واكتساب ميزة تنافسية.',
      ru: 'Автоматизируйте свои бизнес-процессы, повышайте эффективность и получайте конкурентные преимущества.',
      de: 'Automatisieren Sie Ihre Geschäftsprozesse, steigern Sie die Effizienz und verschaffen Sie sich Wettbewerbsvorteile.'
    },
    exploreButton: {
      tr: 'Hemen İncele',
      en: 'Explore Now',
      fr: 'Explorer maintenant',
      ar: 'استكشف الآن',
      ru: 'Исследовать сейчас',
      de: 'Jetzt erkunden'
    }
  },

  // Common
  common: {
    learnMore: {
      tr: 'Daha Fazla',
      en: 'Learn More',
      fr: 'En savoir plus',
      ar: 'اعرف المزيد',
      ru: 'Узнать больше',
      de: 'Mehr erfahren'
    },
    readMore: {
      tr: 'Devamını Oku',
      en: 'Read More',
      fr: 'Lire la suite',
      ar: 'اقرأ المزيد',
      ru: 'Читать далее',
      de: 'Weiterlesen'
    },
    loading: {
      tr: 'Yükleniyor...',
      en: 'Loading...',
      fr: 'Chargement...',
      ar: 'جاري التحميل...',
      ru: 'Загрузка...',
      de: 'Wird geladen...'
    },
    submit: {
      tr: 'Gönder',
      en: 'Submit',
      fr: 'Soumettre',
      ar: 'إرسال',
      ru: 'Отправить',
      de: 'Senden'
    }
  }
};

export function t(key: string, lang: Language): string {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    value = value[k];
    if (!value) return key;
  }
  
  return value[lang] || value.tr || key;
}
