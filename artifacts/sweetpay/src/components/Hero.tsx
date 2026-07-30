import { motion } from "framer-motion";
import { ArrowLeft, Zap, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-foreground px-4 py-2 rounded-full font-bold text-sm mb-4 border border-primary/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-secondary">أفضل سعر في السوق الجزائري</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.15] tracking-tight">
            حول نقاط سويت كوين إلى <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-amber-600">دينار جزائري</span> في دقائق
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            الخدمة الأسرع والأكثر أماناً في الجزائر. استلم أموالك عبر بريدي موب بسهولة وبدون تعقيدات.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-xl" asChild>
              <a href="#order">
                حول رصيدك الآن
                <ArrowLeft className="mr-2 h-6 w-6" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-10 text-xl bg-background" asChild>
              <a href="#how-it-works">كيف تعمل الخدمة؟</a>
            </Button>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Zap, title: "تحويل فوري", desc: "استلم أموالك في دقائق معدودة" },
              { icon: Shield, title: "مضمون وآمن", desc: "خدمة موثوقة ومجربة من الآلاف" },
              { icon: Clock, title: "دعم متواصل", desc: "فريقنا متواجد للرد على استفساراتك" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                className="flex flex-col items-center gap-3 p-4"
              >
                <div className="w-12 h-12 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
