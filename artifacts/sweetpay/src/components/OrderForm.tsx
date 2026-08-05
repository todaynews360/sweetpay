import { motion } from "framer-motion";
import { LogIn, ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrderForm() {
  const base = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';

  return (
    <div id="order" className="w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-[2rem] bg-card p-8 md:p-12 shadow-2xl shadow-black/5 border border-primary/10 overflow-hidden text-center"
      >
        {/* Decorative accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 rounded-tr-[100px] -z-10" />

        {/* Lock icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Lock className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-foreground mb-3">ابدأ التحويل الآن</h3>
        <p className="text-muted-foreground text-base mb-8 leading-relaxed max-w-sm mx-auto">
          سجّل دخولك أولاً للوصول إلى لوحة التحكم وتقديم طلب التحويل بأمان.
        </p>

        <Button size="lg" className="w-full h-14 text-lg font-bold gap-2" asChild>
          <a href={base + '/login'}>
            <LogIn className="w-5 h-5" />
            تسجيل الدخول للمتابعة
            <ArrowLeft className="w-5 h-5" />
          </a>
        </Button>

        <p className="text-xs text-muted-foreground mt-5">
          ليس لديك حساب؟{" "}
          <a href={base + '/register'} className="text-primary font-bold hover:underline">
            أنشئ حساباً مجاناً
          </a>
        </p>
      </motion.div>
    </div>
  );
}
