import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDemoRequestSchema, insertContactMessageSchema, insertJobApplicationSchema } from "@shared/schema";
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

  const httpServer = createServer(app);
  return httpServer;
}
