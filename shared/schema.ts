import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Site content management tables
export const siteContent = pgTable("site_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(), // e.g., 'homepage_hero_title', 'about_company_description'
  type: text("type").notNull(), // 'text', 'html', 'image', 'json'
  content: jsonb("content").notNull(), // Multi-language content
  description: text("description"), // Admin description
  updatedAt: timestamp("updated_at").defaultNow(),
  updatedBy: varchar("updated_by").references(() => users.id),
});

export const teamMembers = pgTable("team_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  position: text("position").notNull(),
  positionEn: text("position_en"),
  department: text("department").notNull(),
  email: text("email"),
  phone: text("phone"),
  image: text("image"),
  bio: jsonb("bio"), // Multi-language bio
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const solutions = pgTable("solutions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: jsonb("name").notNull(), // Multi-language
  description: jsonb("description").notNull(), // Multi-language
  category: text("category").notNull(), // 'bpm', 'dms', 'custom'
  features: jsonb("features").notNull(), // Array of features
  benefits: jsonb("benefits").notNull(), // Array of benefits
  image: text("image"),
  isActive: boolean("is_active").notNull().default(true),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sectors = pgTable("sectors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: jsonb("name").notNull(), // Multi-language
  description: jsonb("description").notNull(), // Multi-language
  slug: text("slug").notNull().unique(), // URL slug
  icon: text("icon"),
  image: text("image"),
  features: jsonb("features").notNull(), // Array of sector-specific features
  successStories: jsonb("success_stories"), // Array of success stories
  efficiency: integer("efficiency").default(86), // Efficiency percentage
  isActive: boolean("is_active").notNull().default(true),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const demoRequests = pgTable("demo_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: jsonb("title").notNull(), // Multi-language support
  content: jsonb("content").notNull(), // Multi-language support
  excerpt: jsonb("excerpt").notNull(), // Multi-language support
  category: text("category").notNull(),
  image: text("image"),
  publishedAt: timestamp("published_at").defaultNow(),
});

export const jobPositions = pgTable("job_positions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: jsonb("title").notNull(), // Multi-language
  description: jsonb("description").notNull(), // Multi-language
  requirements: jsonb("requirements").notNull(), // Array of requirements
  benefits: jsonb("benefits").notNull(), // Array of benefits
  department: text("department").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(), // 'full-time', 'part-time', 'contract', 'intern'
  isActive: boolean("is_active").notNull().default(true),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobApplications = pgTable("job_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  position: text("position").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  cvFile: text("cv_file"),
  coverLetter: text("cover_letter"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertDemoRequestSchema = createInsertSchema(demoRequests).omit({
  id: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedAt: true,
});

export const insertJobPositionSchema = createInsertSchema(jobPositions).omit({
  id: true,
  createdAt: true,
});

export const insertJobApplicationSchema = createInsertSchema(jobApplications).omit({
  id: true,
  createdAt: true,
});

export const insertSiteContentSchema = createInsertSchema(siteContent).omit({
  id: true,
  updatedAt: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  createdAt: true,
});

export const insertSolutionSchema = createInsertSchema(solutions).omit({
  id: true,
  createdAt: true,
});

export const insertSectorSchema = createInsertSchema(sectors).omit({
  id: true,
  createdAt: true,
});

// Company Values Table
export const companyValues = pgTable("company_values", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCompanyValueSchema = createInsertSchema(companyValues).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type DemoRequest = typeof demoRequests.$inferSelect;
export type InsertDemoRequest = z.infer<typeof insertDemoRequestSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type JobPosition = typeof jobPositions.$inferSelect;
export type InsertJobPosition = z.infer<typeof insertJobPositionSchema>;
export type JobApplication = typeof jobApplications.$inferSelect;
export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;
export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type Solution = typeof solutions.$inferSelect;
export type InsertSolution = z.infer<typeof insertSolutionSchema>;
export type Sector = typeof sectors.$inferSelect;
export type InsertSector = z.infer<typeof insertSectorSchema>;

// About page content schema
export const aboutContent = pgTable("about_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  section: varchar("section").notNull(), // 'about', 'mission', 'vision', 'values'
  title: text("title").notNull(),
  content: text("content").notNull(),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const insertAboutContentSchema = createInsertSchema(aboutContent).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type AboutContent = typeof aboutContent.$inferSelect;
export type InsertAboutContent = z.infer<typeof insertAboutContentSchema>;
export type CompanyValue = typeof companyValues.$inferSelect;
export type InsertCompanyValue = z.infer<typeof insertCompanyValueSchema>;
export type CareerContent = typeof careerContent.$inferSelect;
export type InsertCareerContent = z.infer<typeof insertCareerContentSchema>;
export type CareerBenefit = typeof careerBenefits.$inferSelect;
export type InsertCareerBenefit = z.infer<typeof insertCareerBenefitSchema>;

// Company Stats schema
export const companyStats = pgTable("company_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  experienceYears: integer("experience_years").notNull().default(15),
  completedProjects: integer("completed_projects").notNull().default(500),
  happyCustomers: integer("happy_customers").notNull().default(100),
  teamSize: integer("team_size").notNull().default(50),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Career Content schema
export const careerContent = pgTable("career_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  section: varchar("section").notNull(), // 'hero', 'values-title', 'cta'
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Career Benefits schema (Company Values + Benefits)
export const careerBenefits = pgTable("career_benefits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: varchar("type").notNull(), // 'value' or 'benefit'
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCareerContentSchema = createInsertSchema(careerContent).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCareerBenefitSchema = createInsertSchema(careerBenefits).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CareerContent = typeof careerContent.$inferSelect;
export type InsertCareerContent = z.infer<typeof insertCareerContentSchema>;
export type CareerBenefit = typeof careerBenefits.$inferSelect;
export type InsertCareerBenefit = z.infer<typeof insertCareerBenefitSchema>;

export const insertCompanyStatsSchema = createInsertSchema(companyStats).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CompanyStats = typeof companyStats.$inferSelect;
export type InsertCompanyStats = z.infer<typeof insertCompanyStatsSchema>;

// References Content schema - for hero and CTA sections text
export const referencesContent = pgTable("references_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  section: varchar("section").notNull(), // 'hero', 'cta', 'trusted_partner'
  title: text("title").notNull(),
  content: text("content").notNull(),
  buttonText: text("button_text"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertReferencesContentSchema = createInsertSchema(referencesContent).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ReferencesContent = typeof referencesContent.$inferSelect;
export type InsertReferencesContent = z.infer<typeof insertReferencesContentSchema>;

// Partner Logos schema - for trusted partner section
export const partnerLogos = pgTable("partner_logos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: varchar("company_name").notNull(),
  logoUrl: text("logo_url").notNull(),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPartnerLogoSchema = createInsertSchema(partnerLogos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type PartnerLogo = typeof partnerLogos.$inferSelect;
export type InsertPartnerLogo = z.infer<typeof insertPartnerLogoSchema>;

// Reference Projects schema - for client projects showcase
export const referenceProjects = pgTable("reference_projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  company: varchar("company").notNull(),
  sector: varchar("sector").notNull(),
  logoUrl: text("logo_url"),
  project: varchar("project").notNull(),
  description: text("description").notNull(),
  results: text("results").array(), // Array of result strings
  duration: varchar("duration").notNull(),
  year: varchar("year").notNull(),
  testimonial: text("testimonial"),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertReferenceProjectSchema = createInsertSchema(referenceProjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ReferenceProject = typeof referenceProjects.$inferSelect;
export type InsertReferenceProject = z.infer<typeof insertReferenceProjectSchema>;

// Homepage Statistics schema - for homepage stats section
export const homepageStatistics = pgTable("homepage_statistics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: varchar("key").notNull().unique(), // 'projects', 'satisfaction', 'experience', 'clients'
  value: varchar("value").notNull(), // '100+', '%95', '15+', '50+'
  label: varchar("label").notNull(), // 'Başarılı Proje', 'Müşteri Memnuniyeti', etc.
  icon: varchar("icon"), // Lucide icon name
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertHomepageStatisticSchema = createInsertSchema(homepageStatistics).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type HomepageStatistic = typeof homepageStatistics.$inferSelect;
export type InsertHomepageStatistic = z.infer<typeof insertHomepageStatisticSchema>;
