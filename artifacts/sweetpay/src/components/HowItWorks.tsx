import { motion } from "framer-motion";
import { FileText, Smartphone, CreditCard } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: "املأ الاستمارة",
      desc: "أدخل معلوماتك بدقة، وحدد كمية سويت كوين التي ترغب في بيعها ليتم حساب المبلغ بالدينار."
    },
    {
      icon: Smartphone,
      title: "تواصل معنا",
      desc: "سيتم تحويلك مباشرة إلى واتساب برسالة جاهزة تحتوي على تفاصيل طلبك لضمان السرعة."
    },
    {
      icon: CreditCard,
      title: "استلم أموالك",
      desc: "بعد مراجعة الطلب وتحويل النقاط، سنقوم بإرسال أموالك فوراً عبر بريدي موب (BaridiMob)."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-black text-foreground mb-4">كيف تعمل الخدمة؟</h2>
          <p className="text-lg text-muted-foreground">ثلاث خطوات بسيطة وسريعة لتحويل نقاطك إلى أموال حقيقية في حسابك</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center gap-5 p-8 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                <step.icon className="w-8 h-8" />
              </div>
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-black text-lg shadow-md">
                {i + 1}
              </div>
              <h3 className="text-xl font-black text-foreground">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
