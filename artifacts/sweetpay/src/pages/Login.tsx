import { useState } from 'react';
    import { useLocation } from 'wouter';
    import { useAuth } from '@/contexts/AuthContext';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { AlertCircle, RefreshCw } from 'lucide-react';

    interface Captcha { question: string; answer: number; }

    function generateCaptcha(): Captcha {
    const type = Math.floor(Math.random() * 3);
    if (type === 0) {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      return { question: `${a} + ${b}`, answer: a + b };
    } else if (type === 1) {
      const a = Math.floor(Math.random() * 10) + 6;
      const b = Math.floor(Math.random() * 5) + 1;
      return { question: `${a} - ${b}`, answer: a - b };
    } else {
      const a = Math.floor(Math.random() * 5) + 2;
      const b = Math.floor(Math.random() * 5) + 2;
      return { question: `${a} × ${b}`, answer: a * b };
    }
    }

    export default function Login() {
    const [, navigate] = useLocation();
    const { login } = useAuth();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [error, setError] = useState('');
    const [captcha, setCaptcha] = useState<Captcha>(generateCaptcha);
    const base = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';

    const refreshCaptcha = () => { setCaptcha(generateCaptcha()); setCaptchaInput(''); };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      if (parseInt(captchaInput) !== captcha.answer) {
        setError('إجابة التحقق خاطئة، حاول مجدداً');
        refreshCaptcha();
        return;
      }
      if (!login(identifier, password)) {
        setError('البريد أو اسم المستخدم أو كلمة المرور غير صحيحة');
        refreshCaptcha();
        return;
      }
      navigate('/dashboard');
    };

    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <a href={base + '/'} className="inline-block text-3xl font-black text-foreground">
              Sweet<span className="text-primary">Pay</span>
            </a>
            <p className="text-muted-foreground mt-2">سجّل دخولك للوصول إلى بطاقتك الافتراضية</p>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-foreground">تسجيل الدخول</h2>
            {error && (
              <div className="flex items-center gap-2 text-sm bg-destructive/10 text-destructive p-3 rounded-lg mb-4 border border-destructive/20">
                <AlertCircle size={15} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="identifier">البريد الإلكتروني أو اسم المستخدم</Label>
                <Input id="identifier" value={identifier} onChange={e => setIdentifier(e.target.value)} required placeholder="you@example.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
              </div>
              <div className="space-y-1">
                <Label>التحقق: كم يساوي <span className="font-bold text-primary">{captcha.question}</span> = ؟</Label>
                <div className="flex gap-2">
                  <Input value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} required placeholder="الجواب" className="flex-1" />
                  <Button type="button" variant="outline" size="icon" onClick={refreshCaptcha} title="تغيير السؤال">
                    <RefreshCw size={15} />
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full font-bold mt-2">دخول ←</Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-5">
              ليس لديك حساب؟{' '}
              <a href={base + '/register'} className="text-primary font-bold hover:underline">إنشاء حساب جديد</a>
            </p>
          </div>
        </div>
      </div>
    );
    }
    