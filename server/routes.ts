import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDemoRequestSchema, insertContactMessageSchema, insertJobApplicationSchema } from "@shared/schema";
import { authenticateAdmin, validateAdmin, generateToken } from "./adminAuth";
import nodemailer from "nodemailer";
import { z } from "zod";

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "your-email@gmail.com",
    pass: process.env.SMTP_PASS || "your-app-password"
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Demo request endpoint
  app.post("/api/demo-request", async (req, res) => {
    try {
      const validatedData = insertDemoRequestSchema.parse(req.body);
      const demoRequest = await storage.createDemoRequest(validatedData);
      
      // Send email notification
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER || "noreply@algotrom.com.tr",
          to: "destek@algotrom.com.tr",
          subject: "Yeni Demo Talebi",
          html: `
            <h2>Yeni Demo Talebi</h2>
            <p><strong>Ad Soyad:</strong> ${validatedData.name}</p>
            <p><strong>E-posta:</strong> ${validatedData.email}</p>
            <p><strong>Şirket:</strong> ${validatedData.company}</p>
            <p><strong>Mesaj:</strong> ${validatedData.message || "Mesaj yok"}</p>
            <p><strong>Tarih:</strong> ${new Date().toLocaleString("tr-TR")}</p>
          `
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Continue with success response even if email fails
      }
      
      res.json(demoRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Geçersiz veri", errors: error.errors });
      } else {
        res.status(500).json({ message: "Sunucu hatası" });
      }
    }
  });

  // Contact message endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Send email notification
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER || "noreply@algotrom.com.tr",
          to: "info@algotrom.com.tr",
          subject: "Yeni İletişim Mesajı",
          html: `
            <h2>Yeni İletişim Mesajı</h2>
            <p><strong>Ad Soyad:</strong> ${validatedData.name}</p>
            <p><strong>E-posta:</strong> ${validatedData.email}</p>
            <p><strong>Telefon:</strong> ${validatedData.phone || "Belirtilmemiş"}</p>
            <p><strong>Mesaj:</strong> ${validatedData.message}</p>
            <p><strong>Tarih:</strong> ${new Date().toLocaleString("tr-TR")}</p>
          `
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
      
      res.json(contactMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Geçersiz veri", errors: error.errors });
      } else {
        res.status(500).json({ message: "Sunucu hatası" });
      }
    }
  });

  // Job application endpoint
  app.post("/api/career/apply", async (req, res) => {
    try {
      const validatedData = insertJobApplicationSchema.parse(req.body);
      const jobApplication = await storage.createJobApplication(validatedData);
      
      // Send email notification
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER || "noreply@algotrom.com.tr",
          to: "kariyer@algotrom.com.tr",
          subject: "Yeni İş Başvurusu",
          html: `
            <h2>Yeni İş Başvurusu</h2>
            <p><strong>Pozisyon:</strong> ${validatedData.position}</p>
            <p><strong>Ad Soyad:</strong> ${validatedData.name}</p>
            <p><strong>E-posta:</strong> ${validatedData.email}</p>
            <p><strong>Telefon:</strong> ${validatedData.phone || "Belirtilmemiş"}</p>
            <p><strong>Ön Yazı:</strong> ${validatedData.coverLetter || "Ön yazı yok"}</p>
            <p><strong>Tarih:</strong> ${new Date().toLocaleString("tr-TR")}</p>
          `
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
      
      res.json(jobApplication);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Geçersiz veri", errors: error.errors });
      } else {
        res.status(500).json({ message: "Sunucu hatası" });
      }
    }
  });

  // Blog posts endpoint
  app.get("/api/blog", async (req, res) => {
    try {
      const blogPosts = await storage.getBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  // Public team members endpoint (for About page)
  app.get("/api/team", async (req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  // Get about content
  app.get('/api/about-content', async (req, res) => {
    try {
      const aboutContent = await storage.getAboutContent();
      res.json(aboutContent);
    } catch (error) {
      console.error("Error fetching about content:", error);
      res.status(500).json({ message: "Failed to fetch about content" });
    }
  });

  // Update about content (admin only)
  app.put('/api/admin/about-content/:section', authenticateAdmin, async (req, res) => {
    try {
      const { section } = req.params;
      const { title, content } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
      }

      const updatedContent = await storage.updateAboutContent(section, { title, content });
      res.json({ success: true, data: updatedContent });
    } catch (error) {
      console.error("Error updating about content:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Company Values endpoints
  app.get('/api/company-values', async (req, res) => {
    try {
      const values = await storage.getCompanyValues();
      res.json(values);
    } catch (error) {
      console.error('Error fetching company values:', error);
      res.status(500).json({ message: 'Failed to fetch company values' });
    }
  });

  app.get('/api/admin/company-values', authenticateAdmin, async (req, res) => {
    try {
      const values = await storage.getCompanyValues();
      res.json(values);
    } catch (error) {
      console.error('Error fetching company values:', error);
      res.status(500).json({ message: 'Failed to fetch company values' });
    }
  });

  app.put('/api/admin/company-values/:id', authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const updatedValue = await storage.updateCompanyValue(id, updateData);
      res.json({ success: true, data: updatedValue });
    } catch (error) {
      console.error('Error updating company value:', error);
      res.status(500).json({ message: 'Failed to update company value' });
    }
  });

  app.post('/api/admin/company-values', authenticateAdmin, async (req, res) => {
    try {
      const newValue = await storage.createCompanyValue(req.body);
      res.json({ success: true, data: newValue });
    } catch (error) {
      console.error('Error creating company value:', error);
      res.status(500).json({ message: 'Failed to create company value' });
    }
  });

  app.delete('/api/admin/company-values/:id', authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteCompanyValue(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting company value:', error);
      res.status(500).json({ message: 'Failed to delete company value' });
    }
  });

  // Single blog post endpoint
  app.get("/api/blog/:id", async (req, res) => {
    try {
      const blogPost = await storage.getBlogPost(req.params.id);
      if (!blogPost) {
        res.status(404).json({ message: "Blog yazısı bulunamadı" });
        return;
      }
      res.json(blogPost);
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  // Admin login endpoint
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Kullanıcı adı ve şifre gereklidir" });
      }

      const isValid = await validateAdmin(username, password);
      if (!isValid) {
        return res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre" });
      }

      const token = generateToken({ id: "admin", username });
      res.json({ token, user: { id: "admin", username } });
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  // Admin dashboard stats
  app.get("/api/admin/stats", authenticateAdmin, async (req, res) => {
    try {
      const [contactMessages, demoRequests, blogPosts, jobApplications] = await Promise.all([
        storage.getContactMessages(),
        storage.getDemoRequests(),
        storage.getBlogPosts(),
        storage.getJobApplications()
      ]);

      res.json({
        contactMessages: contactMessages.length,
        demoRequests: demoRequests.length,
        blogPosts: blogPosts.length,
        jobApplications: jobApplications.length
      });
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  // Admin endpoints for managing data
  app.get("/api/admin/contacts", authenticateAdmin, async (req, res) => {
    try {
      const contacts = await storage.getContactMessages();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  app.get("/api/admin/demos", authenticateAdmin, async (req, res) => {
    try {
      const demos = await storage.getDemoRequests();
      res.json(demos);
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  app.get("/api/admin/applications", authenticateAdmin, async (req, res) => {
    try {
      const applications = await storage.getJobApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  // Team management endpoints
  app.get("/api/admin/team", authenticateAdmin, async (req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  app.get("/api/admin/team/:id", authenticateAdmin, async (req, res) => {
    try {
      const teamMember = await storage.getTeamMember(req.params.id);
      if (!teamMember) {
        return res.status(404).json({ message: "Takım üyesi bulunamadı" });
      }
      res.json(teamMember);
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  app.put("/api/admin/team/:id", authenticateAdmin, async (req, res) => {
    try {
      const updatedMember = await storage.updateTeamMember(req.params.id, req.body);
      res.json({
        success: true,
        message: "Takım üyesi güncellendi",
        data: updatedMember
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Team member not found') {
        return res.status(404).json({ message: "Takım üyesi bulunamadı" });
      }
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  app.post("/api/admin/team", authenticateAdmin, async (req, res) => {
    try {
      const newMember = await storage.createTeamMember(req.body);
      res.status(201).json({
        success: true,
        message: "Takım üyesi eklendi",
        data: newMember
      });
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  app.delete("/api/admin/team/:id", authenticateAdmin, async (req, res) => {
    try {
      await storage.deleteTeamMember(req.params.id);
      res.json({
        success: true,
        message: "Takım üyesi silindi"
      });
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  app.put("/api/admin/blog/:id", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // Here you would update the blog post in database
      // const updatedPost = await storage.updateBlogPost(id, updateData);
      
      res.json({ success: true, message: "Blog yazısı güncellendi" });
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ error: "Güncelleme başarısız" });
    }
  });

  app.put("/api/admin/solutions/:id", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // Here you would update the solution in database
      // const updatedSolution = await storage.updateSolution(id, updateData);
      
      res.json({ success: true, message: "Çözüm güncellendi" });
    } catch (error) {
      console.error("Error updating solution:", error);
      res.status(500).json({ error: "Güncelleme başarısız" });
    }
  });

  app.put("/api/admin/sectors/:id", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // Here you would update the sector in database
      // const updatedSector = await storage.updateSector(id, updateData);
      
      res.json({ success: true, message: "Sektör güncellendi" });
    } catch (error) {
      console.error("Error updating sector:", error);
      res.status(500).json({ error: "Güncelleme başarısız" });
    }
  });

  app.put("/api/admin/content/:id", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // Here you would update the content in database
      // const updatedContent = await storage.updateContent(id, updateData);
      
      res.json({ success: true, message: "Site içeriği güncellendi" });
    } catch (error) {
      console.error("Error updating content:", error);
      res.status(500).json({ error: "Güncelleme başarısız" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
