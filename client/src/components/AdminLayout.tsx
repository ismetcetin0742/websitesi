import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [, navigate] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setIsAuthenticated(false);
      navigate("/admin/login");
      return;
    }

    // Verify token by making a request to a protected endpoint
    fetch("/api/admin/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("adminToken");
          navigate("/admin/login");
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      });
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Algotrom Admin</h1>
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                navigate("/admin/login");
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}