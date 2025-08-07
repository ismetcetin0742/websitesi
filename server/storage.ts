import { 
  type User, 
  type InsertUser, 
  type DemoRequest, 
  type InsertDemoRequest,
  type ContactMessage,
  type InsertContactMessage,
  type BlogPost,
  type InsertBlogPost,
  type JobPosition,
  type InsertJobPosition,
  type JobApplication,
  type InsertJobApplication,
  type TeamMember,
  type InsertTeamMember,
  type AboutContent,
  type CompanyValue,
  type InsertCompanyValue,
  type CompanyStats,
  type InsertCompanyStats,
  type ReferencesContent,
  type InsertReferencesContent,
  type PartnerLogo,
  type InsertPartnerLogo,
  type ReferenceProject,
  type InsertReferenceProject,
  type HomepageStatistic,
  type InsertHomepageStatistic
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
  updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;
  
  getJobPositions(): Promise<JobPosition[]>;
  getJobPosition(id: string): Promise<JobPosition | undefined>;
  createJobPosition(position: InsertJobPosition): Promise<JobPosition>;
  updateJobPosition(id: string, data: Partial<JobPosition>): Promise<JobPosition>;
  deleteJobPosition(id: string): Promise<void>;
  
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  getJobApplications(): Promise<JobApplication[]>;
  
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember>;
  createTeamMember(data: InsertTeamMember): Promise<TeamMember>;
  deleteTeamMember(id: string): Promise<void>;
  
  getAboutContent(): Promise<AboutContent[]>;
  updateAboutContent(section: string, updates: { title: string; content: string }): Promise<AboutContent>;
  
  getCompanyValues(): Promise<CompanyValue[]>;
  getCompanyValue(id: string): Promise<CompanyValue | undefined>;
  updateCompanyValue(id: string, data: Partial<CompanyValue>): Promise<CompanyValue>;
  createCompanyValue(data: InsertCompanyValue): Promise<CompanyValue>;
  deleteCompanyValue(id: string): Promise<void>;
  
  getCompanyStats(): Promise<CompanyStats | undefined>;
  updateCompanyStats(data: Partial<CompanyStats>): Promise<CompanyStats>;

  // References Content operations
  getReferencesContent(): Promise<ReferencesContent[]>;
  updateReferencesContent(section: string, updates: { title: string; content: string; buttonText?: string }): Promise<ReferencesContent>;

  // Partner Logos operations
  getPartnerLogos(): Promise<PartnerLogo[]>;
  createPartnerLogo(data: InsertPartnerLogo): Promise<PartnerLogo>;
  updatePartnerLogo(id: string, data: Partial<PartnerLogo>): Promise<PartnerLogo>;
  deletePartnerLogo(id: string): Promise<void>;

  // Reference Projects operations
  getReferenceProjects(): Promise<ReferenceProject[]>;
  createReferenceProject(data: InsertReferenceProject): Promise<ReferenceProject>;
  updateReferenceProject(id: string, data: Partial<ReferenceProject>): Promise<ReferenceProject>;
  deleteReferenceProject(id: string): Promise<void>;

  // Homepage Statistics operations
  getHomepageStatistics(): Promise<HomepageStatistic[]>;
  createHomepageStatistic(data: InsertHomepageStatistic): Promise<HomepageStatistic>;
  updateHomepageStatistic(id: string, data: Partial<HomepageStatistic>): Promise<HomepageStatistic>;
  deleteHomepageStatistic(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private demoRequests: Map<string, DemoRequest>;
  private contactMessages: Map<string, ContactMessage>;
  private blogPosts: Map<string, BlogPost>;
  private jobPositions: Map<string, JobPosition>;
  private jobApplications: Map<string, JobApplication>;
  private teamMembers: Map<string, TeamMember>;
  private aboutContent: Map<string, AboutContent>;
  private companyValues: Map<string, CompanyValue>;
  private companyStats: CompanyStats | null;
  private referencesContent: Map<string, ReferencesContent>;
  private partnerLogos: Map<string, PartnerLogo>;
  private referenceProjects: Map<string, ReferenceProject>;

  constructor() {
    this.users = new Map();
    this.demoRequests = new Map();
    this.contactMessages = new Map();
    this.blogPosts = new Map();
    this.jobPositions = new Map();
    this.jobApplications = new Map();
    this.teamMembers = new Map();
    this.aboutContent = new Map();
    this.companyValues = new Map();
    this.companyStats = null;
    this.referencesContent = new Map();
    this.partnerLogos = new Map();
    this.referenceProjects = new Map();
    
    // Initialize with sample data
    this.initializeBlogPosts();
    this.initializeTeamMembers();
    this.initializeAboutContent();
    this.initializeCompanyValues();
    this.initializeCompanyStats();
    this.initializeReferencesContent();
    this.initializePartnerLogos();
    this.initializeReferenceProjects();
    this.initializeJobPositions();
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

  private initializeAboutContent() {
    const aboutData: AboutContent[] = [
      {
        id: "1",
        section: "about",
        title: "Hakkımızda",
        content: "15 yılı aşkın deneyimimizle, işletmelerin dijital dönüşüm yolculuğunda güvenilir teknoloji partneri olarak yer alıyoruz.",
        displayOrder: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "2",
        section: "mission",
        title: "Misyonumuz",
        content: "İşletmelerin dijital dönüşüm süreçlerinde güvenilir teknoloji partneri olarak, iş süreçlerini optimize eden, verimliliği artıran ve rekabet avantajı sağlayan yenilikçi çözümler sunmaktır. Müşterilerimizin başarısına odaklanarak, kaliteli yazılım çözümleri ve sürekli destek hizmeti sağlarız.",
        displayOrder: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "3",
        section: "vision",
        title: "Vizyonumuz",
        content: "Türkiye'nin önde gelen dijital dönüşüm çözümleri sağlayıcısı olarak, işletmelerin küresel rekabette öne çıkmasını sağlamak. Teknolojinin gücünü kullanarak sürdürülebilir büyüme ve yenilikçi iş modelleri yaratmak, dijital çağda liderlik eden kuruluşlar yetiştirmektir.",
        displayOrder: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "4",
        section: "values",
        title: "Değerlerimiz",
        content: "Çalışma prensiplerimizi şekillendiren temel değerler",
        displayOrder: 4,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    aboutData.forEach(content => {
      this.aboutContent.set(content.section, content);
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

  async updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) {
      throw new Error('Blog post not found');
    }
    
    const updatedPost: BlogPost = {
      ...existingPost,
      ...data,
      id: existingPost.id, // Keep original ID
      publishedAt: existingPost.publishedAt // Keep original publish date
    };
    
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: string): Promise<void> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) {
      throw new Error('Blog post not found');
    }
    
    this.blogPosts.delete(id);
  }

  async getJobPositions(): Promise<JobPosition[]> {
    return Array.from(this.jobPositions.values()).sort(
      (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
    );
  }

  async getJobPosition(id: string): Promise<JobPosition | undefined> {
    return this.jobPositions.get(id);
  }

  async createJobPosition(position: InsertJobPosition): Promise<JobPosition> {
    const id = randomUUID();
    const jobPosition: JobPosition = { 
      ...position, 
      id, 
      createdAt: new Date() 
    };
    this.jobPositions.set(id, jobPosition);
    return jobPosition;
  }

  async updateJobPosition(id: string, data: Partial<JobPosition>): Promise<JobPosition> {
    const existingPosition = this.jobPositions.get(id);
    if (!existingPosition) {
      throw new Error('Job position not found');
    }
    
    const updatedPosition: JobPosition = {
      ...existingPosition,
      ...data,
      id: existingPosition.id,
      createdAt: existingPosition.createdAt
    };
    
    this.jobPositions.set(id, updatedPosition);
    return updatedPosition;
  }

  async deleteJobPosition(id: string): Promise<void> {
    const existingPosition = this.jobPositions.get(id);
    if (!existingPosition) {
      throw new Error('Job position not found');
    }
    
    this.jobPositions.delete(id);
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

  async getAboutContent(): Promise<AboutContent[]> {
    return Array.from(this.aboutContent.values()).sort(
      (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
    );
  }

  async updateAboutContent(section: string, updates: { title: string; content: string }): Promise<AboutContent> {
    const existing = this.aboutContent.get(section);
    if (existing) {
      const updated = {
        ...existing,
        ...updates,
        updatedAt: new Date()
      };
      this.aboutContent.set(section, updated);
      return updated;
    } else {
      const newContent: AboutContent = {
        id: randomUUID(),
        section,
        title: updates.title,
        content: updates.content,
        displayOrder: Array.from(this.aboutContent.values()).length + 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.aboutContent.set(section, newContent);
      return newContent;
    }
  }

  private initializeCompanyValues() {
    const defaultValues: CompanyValue[] = [
      {
        id: "1",
        title: "Müşteri Odaklılık",
        description: "Müşterilerimizin başarısını kendi başarımız olarak görür, onların hedeflerine ulaşması için çalışırız.",
        iconName: "Target",
        displayOrder: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2", 
        title: "İnovasyon",
        description: "Sürekli gelişim ve yenilik anlayışıyla teknolojinin son trendlerini takip ederiz.",
        iconName: "Lightbulb",
        displayOrder: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        title: "Takım Çalışması", 
        description: "Güçlü ekip ruhu ile birlikte çalışarak en iyi sonuçları elde ederiz.",
        iconName: "Users",
        displayOrder: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4",
        title: "Kalite",
        description: "Yüksek kalite standartlarında hizmet sunarak müşteri memnuniyetini önceliklendiririz.",
        iconName: "Award",
        displayOrder: 4,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "5",
        title: "Sürdürülebilirlik", 
        description: "Çevreye duyarlı, sürdürülebilir teknoloji çözümleri geliştiririz.",
        iconName: "Globe",
        displayOrder: 5,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    defaultValues.forEach(value => {
      this.companyValues.set(value.id, value);
    });
  }

  async getCompanyValues(): Promise<CompanyValue[]> {
    return Array.from(this.companyValues.values())
      .filter(value => value.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getCompanyValue(id: string): Promise<CompanyValue | undefined> {
    return this.companyValues.get(id);
  }

  async updateCompanyValue(id: string, data: Partial<CompanyValue>): Promise<CompanyValue> {
    const existing = this.companyValues.get(id);
    if (!existing) {
      throw new Error("Company value not found");
    }
    
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date()
    };
    this.companyValues.set(id, updated);
    return updated;
  }

  async createCompanyValue(data: InsertCompanyValue): Promise<CompanyValue> {
    const newValue: CompanyValue = {
      id: randomUUID(),
      ...data,
      displayOrder: data.displayOrder || Array.from(this.companyValues.values()).length + 1,
      isActive: data.isActive !== undefined ? data.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.companyValues.set(newValue.id, newValue);
    return newValue;
  }

  async deleteCompanyValue(id: string): Promise<void> {
    this.companyValues.delete(id);
  }

  private initializeCompanyStats() {
    this.companyStats = {
      id: "1",
      experienceYears: 15,
      completedProjects: 500,
      happyCustomers: 100,
      teamSize: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  async getCompanyStats(): Promise<CompanyStats | undefined> {
    return this.companyStats || undefined;
  }

  async updateCompanyStats(data: Partial<CompanyStats>): Promise<CompanyStats> {
    if (!this.companyStats) {
      this.companyStats = {
        id: "1",
        experienceYears: data.experienceYears || 15,
        completedProjects: data.completedProjects || 500,
        happyCustomers: data.happyCustomers || 100,
        teamSize: data.teamSize || 50,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } else {
      this.companyStats = {
        ...this.companyStats,
        ...data,
        updatedAt: new Date()
      };
    }
    return this.companyStats;
  }

  // References Content methods
  private initializeReferencesContent() {
    const content = [
      {
        id: "1",
        section: "hero",
        title: "Referanslar",
        content: "Türkiye'nin önde gelen şirketleriyle gerçekleştirdiğimiz başarılı projeler ve elde edilen sonuçlar.",
        buttonText: "",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "2", 
        section: "trusted_partner",
        title: "Güvenilen Çözüm Ortağınız",
        content: "Farklı sektörlerden 100+ şirket Algotrom'u tercih ediyor",
        buttonText: "",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "3",
        section: "cta",
        title: "Siz de Başarı Hikayemizin Parçası Olun",
        content: "İşletmenizin dijital dönüşüm yolculuğunda yanınızda olalım. Sizin için de başarılı projeler geliştirelim.",
        buttonText: "Proje Danışmanlığı Al",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    content.forEach(item => this.referencesContent.set(item.id, item));
  }

  async getReferencesContent(): Promise<ReferencesContent[]> {
    return Array.from(this.referencesContent.values());
  }

  async updateReferencesContent(section: string, updates: { title: string; content: string; buttonText?: string }): Promise<ReferencesContent> {
    const existing = Array.from(this.referencesContent.values()).find(item => item.section === section);
    if (!existing) {
      throw new Error(`References content section not found: ${section}`);
    }

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date()
    };

    this.referencesContent.set(existing.id, updated);
    return updated;
  }

  // Partner Logos methods
  private initializePartnerLogos() {
    // Initialize with empty array, will be managed via admin
  }

  async getPartnerLogos(): Promise<PartnerLogo[]> {
    return Array.from(this.partnerLogos.values()).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async createPartnerLogo(data: InsertPartnerLogo): Promise<PartnerLogo> {
    const newLogo: PartnerLogo = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.partnerLogos.set(newLogo.id, newLogo);
    return newLogo;
  }

  async updatePartnerLogo(id: string, data: Partial<PartnerLogo>): Promise<PartnerLogo> {
    const existing = this.partnerLogos.get(id);
    if (!existing) {
      throw new Error(`Partner logo not found: ${id}`);
    }

    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date()
    };

    this.partnerLogos.set(id, updated);
    return updated;
  }

  async deletePartnerLogo(id: string): Promise<void> {
    this.partnerLogos.delete(id);
  }

  // Reference Projects methods
  private initializeReferenceProjects() {
    const projects = [
      {
        id: "1",
        company: "ABC Otomotiv San. A.Ş.",
        sector: "manufacturing",
        logoUrl: "https://via.placeholder.com/120x60/1E40AF/ffffff?text=ABC",
        project: "Üretim Süreç Yönetimi",
        description: "E-Flow BPM ile üretim süreçlerinin dijitalleştirilmesi ve kalite kontrol sistemlerinin entegrasyonu.",
        results: [
          "%40 üretim verimliliği artışı",
          "%60 kalite kontrol süresinde azalma", 
          "%30 operasyonel maliyet tasarrufu"
        ],
        duration: "8 ay",
        year: "2023",
        testimonial: "Algotrom ile çalışmak üretim süreçlerimizi tamamen dönüştürdü. Artık tüm üretim hattımızı gerçek zamanlı izleyebiliyor ve hızlı aksiyonlar alabiliyor.",
        displayOrder: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "2",
        company: "XYZ Enerji A.Ş.",
        sector: "energy",
        logoUrl: "https://via.placeholder.com/120x60/1E40AF/ffffff?text=XYZ",
        project: "Akıllı Şebeke Yönetimi",
        description: "SCADA entegrasyonu ve enerji dağıtım ağının optimize edilmesi için geliştirilmiş çözüm.",
        results: [
          "%25 enerji kaybında azalma",
          "%50 arıza tespit süresinde iyileşme",
          "%35 operasyonel verimlilik artışı"
        ],
        duration: "12 ay",
        year: "2023",
        testimonial: "Enerji dağıtım ağımızın dijitalleşmesi ile hem müşteri memnuniyeti hem de operasyonel verimliliğimiz önemli ölçüde arttı.",
        displayOrder: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    projects.forEach(project => this.referenceProjects.set(project.id, project));
  }

  async getReferenceProjects(): Promise<ReferenceProject[]> {
    return Array.from(this.referenceProjects.values()).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async createReferenceProject(data: InsertReferenceProject): Promise<ReferenceProject> {
    const newProject: ReferenceProject = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.referenceProjects.set(newProject.id, newProject);
    return newProject;
  }

  async updateReferenceProject(id: string, data: Partial<ReferenceProject>): Promise<ReferenceProject> {
    const existing = this.referenceProjects.get(id);
    if (!existing) {
      throw new Error(`Reference project not found: ${id}`);
    }

    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date()
    };

    this.referenceProjects.set(id, updated);
    return updated;
  }

  async deleteReferenceProject(id: string): Promise<void> {
    this.referenceProjects.delete(id);
  }

  private initializeJobPositions() {
    const samplePositions: JobPosition[] = [
      {
        id: randomUUID(),
        title: {
          tr: "Senior Frontend Developer",
          en: "Senior Frontend Developer",
          fr: "Développeur Frontend Senior",
          ar: "مطور واجهة أمامية أول",
          ru: "Старший Frontend-разработчик",
          de: "Senior Frontend-Entwickler"
        },
        description: {
          tr: "React.js ve TypeScript ile modern web uygulamaları geliştirmek üzere takımımıza katılacak Senior Frontend Developer arıyoruz. E-Flow BPM ve DMS projelerinde yer alacaksınız.",
          en: "We are looking for a Senior Frontend Developer to join our team to develop modern web applications with React.js and TypeScript. You will be involved in E-Flow BPM and DMS projects.",
          fr: "Nous recherchons un développeur Frontend Senior pour rejoindre notre équipe afin de développer des applications web modernes avec React.js et TypeScript.",
          ar: "نبحث عن مطور واجهة أمامية أول للانضمام إلى فريقنا لتطوير تطبيقات ويب حديثة باستخدام React.js و TypeScript.",
          ru: "Мы ищем старшего Frontend-разработчика для присоединения к нашей команде для разработки современных веб-приложений с React.js и TypeScript.",
          de: "Wir suchen einen Senior Frontend-Entwickler für unser Team zur Entwicklung moderner Webanwendungen mit React.js und TypeScript."
        },
        requirements: [
          "5+ yıl frontend geliştirme deneyimi",
          "React.js ve TypeScript konusunda uzman seviye bilgi",
          "HTML5, CSS3, SASS/SCSS konularında deneyim",
          "RESTful API entegrasyonu deneyimi",
          "Git kullanımında yetkinlik",
          "Agile/Scrum metodolojilerine aşinalık"
        ],
        benefits: [
          "Rekabetçi maaş",
          "Esnek çalışma saatleri",
          "Uzaktan çalışma imkanı",
          "Sağlık sigortası",
          "Eğitim ve gelişim fırsatları",
          "Modern teknoloji stack"
        ],
        department: "Yazılım Geliştirme",
        location: "İstanbul, Türkiye",
        type: "full-time",
        isActive: true,
        displayOrder: 1,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: {
          tr: "BPM Business Analyst",
          en: "BPM Business Analyst",
          fr: "Analyste métier BPM",
          ar: "محلل أعمال BPM",
          ru: "Бизнес-аналитик BPM",
          de: "BPM Business Analyst"
        },
        description: {
          tr: "İş süreçlerini analiz ederek optimizasyon önerileri geliştiren ve E-Flow BPM implementasyonlarında yer alacak Business Analyst pozisyonu.",
          en: "Business Analyst position to analyze business processes, develop optimization recommendations and participate in E-Flow BPM implementations.",
          fr: "Poste d'analyste métier pour analyser les processus métier, développer des recommandations d'optimisation et participer aux implémentations E-Flow BPM.",
          ar: "منصب محلل أعمال لتحليل العمليات التجارية وتطوير توصيات التحسين والمشاركة في تطبيقات E-Flow BPM.",
          ru: "Позиция бизнес-аналитика для анализа бизнес-процессов, разработки рекомендаций по оптимизации и участия в внедрениях E-Flow BPM.",
          de: "Business Analyst Position zur Analyse von Geschäftsprozessen, Entwicklung von Optimierungsempfehlungen und Teilnahme an E-Flow BPM Implementierungen."
        },
        requirements: [
          "İş analizi alanında 3+ yıl deneyim",
          "BPM metodolojilerine hakim olmak",
          "Süreç modelleme araçları bilgisi",
          "SQL ve veri analizi deneyimi",
          "İyi iletişim ve sunum becerileri",
          "Müşteri odaklı çözüm yaklaşımı"
        ],
        benefits: [
          "Çeşitli sektörlerle çalışma imkanı",
          "Süreç optimizasyonu projelerinde yer alma",
          "Profesyonel gelişim desteği",
          "Performans bonusu",
          "Teamwork ortamı",
          "İnovatif projeler"
        ],
        department: "İş Analizi",
        location: "İstanbul, Türkiye",
        type: "full-time",
        isActive: true,
        displayOrder: 2,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: {
          tr: "DevOps Engineer",
          en: "DevOps Engineer",
          fr: "Ingénieur DevOps",
          ar: "مهندس DevOps",
          ru: "DevOps-инженер",
          de: "DevOps-Ingenieur"
        },
        description: {
          tr: "Cloud altyapısını yönetecek, CI/CD pipeline'ları oluşturacak ve sistem güvenilirliğini sağlayacak DevOps Engineer arıyoruz.",
          en: "We are looking for a DevOps Engineer to manage cloud infrastructure, create CI/CD pipelines and ensure system reliability.",
          fr: "Nous recherchons un ingénieur DevOps pour gérer l'infrastructure cloud, créer des pipelines CI/CD et assurer la fiabilité du système.",
          ar: "نبحث عن مهندس DevOps لإدارة البنية التحتية السحابية وإنشاء خطوط أنابيب CI/CD وضمان موثوقية النظام.",
          ru: "Мы ищем DevOps-инженера для управления облачной инфраструктурой, создания CI/CD-конвейеров и обеспечения надежности системы.",
          de: "Wir suchen einen DevOps-Ingenieur zur Verwaltung der Cloud-Infrastruktur, Erstellung von CI/CD-Pipelines und Gewährleistung der Systemzuverlässigkeit."
        },
        requirements: [
          "Docker ve Kubernetes deneyimi",
          "AWS/Azure cloud platformları bilgisi",
          "CI/CD araçları (Jenkins, GitLab CI) deneyimi",
          "Infrastructure as Code (Terraform) bilgisi",
          "Linux sistem yönetimi",
          "Monitoring ve logging araçları deneyimi"
        ],
        benefits: [
          "Cloud teknolojileri ile çalışma",
          "Modern DevOps araçları",
          "Teknik eğitim ve sertifikasyon desteği",
          "Hybrid çalışma modeli",
          "İnovatif teknoloji stack",
          "Kariyer gelişim programı"
        ],
        department: "DevOps",
        location: "İstanbul, Türkiye",
        type: "full-time",
        isActive: true,
        displayOrder: 3,
        createdAt: new Date()
      }
    ];

    samplePositions.forEach(position => this.jobPositions.set(position.id, position));
  }
}

export const storage = new MemStorage();
