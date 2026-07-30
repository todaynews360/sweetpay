import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  sweetWalletId: z.string().min(3, "معرف المحفظة مطلوب"),
  amount: z.coerce.number().min(10, "الحد الأدنى 10 سويت كوين").max(100000, "الحد الأقصى 100,000 سويت كوين")
});

type FormData = z.infer<typeof formSchema>;

export function OrderForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sweetWalletId: "",
      amount: 100,
    },
  });

  const amount = watch("amount") || 0;
  const dzdAmount = (amount * 5000).toLocaleString("ar-DZ");

  const onSubmit = async (data: FormData) => {
    // Simulate short processing
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const phoneNumber = "213550000000";
    const text = `طلب تحويل SweetCoin جديد:
الاسم: ${data.name}
المعرف (ID): ${data.sweetWalletId}
الكمية: ${data.amount}
المبلغ المتوقع: ${dzdAmount} دج`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    
    setIsSubmitted(true);
  };

  return (
    <div id="order" className="w-full max-w-xl mx-auto">
      <div className="relative rounded-[2rem] bg-card p-8 md:p-10 shadow-2xl shadow-black/5 border border-primary/10 overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 rounded-tr-[100px] -z-10" />

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">ابدأ التحويل الآن</h3>
                <p className="text-muted-foreground text-sm">أدخل معلوماتك وسنقوم بتوجيهك إلى واتساب لإتمام العملية</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input 
                  id="name" 
                  placeholder="محمد الأمين" 
                  {...register("name")} 
                  className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.name && <p className="text-destructive text-sm mt-1 font-medium">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sweetWalletId">معرف سويت ولت (SweetWallet ID)</Label>
                <div className="relative">
                  <Input 
                    id="sweetWalletId" 
                    placeholder="example.sweet" 
                    dir="ltr"
                    className={`pl-10 text-left ${errors.sweetWalletId ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    {...register("sweetWalletId")} 
                  />
                  <Wallet className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                </div>
                {errors.sweetWalletId && <p className="text-destructive text-sm mt-1 font-medium">{errors.sweetWalletId.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">كمية سويت كوين للبيع</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  dir="ltr"
                  className={`text-left text-xl font-bold ${errors.amount ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  {...register("amount")} 
                />
                {errors.amount && <p className="text-destructive text-sm mt-1 font-medium">{errors.amount.message}</p>}
              </div>

              <div className="bg-secondary/5 rounded-2xl p-6 mt-6 border border-secondary/10 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1 h-full bg-primary" />
                <p className="text-sm text-muted-foreground font-semibold mb-1">المبلغ الذي ستستلمه:</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-extrabold text-secondary">{dzdAmount}</span>
                  <span className="text-lg font-bold text-secondary/70 mb-1">دج</span>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-lg h-14 group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">جاري التحويل...</span>
                ) : (
                  <>
                    إرسال الطلب عبر واتساب
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:-translate-x-1 transition-transform rotate-180" />
                  </>
                )}
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium mt-4">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>معلوماتك آمنة ومشفرة</span>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-6"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">تم تجهيز طلبك!</h3>
              <p className="text-lg text-muted-foreground">
                إذا لم يفتح تطبيق واتساب تلقائياً، يمكنك النقر على الزر أدناه.
              </p>
              <div className="pt-6">
                <Button 
                  onClick={() => setIsSubmitted(false)} 
                  variant="outline" 
                  className="w-full"
                >
                  إرسال طلب آخر
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
