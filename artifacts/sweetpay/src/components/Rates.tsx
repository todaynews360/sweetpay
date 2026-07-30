import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

export function Rates() {
  return (
    <section id="rates" className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
<<<<<<< HEAD
=======
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10 pattern-dots" />
>>>>>>> 42c9ccb975d03a2bbafdf0caac8a430677509698
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 bg-primary rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">أسعارنا لا تقبل المنافسة</h2>
            <p className="text-xl text-secondary-foreground/70">نقدم أفضل سعر صرف لعملة سويت كوين في السوق الجزائري</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-background rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-center border-4 border-primary/20"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                <Calculator className="w-8 h-8" />
              </div>
            </div>
            <p className="text-muted-foreground font-bold text-lg mb-2">سعر الصرف الحالي</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="text-center">
                <span className="block text-5xl md:text-6xl font-black text-foreground">100</span>
                <span className="block text-xl font-bold text-muted-foreground mt-2">سويت كوين</span>
              </div>
              <div className="text-4xl text-primary font-black">=</div>
              <div className="text-center">
                <span className="block text-5xl md:text-6xl font-black text-secondary">500,000</span>
                <span className="block text-xl font-bold text-muted-foreground mt-2">دينار جزائري</span>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-border/50">
              <p className="text-sm font-semibold text-muted-foreground">
                * يتم تحديث الأسعار بانتظام حسب وضع السوق. لا توجد رسوم خفية أو اقتطاعات إضافية.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
