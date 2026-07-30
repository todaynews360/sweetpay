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
              transition={{ delay: i * 0.2 }}
              className="relative text-center group"
            >
              {i !== steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-border -z-10 translate-x-1/2">
                  <div className="absolute top-0 right-0 h-full bg-primary transition-all duration-1000 w-0 group-hover:w-full" />
                </div>
              )}
              <div className="w-24 h-24 mx-auto bg-card border-4 border-background shadow-xl rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:border-primary/20 transition-all duration-300">
                <step.icon className="w-10 h-10 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
