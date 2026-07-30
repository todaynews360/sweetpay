export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground/80 py-12 border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-black text-lg leading-none">S</span>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Sweet<span className="text-primary">Pay</span>
          </span>
        </div>
        
        <p className="max-w-md mx-auto text-sm mb-8 leading-relaxed">
          الخدمة الأولى والأكثر موثوقية في الجزائر لتحويل نقاط سويت كوين إلى دينار جزائري بكل أمان وسرعة.
        </p>

        <div className="flex justify-center gap-6 text-sm font-semibold mb-12">
          <a href="#how-it-works" className="hover:text-primary transition-colors">كيف نعمل</a>
          <a href="#rates" className="hover:text-primary transition-colors">الأسعار</a>
          <a href="#order" className="hover:text-primary transition-colors">بيع الرصيد</a>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-xs">
          <p>© {new Date().getFullYear()} SweetPay. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
