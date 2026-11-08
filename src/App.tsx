import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { MissionsCatalog } from './components/MissionsCatalog';
import { PricingPage } from './components/PricingPage';
import { CompanyPortal } from './components/CompanyPortal';
import { AdminPortal } from './components/AdminPortal';
import { HowItWorksView } from './components/HowItWorksView';
import { WithdrawModal } from './components/WithdrawModal';
import { ReferralModal } from './components/ReferralModal';
import { ToastContainer } from './components/ToastContainer';
import { MissionCategory } from './types';
import {
  Globe,
  ShieldCheck,
  Heart,
  Smartphone,
  ExternalLink,
  Wallet,
  Users,
  Award,
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [missionsCategoryFilter, setMissionsCategoryFilter] = useState<MissionCategory | undefined>(undefined);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

  const { currentUser } = useApp();

  const handleExploreMissionsWithCategory = (category?: MissionCategory) => {
    setMissionsCategoryFilter(category);
    setCurrentTab('missions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenWithdrawModal={() => setIsWithdrawModalOpen(true)}
        onOpenReferralModal={() => setIsReferralModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'home' && (
          <LandingPage
            onExploreMissions={handleExploreMissionsWithCategory}
            onExplorePricing={() => setCurrentTab('pricing')}
            onGoToDashboard={() => setCurrentTab('dashboard')}
            onGoToCompany={() => setCurrentTab('company')}
          />
        )}

        {currentTab === 'missions' && (
          <MissionsCatalog
            initialCategory={missionsCategoryFilter}
            onGoToPricing={() => setCurrentTab('pricing')}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            onOpenWithdrawModal={() => setIsWithdrawModalOpen(true)}
            onOpenReferralModal={() => setIsReferralModalOpen(true)}
            onGoToMissions={() => setCurrentTab('missions')}
            onGoToPricing={() => setCurrentTab('pricing')}
          />
        )}

        {currentTab === 'pricing' && (
          <PricingPage onGoToMissions={() => setCurrentTab('missions')} />
        )}

        {currentTab === 'company' && <CompanyPortal />}

        {currentTab === 'admin' && <AdminPortal />}

        {currentTab === 'how-it-works' && (
          <HowItWorksView
            onGoToMissions={() => setCurrentTab('missions')}
            onGoToPricing={() => setCurrentTab('pricing')}
            onGoToCompany={() => setCurrentTab('company')}
          />
        )}
      </main>

      {/* Modals */}
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
      />

      <ReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
      />

      {/* Real-time Toast Alerts */}
      <ToastContainer />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/90 text-slate-400 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center font-black text-white text-base">
                  S
                </div>
                <span className="font-black text-lg text-white tracking-tight">SANDRINO</span>
              </div>
              <p className="text-slate-400 max-w-sm">
                Première plateforme de micro-missions rémunérées et de qualification de feedbacks en
                Afrique francophone.
              </p>
              <p className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                Apprends. Accomplis. Gagne.
              </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <span className="font-bold text-white uppercase text-[11px] block mb-2">
                  Navigation
                </span>
                <ul className="space-y-1.5">
                  <li>
                    <button
                      onClick={() => setCurrentTab('missions')}
                      className="hover:text-emerald-400 transition"
                    >
                      Missions Ouvertes
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentTab('pricing')}
                      className="hover:text-emerald-400 transition"
                    >
                      Abonnements & Tarifs
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentTab('dashboard')}
                      className="hover:text-emerald-400 transition"
                    >
                      Tableau de Bord
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <span className="font-bold text-white uppercase text-[11px] block mb-2">
                  Professionnels
                </span>
                <ul className="space-y-1.5">
                  <li>
                    <button
                      onClick={() => setCurrentTab('company')}
                      className="hover:text-emerald-400 transition"
                    >
                      Espace Entreprises
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentTab('company')}
                      className="hover:text-emerald-400 transition"
                    >
                      Lancer une Campagne (15%)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentTab('admin')}
                      className="hover:text-emerald-400 transition"
                    >
                      Console Admin
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <span className="font-bold text-white uppercase text-[11px] block mb-2">
                  Mobile Money
                </span>
                <ul className="space-y-1 text-[11px] text-slate-400">
                  <li>• TMoney Togo</li>
                  <li>• Moov Flooz (TG / BJ)</li>
                  <li>• Wave (CI / SN)</li>
                  <li>• Orange Money</li>
                  <li>• MTN Mobile Money</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>© {new Date().getFullYear()} SANDRINO Afrique. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <span>Règle d'or : Retraits de solde acquis 100% garantis à vie</span>
              <span>•</span>
              <span>Devise : FCFA (XOF)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
