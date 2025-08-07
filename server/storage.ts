import { 
  type User, 
  type InsertUser, 
  type DemoRequest, 
  type InsertDemoRequest,
  type ContactMessage,
  type InsertContactMessage,
  type BlogPost,
  type InsertBlogPost,
  type JobApplication,
  type InsertJobApplication,
  type TeamMember,
  type InsertTeamMember
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createDemoRequest(request: InsertDemoRequest): Promise<DemoRequest>;
  getDemoRequests(): Promise<DemoRequest[]>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  getJobApplications(): Promise<JobApplication[]>;
  
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember>;
  createTeamMember(data: InsertTeamMember): Promise<TeamMember>;
  deleteTeamMember(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private demoRequests: Map<string, DemoRequest>;
  private contactMessages: Map<string, ContactMessage>;
  private blogPosts: Map<string, BlogPost>;
  private jobApplications: Map<string, JobApplication>;
  private teamMembers: Map<string, TeamMember>;

  constructor() {
    this.users = new Map();
    this.demoRequests = new Map();
    this.contactMessages = new Map();
    this.blogPosts = new Map();
    this.jobApplications = new Map();
    this.teamMembers = new Map();
    
    // Initialize with sample data
    this.initializeBlogPosts();
    this.initializeTeamMembers();
  }

  private initializeBlogPosts() {
    const samplePosts: BlogPost[] = [
      {
        id: randomUUID(),
        title: {
          tr: "İş Süreçlerinde Dijital Dönüşümün Faydaları",
          en: "Benefits of Digital Transformation in Business Processes",
          fr: "Avantages de la transformation numérique dans les processus métier",
          ar: "فوائد التحول الرقمي في العمليات التجارية",
          ru: "Преимущества цифровой трансформации в бизнес-процессах",
          de: "Vorteile der digitalen Transformation in Geschäftsprozessen"
        },
        content: {
          tr: "Modern işletmelerin rekabet avantajı sağlaması için dijital dönüşüm artık kaçınılmaz hale geldi...",
          en: "Digital transformation has become inevitable for modern businesses to gain competitive advantage...",
          fr: "La transformation numérique est devenue inévitable pour les entreprises modernes...",
          ar: "أصبح التحول الرقمي أمراً حتمياً للشركات الحديثة...",
          ru: "Цифровая трансформация стала неизбежной для современных предприятий...",
          de: "Die digitale Transformation ist für moderne Unternehmen unvermeidlich geworden..."
        },
        excerpt: {
          tr: "Modern işletmelerin rekabet avantajı sağlaması için dijital dönüşüm artık kaçınılmaz hale geldi...",
          en: "Digital transformation has become inevitable for modern businesses to gain competitive advantage...",
          fr: "La transformation numérique est devenue inévitable pour les entreprises modernes...",
          ar: "أصبح التحول الرقمي أمراً حتمياً للشركات الحديثة...",
          ru: "Цифровая трансформация стала неизбежной для современных предприятий...",
          de: "Die digitale Transformation ist für moderne Unternehmen unvermeidlich geworden..."
        },
        category: "Dijital Dönüşüm",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600",
        publishedAt: new Date("2024-01-15")
      },
      {
        id: randomUUID(),
        title: {
          tr: "BPM ile İş Süreçlerini Optimize Etmenin 5 Yolu",
          en: "5 Ways to Optimize Business Processes with BPM",
          fr: "5 façons d'optimiser les processus métier avec BPM",
          ar: "5 طرق لتحسين العمليات التجارية باستخدام BPM",
          ru: "5 способов оптимизации бизнес-процессов с помощью BPM",
          de: "5 Wege zur Optimierung von Geschäftsprozessen mit BPM"
        },
        content: {
          tr: "İş Süreçleri Yönetimi (BPM) ile şirketinizin verimliliğini artırmanın etkili yöntemlerini keşfedin...",
          en: "Discover effective ways to increase your company's efficiency with Business Process Management (BPM)...",
          fr: "Découvrez des moyens efficaces d'augmenter l'efficacité de votre entreprise avec la gestion des processus métier (BPM)...",
          ar: "اكتشف الطرق الفعالة لزيادة كفاءة شركتك باستخدام إدارة العمليات التجارية (BPM)...",
          ru: "Откройте для себя эффективные способы повышения эффективности вашей компании с помощью управления бизнес-процессами (BPM)...",
          de: "Entdecken Sie effektive Wege, die Effizienz Ihres Unternehmens mit Business Process Management (BPM) zu steigern..."
        },
        excerpt: {
          tr: "İş Süreçleri Yönetimi (BPM) ile şirketinizin verimliliğini artırmanın etkili yöntemlerini keşfedin...",
          en: "Discover effective ways to increase your company's efficiency with Business Process Management (BPM)...",
          fr: "Découvrez des moyens efficaces d'augmenter l'efficacité de votre entreprise...",
          ar: "اكتشف الطرق الفعالة لزيادة كفاءة شركتك...",
          ru: "Откройте для себя эффективные способы повышения эффективности...",
          de: "Entdecken Sie effektive Wege, die Effizienz Ihres Unternehmens zu steigern..."
        },
        category: "BPM",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600",
        publishedAt: new Date("2024-01-12")
      },
      {
        id: randomUUID(),
        title: {
          tr: "KVKK Uyumluluğu için Dikkat Edilmesi Gerekenler",
          en: "Important Considerations for GDPR Compliance",
          fr: "Considérations importantes pour la conformité RGPD",
          ar: "اعتبارات مهمة للامتثال للائحة العامة لحماية البيانات",
          ru: "Важные соображения для соответствия GDPR",
          de: "Wichtige Überlegungen zur DSGVO-Compliance"
        },
        content: {
          tr: "Kişisel Verilerin Korunması Kanunu'na uyum sağlamanın işletmeniz için kritik önemi...",
          en: "The critical importance of complying with the Personal Data Protection Law for your business...",
          fr: "L'importance critique de se conformer à la loi sur la protection des données personnelles...",
          ar: "الأهمية الحاسمة للامتثال لقانون حماية البيانات الشخصية...",
          ru: "Критическая важность соблюдения Закона о защите персональных данных...",
          de: "Die kritische Bedeutung der Einhaltung des Gesetzes zum Schutz personenbezogener Daten..."
        },
        excerpt: {
          tr: "Kişisel Verilerin Korunması Kanunu'na uyum sağlamanın işletmeniz için kritik önemi...",
          en: "The critical importance of complying with the Personal Data Protection Law...",
          fr: "L'importance critique de se conformer à la loi sur la protection des données...",
          ar: "الأهمية الحاسمة للامتثال لقانون حماية البيانات الشخصية...",
          ru: "Критическая важность соблюдения Закона о защите персональных данных...",
          de: "Die kritische Bedeutung der Einhaltung des Datenschutzgesetzes..."
        },
        category: "Güvenlik",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600",
        publishedAt: new Date("2024-01-10")
      }
    ];

    samplePosts.forEach(post => {
      this.blogPosts.set(post.id, post);
    });
  }

  private initializeTeamMembers() {
    const teamData: TeamMember[] = [
      {
        id: "1",
        name: "Yıldırım Özyakışır",
        position: "Proje Yöneticisi",
        positionEn: "Project Manager",
        department: "Yönetim",
        email: "yildirim@algotrom.com.tr",
        phone: null,
        image: null,
        bio: null,
        displayOrder: 1,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: "2",
        name: "İsmet Çetin",
        position: "Proje Yöneticisi",
        positionEn: "Project Manager",
        department: "Yönetim",
        email: "ismet@algotrom.com.tr",
        phone: null,
        image: null,
        bio: null,
        displayOrder: 2,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: "3",
        name: "Sedef Nihal",
        position: "Finans Yöneticisi",
        positionEn: "Finance Manager",
        department: "Finans",
        email: "sedef@algotrom.com.tr",
        phone: null,
        image: null,
        bio: null,
        displayOrder: 3,
        isActive: true,
        createdAt: new Date()
      }
    ];

    teamData.forEach(member => {
      this.teamMembers.set(member.id, member);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDemoRequest(request: InsertDemoRequest): Promise<DemoRequest> {
    const id = randomUUID();
    const demoRequest: DemoRequest = { 
      ...request, 
      id, 
      createdAt: new Date() 
    };
    this.demoRequests.set(id, demoRequest);
    return demoRequest;
  }

  async getDemoRequests(): Promise<DemoRequest[]> {
    return Array.from(this.demoRequests.values());
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const contactMessage: ContactMessage = { 
      ...message, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0)
    );
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const blogPost: BlogPost = { 
      ...post, 
      id, 
      publishedAt: new Date() 
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async createJobApplication(application: InsertJobApplication): Promise<JobApplication> {
    const id = randomUUID();
    const jobApplication: JobApplication = { 
      ...application, 
      id, 
      createdAt: new Date() 
    };
    this.jobApplications.set(id, jobApplication);
    return jobApplication;
  }

  async getJobApplications(): Promise<JobApplication[]> {
    return Array.from(this.jobApplications.values());
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).sort(
      (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
    );
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
    const existingMember = this.teamMembers.get(id);
    if (!existingMember) {
      throw new Error('Team member not found');
    }
    
    const updatedMember: TeamMember = {
      ...existingMember,
      ...data,
      id: existingMember.id, // Keep original ID
      createdAt: existingMember.createdAt // Keep original creation date
    };
    
    this.teamMembers.set(id, updatedMember);
    return updatedMember;
  }

  async createTeamMember(data: InsertTeamMember): Promise<TeamMember> {
    const id = randomUUID();
    const teamMember: TeamMember = {
      ...data,
      id,
      createdAt: new Date()
    };
    this.teamMembers.set(id, teamMember);
    return teamMember;
  }

  async deleteTeamMember(id: string): Promise<void> {
    this.teamMembers.delete(id);
  }
}

export const storage = new MemStorage();
