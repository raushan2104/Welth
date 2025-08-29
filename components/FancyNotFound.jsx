"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FancyNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>

      {/* Main Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-10 max-w-lg text-center">
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse">
          404
        </h1>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Page Not Found</h2>
        <p className="text-gray-300 mb-8">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all shadow-lg">
            <Link href="/" className="flex items-center gap-2">
              <Home size={18} /> Home
            </Link>
          </Button>

          <Button
            variant="outline"
            className="hover:bg-white/10 border-white/20 text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </Button>
        </div>
      </div>

      {/* Bottom Text */}
      <p className="absolute bottom-6 text-sm text-gray-400">
        Lost in the void? Let’s get you back on track 🚀
      </p>
    </div>
  );
}
