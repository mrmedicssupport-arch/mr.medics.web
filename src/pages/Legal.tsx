import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Legal({ title, content }: { title: string, content: string }) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <p className="text-slate-700 dark:text-slate-300">{content}</p>
      </main>
      <Footer />
    </div>
  );
}
