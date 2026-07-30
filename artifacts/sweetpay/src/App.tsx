import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';

function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background" dir="rtl">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground">
          404 - الصفحة غير موجودة
        </h1>
        <p className="mt-4 text-muted-foreground">
          عذراً، الصفحة التي تبحث عنها غير متوفرة.
        </p>
        <a href="/" className="mt-8 inline-block text-primary font-bold hover:underline">
          العودة للصفحة الرئيسية
        </a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, '') || ''}>
      <Router />
      <Toaster />
    </WouterRouter>
  );
}

export default App;
