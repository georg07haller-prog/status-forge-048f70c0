import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Hide layout for onboarding
  if (location.pathname.includes('Onboarding')) {
    return <div className="min-h-screen">{children}</div>;
  }

  // Don't show guide button on the guide page itself
  const showGuideButton = !location.pathname.includes('Guide');

  return (
    <div className="min-h-screen bg-gray-50">
      {showGuideButton && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => navigate(createPageUrl('Guide'))}
            className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg border border-gray-200"
            size="sm"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Guide
          </Button>
        </div>
      )}
      <style>{`
        :root {
          --color-primary: #1E3A8A;
          --color-gold: #D4AF37;
          --color-boost: #10B981;
          --color-bg: #F9FAFB;
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        .sparkle {
          animation: sparkle 1s ease-in-out;
        }
        
        .gradient-primary {
          background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%);
        }
        
        .gradient-gold {
          background: linear-gradient(135deg, #D4AF37 0%, #FCD34D 100%);
        }
        
        .glow-gold {
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
        }
      `}</style>
      {children}
    </div>
  );
}