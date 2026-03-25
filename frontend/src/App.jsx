import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import BuilderPage from './pages/BuilderPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200">
        <header className="bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50 mb-8 border-b border-white">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
              </div>
              <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
                ResumeBuilder
              </h1>
            </div>
            <nav className="flex gap-1">
              <a href="/" className="px-4 py-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-blue-600 font-semibold transition-colors">Builder</a>
              <a href="/admin" className="px-4 py-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-blue-600 font-semibold transition-colors">Admin</a>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Routes>
            <Route path="/" element={<BuilderPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Toaster position="top-center" toastOptions={{ duration: 4500, style: { background: '#333', color: '#fff' } }} />
      </div>
    </Router>
  );
}

export default App;
