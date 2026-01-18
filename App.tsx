import React, { useEffect, useState } from 'react';
import { Menu, X, User, Shield } from 'lucide-react';
import { NavItem, ViewType, StudentProfile } from './types';
import Home from './pages/Home';
import Teachers from './pages/Teachers';
import Auth from './pages/Auth';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import SiteGenerator from './components/SiteGenerator';

// --- Mock Data for Demo User ---
const DEMO_USER_TEMPLATE: StudentProfile = {
  name: "Azizbek Rahimov",
  id: "NZ-2024-892",
  avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop",
  status: "active",
  currentCourse: "", 
  teacher: "",
  attendance: 0,
  averageScore: 0, 
  balance: "0",
  nextPaymentDate: "-",
  rank: 15,
  payments: [],
  assignments: [
      { id: 1, title: "Funksiya hosilasi", deadline: "12.05.2024", status: "pending" },
      { id: 2, title: "Trigonometriya asoslari", deadline: "05.05.2024", status: "graded", grade: "5" }
  ],
  schedule: [
      { day: "Dushanba", time: "14:00 - 16:00", subject: "Matematika", room: "204-xona" },
      { day: "Chorshanba", time: "14:00 - 16:00", subject: "Matematika", room: "204-xona" },
      { day: "Juma", time: "14:00 - 16:00", subject: "Matematika", room: "204-xona" }
  ]
};

// --- Navigation Component ---

const Navigation = ({ activeView, setView, isLoggedIn, isAdmin }: { activeView: ViewType, setView: (view: ViewType) => void, isLoggedIn: boolean, isAdmin: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: "Bosh Sahifa", id: 'home' },
    { label: "Kurslar", id: 'courses' },
    { label: "Ustozlar", id: 'teachers' },
    { label: "Aloqa", id: 'contact' },
  ];

  const handleNavClick = (id: ViewType) => {
    setView(id);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  if(activeView === 'admin') return null; // Hide nav on admin panel

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className="flex items-center gap-3 group relative z-50">
          <div className="w-10 h-10 bg-gradient-to-tr from-amber-600 to-amber-400 rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.5)] group-hover:rotate-90 transition-transform duration-500">
             <div className="w-5 h-5 -rotate-45 bg-black flex items-center justify-center">
               <span className="text-amber-500 font-bold text-xs">N</span>
             </div>
          </div>
          <div className="flex flex-col">
            <span className="font-[Space_Grotesk] text-xl font-bold text-white tracking-widest leading-none">NAZAR</span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-amber-500">Maxram</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button 
              key={item.label} 
              onClick={() => handleNavClick(item.id)}
              className={`text-xs font-medium uppercase tracking-[0.15em] transition-colors relative group ${activeView === item.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {item.label}
              <span className={`absolute -bottom-2 left-1/2 w-0 h-[2px] bg-amber-500 -translate-x-1/2 transition-all duration-300 ${activeView === item.id ? 'w-full' : 'group-hover:w-full'}`}></span>
            </button>
          ))}
          
          {isLoggedIn ? (
            <button onClick={() => handleNavClick(isAdmin ? 'admin' : 'profile')} className="group relative pl-6 pr-8 py-2.5 overflow-hidden border border-amber-500/30 rounded-full flex items-center gap-2">
               <div className="absolute inset-0 w-0 bg-amber-500/10 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
               {isAdmin ? <Shield className="w-4 h-4 text-red-500" /> : <User className="w-4 h-4 text-amber-500" />}
               <span className="relative text-xs font-bold uppercase tracking-widest text-amber-500 group-hover:text-amber-400 transition-colors">
                 {isAdmin ? 'Admin' : 'Profil'}
               </span>
            </button>
          ) : (
            <button onClick={() => handleNavClick('auth')} className="group relative px-6 py-2.5 overflow-hidden border border-amber-500/30 rounded-full">
               <div className="absolute inset-0 w-0 bg-amber-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
               <span className="relative text-xs font-bold uppercase tracking-widest text-amber-500 group-hover:text-black transition-colors">Kirish</span>
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white relative z-50 p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="text-amber-500" /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center gap-10 transition-all duration-700 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        {navItems.map((item, i) => (
          <button 
            key={item.label} 
            onClick={() => handleNavClick(item.id)}
            className={`text-4xl font-[Space_Grotesk] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white hover:to-amber-500 transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {item.label}
          </button>
        ))}
         <button 
            onClick={() => handleNavClick(isLoggedIn ? (isAdmin ? 'admin' : 'profile') : 'auth')}
            className={`text-4xl font-[Space_Grotesk] font-bold text-amber-500 transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '300ms' }}
          >
            {isLoggedIn ? (isAdmin ? 'Admin Panel' : 'Mening Profilim') : "Kirish / Ro'yxatdan o'tish"}
          </button>
      </div>
    </nav>
  );
};

// --- Main App ---

function App() {
  const [view, setView] = useState<ViewType>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<StudentProfile | null>(null);
  
  // Onboarding state
  const [isSelecting, setIsSelecting] = useState(false);
  const [tempTeacher, setTempTeacher] = useState<string | null>(null);

  const handleLogin = (type: 'student' | 'admin') => {
    if (type === 'admin') {
        setIsLoggedIn(true);
        setIsAdmin(true);
        setView('admin');
        window.scrollTo(0,0);
    } else {
        // Start student onboarding flow
        setIsLoggedIn(true);
        setIsAdmin(false);
        setIsSelecting(true);
        setView('teachers'); // Step 1: Select Teacher
        window.scrollTo(0,0);
    }
  };

  const handleTeacherSelect = (teacherName: string) => {
      setTempTeacher(teacherName);
      setView('courses'); // Step 2: Select Course
      window.scrollTo(0,0);
  };

  const handleCourseSelect = (courseTitle: string, coursePrice: string) => {
      // Step 3: Finalize and Show Profile
      const newUser = {
          ...DEMO_USER_TEMPLATE,
          teacher: tempTeacher || "Umarov Haydarali",
          currentCourse: courseTitle,
          status: "active" as const,
          balance: "0",
          payments: [
              { id: 1, date: new Date().toLocaleDateString(), amount: coursePrice.split(' ')[0], status: 'pending' as const, method: 'Kutilmoqda' }
          ]
      };
      
      setCurrentUser(newUser);
      setIsSelecting(false);
      setView('profile');
      window.scrollTo(0,0);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentUser(null);
    setIsSelecting(false);
    setTempTeacher(null);
    setView('home');
    window.scrollTo(0,0);
  };

  return (
    <div className="bg-[#030303] text-slate-200 selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      <Navigation activeView={view} setView={setView} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <main>
        {view === 'home' && <Home setView={setView} />}
        
        {view === 'courses' && (
            <Courses 
                onRegister={() => setView('auth')} 
                isSelectionMode={isSelecting}
                onSelect={handleCourseSelect}
            />
        )}
        
        {view === 'teachers' && (
            <Teachers 
                isSelectionMode={isSelecting}
                onSelect={handleTeacherSelect}
            />
        )}
        
        {view === 'auth' && <Auth onLogin={handleLogin} />}
        {view === 'contact' && <Contact />}
        {view === 'profile' && currentUser && <Profile user={currentUser} onLogout={handleLogout} />}
        {view === 'admin' && <Admin onLogout={handleLogout} />}
      </main>
      
      {view !== 'admin' && <footer className="bg-[#020202] border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 bg-amber-600 rotate-45 flex items-center justify-center">
                 <span className="-rotate-45 text-black font-bold text-xs">N</span>
               </div>
               <span className="text-2xl font-bold tracking-widest text-white">NAZAR<span className="text-gray-600">MAXRAM</span></span>
            </div>
            <p className="text-gray-500 max-w-xs">
              Andijon viloyati, Shahrixon tumani. <br />
              Nazarmaxram Osiyo to'yhona oldida.
            </p>
          </div>
          <div className="flex gap-12 md:gap-24">
             {/* Footer Links - simplified for brevity */}
             <div><h4 className="text-white font-bold mb-6">MENYU</h4><ul className="space-y-2 text-sm text-gray-500"><li>Bosh Sahifa</li><li>Kurslar</li></ul></div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-8 border-t border-white/5 text-xs text-gray-600 uppercase tracking-widest">
           <p>© 2024 Nazarmaxram.</p>
           <p>Designed by AI</p>
        </div>
      </div>
    </footer>}

      <SiteGenerator />
      
      {/* Styles for marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}

export default App;