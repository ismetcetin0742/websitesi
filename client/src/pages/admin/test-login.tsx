import { useState } from "react";

export default function TestLogin() {
  const [message, setMessage] = useState("");

  const testLogin = async () => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "admin",
          password: "a123"
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminToken", data.token);
        setMessage("Giriş başarılı! Token kaydedildi. Dashboard'a yönlendiriliyorsunuz...");
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 1000);
      } else {
        setMessage("Giriş başarısız!");
      }
    } catch (error) {
      setMessage("Hata: " + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Test Login</h1>
        <button 
          onClick={testLogin}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Admin Girişi Yap (admin/a123)
        </button>
        {message && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}