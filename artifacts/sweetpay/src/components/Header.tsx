import { motion } from "framer-motion";
    import { Link, useLocation } from "wouter";
    import { useAuth } from "../contexts/AuthContext";

    export function Header() {
    const { user, logout } = useAuth();
    const [, navigate] = useLocation();

    const handleLogout = () => {
      logout();
      navigate("/");
    };

    return (
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-black text-xl">S</span>
            </div>
            <span className="font-extrabold text-2xl tracking-tight">
              Sweet<span className="text-primary">Pay</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">كيف نعمل</a>
            <a href="#rates" className="text-muted-foreground hover:text-foreground transition-colors">الأسعار</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">الأسئلة الشائعة</a>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>👤</span>
                  <span>{user.username}</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="bg-primary/10 text-primary border border-primary/20 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/20 transition-colors"
                >
                  لوحتي
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-muted-foreground hover:text-destructive transition-colors px-2 py-1"
                >
                  خروج
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
                >
                  دخول
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors shadow-sm"
                >
                  حساب جديد
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.header>
    );
    }