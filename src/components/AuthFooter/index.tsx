import logoImg from "../../assets/logo.svg";

export function AuthFooter() {
  return (
    <footer className="w-full py-6 mt-auto border-t border-slate-200 bg-slate-900 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <img src={logoImg} className="w-52" alt="Centavo Logo" />
          <span className="text-sm font-black tracking-tighter text-slate-400 uppercase">
            Organize suas finanças com facilidade
          </span>
        </div>

        <nav className="flex gap-6">
          <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
            TERMOS DE USO
          </a>
          <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
            PRIVACIDADE
          </a>
          <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
            SUPORTE
          </a>
        </nav>
      </div>
    </footer>
  );
}