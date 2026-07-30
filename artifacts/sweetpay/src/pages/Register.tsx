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

    export default function Register() {
    const [, navigate] = useLocation();
    const { register } = useAuth();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
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
      if (password.length < 6) { setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل'); return; }
      if (!register(email, username, password, fullName)) {
        setError('البريد الإلكتروني أو اسم المستخدم مستخدم بالفعل');
        return;
      }
      navigate('/dashboard');
    };

    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <a href={base + '/'} className="inline-block text-3xl font-black text-foreground">
              Sweet<span className="text-primary">Pay</span>
            </a>
            <p className="text-muted-foreground mt-2">أنشئ حسابك واحصل على بطاقتك الافتراضية</p>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-foreground">إنشاء حساب جديد</h2>
            {error && (
              <div className="flex items-center gap-2 text-sm bg-destructive/10 text-destructive p-3 rounded-lg mb-4 border border-destructive/20">
                <AlertCircle size={15} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="fullName">الاسم الكامل (كما سيظهر في البطاقة)</Label>
                <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="محمد أمين بوعلام" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">اسم المستخدم</Label>
                <Input id="username" value={username} onChange={e => setUsername(e.target.value)} required placeholder="username123" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="6 أحرف على الأقل" />
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
              <Button type="submit" className="w-full font-bold mt-2">إنشاء الحساب ←</Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-5">
              لديك حساب بالفعل؟{' '}
              <a href={base + '/login'} className="text-primary font-bold hover:underline">تسجيل الدخول</a>
            </p>
          </div>
        </div>
      </div>
    );
    }
    