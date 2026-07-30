import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Rates } from "@/components/Rates";
import { HowItWorks } from "@/components/HowItWorks";
import { OrderForm } from "@/components/OrderForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div dir="rtl" className="min-h-[100dvh] flex flex-col font-sans overflow-x-hidden selection:bg-primary/30 selection:text-secondary">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <Rates />
        
        <HowItWorks />
        
        <section id="order" className="py-24 bg-muted/30 relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-4xl font-black text-foreground mb-4">مستعد للتحويل؟</h2>
              <p className="text-lg text-muted-foreground">قم بتعبئة الاستمارة وسنقوم بالتواصل معك فوراً لإنهاء المعاملة.</p>
            </div>
            
            <OrderForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
