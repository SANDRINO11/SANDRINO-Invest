import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Globe,
  Wallet,
  ArrowUpRight,
  ShieldCheck,
  UserCheck,
  Building2,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Layers,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenWithdrawModal: () => void;
  onOpenReferralModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenWithdrawModal,
  onOpenReferralModal,
}) => {
  const { currentUser, switchUser, users, userWallet, userSubscription } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'missions', label: 'Missions' },
    { id: 'pricing', label: 'Abonnements' },
    { id: 'dashboard', label: 'Mon Espace' },
    { id: 'company', label: 'Entreprises' },
    { id: 'admin', label: 'Supervision Admin' },
    { id: 'how-it-works', label: 'Comment ça marche' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identité */}
          <button
            onClick={() => {
              onSelectTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-blue-600 flex items-center justify-center font-black text-2xl tracking-wider text-white shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition-transform">
              S
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
                  SANDRINO
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold px-1.5 py-0.5 rounded">
                  AFRIQUE
                </span>
              </div>
              <p className="text-[10px] text-emerald-400 font-medium tracking-wide uppercase">
                Apprends. Accomplis. Gagne.
              </p>
            </div>
          </button>

          {/* Navigation Principale Desktop */}
          <div className="hidden lg:flex items-center space-x-1 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectTab(link.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Actions & Role Switcher */}
          <div className="hidden md:flex items-center gap-3">
            {/* Solde Portefeuille Rapide */}
            {currentUser.role === 'MEMBER' && (
              <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 gap-2.5">
                <div className="flex items-center gap-1.5 text-xs">
                  <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-slate-400">Solde:</span>
                  <span className="font-bold text-white">
                    {userWallet.availableBalance.toLocaleString('fr-FR')}{' '}
                    <span className="text-emerald-400 text-[11px]">FCFA</span>
                  </span>
                </div>
                <button
                  onClick={onOpenWithdrawModal}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-md transition flex items-center gap-0.5 shadow-sm shadow-emerald-900/40"
                  title="Retrait immédiat Mobile Money"
                >
                  Retirer <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Plan Badge */}
            {currentUser.role === 'MEMBER' && (
              <button
                onClick={() => onSelectTab('pricing')}
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold border transition ${
                  userSubscription?.plan === 'PREMIUM'
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                    : userSubscription?.plan === 'STARTER'
                    ? 'bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20'
                    : userSubscription?.plan === 'BUSINESS'
                    ? 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{userSubscription ? userSubscription.plan : 'GRATUIT'}</span>
              </button>
            )}

            {/* Switch User Session Menu */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 px-3 py-1.5 rounded-xl text-xs transition"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                  {currentUser.fullName.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white leading-tight max-w-[110px] truncate">
                    {currentUser.fullName}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">
                    {currentUser.role === 'MEMBER'
                      ? 'Membre'
                      : currentUser.role === 'COMPANY'
                      ? 'Entreprise'
                      : 'Admin'}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Changer de compte de démo
                    </p>
                    <p className="text-xs text-slate-500">
                      Testez les 3 rôles de la plateforme SANDRINO
                    </p>
                  </div>
                  <div className="p-1 space-y-1">
                    {users.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUser(u.id);
                          setUserDropdownOpen(false);
                          if (u.role === 'ADMIN') onSelectTab('admin');
                          else if (u.role === 'COMPANY') onSelectTab('company');
                          else onSelectTab('dashboard');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition ${
                          u.id === currentUser.id
                            ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                            : 'hover:bg-slate-800 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs">
                            {u.role === 'ADMIN' ? (
                              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                            ) : u.role === 'COMPANY' ? (
                              <Building2 className="w-3.5 h-3.5 text-blue-400" />
                            ) : (
                              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{u.fullName}</div>
                            <div className="text-[10px] text-slate-400">
                              {u.email} ({u.country})
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          {u.role}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-slate-800 mt-1 pt-1 px-2">
                    <button
                      onClick={() => {
                        onOpenReferralModal();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-lg flex items-center justify-between"
                    >
                      <span>Code parrainage : {currentUser.referralCode}</span>
                      <span className="text-emerald-400 text-[10px]">10% bonus</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Language */}
            <div className="flex items-center gap-1 text-xs text-slate-400 px-2 py-1 rounded border border-slate-800">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>FR (XOF)</span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {currentUser.role === 'MEMBER' && (
              <button
                onClick={onOpenWithdrawModal}
                className="bg-emerald-600 text-white text-xs px-2.5 py-1.5 rounded-lg font-bold"
              >
                {userWallet.availableBalance.toLocaleString('fr-FR')} F
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                  currentTab === link.id
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <p className="text-xs text-slate-400 font-semibold uppercase">Profil actif :</p>
            <div className="bg-slate-800/80 p-3 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">{currentUser.fullName}</p>
                <p className="text-xs text-slate-400">{currentUser.email}</p>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                {currentUser.role}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  onOpenWithdrawModal();
                  setMobileMenuOpen(false);
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-lg text-center"
              >
                Demander Retrait
              </button>
              <button
                onClick={() => {
                  onOpenReferralModal();
                  setMobileMenuOpen(false);
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2 rounded-lg text-center"
              >
                Mon Parrainage
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
