// Email utility functions and configuration for the frontend
// This file provides email-related helper functions and constants

export const EMAIL_ADDRESSES = {
  SUPPORT: 'destek@algotrom.com.tr',
  INFO: 'info@algotrom.com.tr',
  CAREER: 'kariyer@algotrom.com.tr',
  DEMO: 'demo@algotrom.com.tr',
  SALES: 'satis@algotrom.com.tr',
  CORPORATE: 'kurumsal@algotrom.com.tr',
} as const;

export const PHONE_NUMBERS = {
  MAIN: '+90 545 514 74 02',
  SUPPORT: '+90 212 XXX XX 02',
  SALES: '+90 212 XXX XX 01',
  CORPORATE: '+90 212 XXX XX 03',
  WHATSAPP: '+90 545 514 74 02',
} as const;

export const COMPANY_INFO = {
  NAME: 'Algotrom',
  FULL_NAME: 'Algotrom Bilişim Teknolojileri A.Ş.',
  ADDRESS: {
    STREET: 'Barbaros Mah. Begonya Sok.',
    BUILDING: 'Nidakule Ataşehir Batı No: 1 İç Kapı No: 2',
    DISTRICT: 'ATAŞEHİR / İSTANBUL',
    COUNTRY: 'Türkiye',
  },
  WORKING_HOURS: {
    WEEKDAYS: 'Pazartesi - Cuma: 09:00 - 18:00',
    SATURDAY: 'Cumartesi: 09:00 - 14:00',
    SUNDAY: 'Pazar: Kapalı',
  },
  SOCIAL_MEDIA: {
    LINKEDIN: 'https://www.linkedin.com/company/algotromyazilim',
    INSTAGRAM: 'https://www.instagram.com/algotromyazilim',
    TWITTER: 'https://x.com/algotromyazilim',
    YOUTUBE: 'https://www.youtube.com/@AlgotromYazilim',
  },
} as const;

/**
 * Creates a mailto link with pre-filled subject and body
 */
export function createMailtoLink(
  to: string,
  subject?: string,
  body?: string,
  cc?: string,
  bcc?: string
): string {
  const params = new URLSearchParams();
  
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  if (cc) params.append('cc', cc);
  if (bcc) params.append('bcc', bcc);
  
  const queryString = params.toString();
  return `mailto:${to}${queryString ? '?' + queryString : ''}`;
}

/**
 * Creates a WhatsApp message link
 */
export function createWhatsAppLink(message?: string): string {
  const phoneNumber = PHONE_NUMBERS.WHATSAPP.replace(/\D/g, '');
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${phoneNumber}${encodedMessage ? '?text=' + encodedMessage : ''}`;
}

/**
 * Formats phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Format Turkish phone numbers
  if (digits.startsWith('90') && digits.length === 12) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`;
  }
  
  return phone;
}

/**
 * Email templates for different types of communications
 */
export const EMAIL_TEMPLATES = {
  DEMO_REQUEST: {
    subject: 'Demo Talebi - Algotrom',
    getBody: (data: { name: string; company: string; email: string; message?: string }) => `
Merhaba,

Yeni bir demo talebi aldınız:

Ad Soyad: ${data.name}
Şirket: ${data.company}
E-posta: ${data.email}
Mesaj: ${data.message || 'Mesaj yok'}

Lütfen en kısa zamanda müşteri ile iletişime geçiniz.

Teşekkürler,
Algotrom Otomatik Sistem
    `.trim(),
  },
  
  CONTACT_FORM: {
    subject: 'İletişim Formu - Algotrom',
    getBody: (data: { name: string; email: string; phone?: string; message: string }) => `
Merhaba,

Yeni bir iletişim mesajı aldınız:

Ad Soyad: ${data.name}
E-posta: ${data.email}
Telefon: ${data.phone || 'Belirtilmemiş'}
Mesaj: ${data.message}

Lütfen müşteri ile iletişime geçiniz.

Teşekkürler,
Algotrom Otomatik Sistem
    `.trim(),
  },
  
  JOB_APPLICATION: {
    subject: 'İş Başvurusu - Algotrom',
    getBody: (data: { position: string; name: string; email: string; phone?: string; coverLetter?: string }) => `
Merhaba,

Yeni bir iş başvurusu aldınız:

Pozisyon: ${data.position}
Ad Soyad: ${data.name}
E-posta: ${data.email}
Telefon: ${data.phone || 'Belirtilmemiş'}
Ön Yazı: ${data.coverLetter || 'Ön yazı yok'}

Lütfen başvuruyu değerlendirip adayı bilgilendiriniz.

Teşekkürler,
Algotrom İK Sistemi
    `.trim(),
  },
} as const;

/**
 * Validates email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates Turkish phone number format
 */
export function isValidTurkishPhone(phone: string): boolean {
  const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
  const cleanPhone = phone.replace(/\s|-|\(|\)/g, '');
  return phoneRegex.test(cleanPhone);
}

/**
 * Creates a contact card vCard string
 */
export function createVCard(): string {
  return `BEGIN:VCARD
VERSION:3.0
FN:${COMPANY_INFO.FULL_NAME}
ORG:${COMPANY_INFO.NAME}
ADR:;;${COMPANY_INFO.ADDRESS.STREET} ${COMPANY_INFO.ADDRESS.BUILDING};${COMPANY_INFO.ADDRESS.DISTRICT};;;${COMPANY_INFO.ADDRESS.COUNTRY}
TEL;TYPE=WORK:${PHONE_NUMBERS.MAIN}
EMAIL;TYPE=WORK:${EMAIL_ADDRESSES.INFO}
URL:https://algotrom.com.tr
END:VCARD`;
}

/**
 * Downloads vCard file
 */
export function downloadVCard(): void {
  const vcard = createVCard();
  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'algotrom-contact.vcf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
