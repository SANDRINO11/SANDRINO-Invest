import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  CheckCircle,
  Clock,
  Award,
  ArrowUpRight,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Share2,
} from 'lucide-react';

interface DashboardViewProps {
  onOpenWithdrawModal: () => void;
  onOpenReferralModal: () => void;
  onGoToMissions: () => void;
  onGoToPricing: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenWithdrawModal,
  onOpenReferralModal,
  onGoToMissions,
  onGoToPricing,
}) => {
  const { currentUser, userWallet, userSubscription, submissions, missions, transactions } = useApp();
  const [copiedCode, setCopiedCode] = useState(false);

  const activeSub = userSubscription;
  const userSubmissions = submissions.filter((s) => s.userId === currentUser.id);
  const userTransactions = transactions.filter((t) => t.userId === currentUser.id);
  const availableMissionsCount = missions.filter((m) => m.isActive).length;

  const copyReferralCode = () => {
    navigator.clipboard.writeText(currentUser.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* En-tête du profil (exactement selon le prompt et enrichi) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 border-2 border-emerald-400/50 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-emerald-950/50">
            {currentUser.fullName.charAt(0) || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentUser.fullName}
              </h1>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-semibold border border-slate-700">
                {currentUser.country === 'TG'
                  ? '🇹🇬 Togo'
                  : currentUser.country === 'CI'
                  ? '🇨🇮 Côte d’Ivoire'
                  : currentUser.country === 'BJ'
                  ? '🇧🇯 Bénin'
                  : currentUser.country === 'SN'
                  ? '🇸🇳 Sénégal'
                  : currentUser.country}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 flex flex-wrap items-center gap-2">
              <span>{currentUser.email}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                Réf :{' '}
                <span className="text-emerald-400 font-mono font-bold">
                  {currentUser.referralCode}
                </span>
                <button
                  onClick={copyReferralCode}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-emerald-300 transition"
                  title="Copier mon code"
                >
                  {copiedCode ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col md:items-end justify-center bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            Formule d'abonnement
          </span>
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className={`px-3 py-1 text-xs sm:text-sm font-extrabold rounded-full border ${
                activeSub?.plan === 'PREMIUM'
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  : activeSub?.plan === 'STARTER'
                  ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                  : activeSub?.plan === 'BUSINESS'
                  ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}
            >
              {activeSub ? activeSub.plan : 'GRATUIT (FREE)'}
            </span>
            <button
              onClick={onGoToPricing}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
            >
              Changer
            </button>
          </div>
          {activeSub?.expiresAt ? (
            <span className="text-[11px] text-slate-400 mt-1">
              Expire le {new Date(activeSub.expiresAt).toLocaleDateString('fr-FR')}
            </span>
          ) : (
            <span className="text-[11px] text-slate-500 mt-1">Accès découverte limité</span>
          )}
        </div>
      </div>

      {/* Règle d'or de rappel */}
      <div className="px-5 py-3 rounded-xl bg-slate-900/60 border border-emerald-500/20 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-white">Règle d'or :</strong> Vos gains disponibles restent
            toujours retirables par Mobile Money, quelle que soit la date d'expiration de votre formule.
          </span>
        </div>
        <button
          onClick={onOpenWithdrawModal}
          className="text-emerald-400 font-bold hover:underline shrink-0 ml-2"
        >
          Retirer maintenant &rarr;
        </button>
      </div>

      {/* Métriques du portefeuille & Récompenses (4 colonnes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Solde disponible */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Solde disponible
              </p>
              <h3 className="text-3xl font-black text-white mt-2">
                {userWallet.availableBalance.toLocaleString('fr-FR')}{' '}
                <span className="text-emerald-400 text-lg">FCFA</span>
              </h3>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={onOpenWithdrawModal}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              Demander un retrait <ArrowUpRight className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-slate-500">Min 1 000 FCFA</span>
          </div>
        </div>

        {/* Solde en cours d'examen */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                En cours d'examen
              </p>
              <h3 className="text-3xl font-black text-white mt-2">
                {userWallet.pendingBalance.toLocaleString('fr-FR')}{' '}
                <span className="text-amber-400 text-lg">FCFA</span>
              </h3>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-5 pt-3 border-t border-slate-800/80">
            Crédité dès validation par l'annonceur
          </p>
        </div>

        {/* Gains cumulés */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Gains cumulés
              </p>
              <h3 className="text-3xl font-black text-white mt-2">
                {userWallet.totalEarned.toLocaleString('fr-FR')}{' '}
                <span className="text-blue-400 text-lg">FCFA</span>
              </h3>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
              <Award className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-5 pt-3 border-t border-slate-800/80">
            Cumul vérifié des missions approuvées
          </p>
        </div>

        {/* Missions disponibles */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Missions disponibles
              </p>
              <h3 className="text-3xl font-black text-white mt-2">{availableMissionsCount}</h3>
            </div>
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-800/80">
            <button
              onClick={onGoToMissions}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300"
            >
              Explorer le catalogue <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={onOpenWithdrawModal}
          className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 flex items-center justify-between transition group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">Retirer par Mobile Money</div>
              <div className="text-[11px] text-emerald-100 font-normal">
                TMoney, Flooz, Wave, Orange, MTN
              </div>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
        </button>

        <button
          onClick={onGoToMissions}
          className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-bold text-sm flex items-center justify-between transition group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <CheckCircle className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">Accomplir des Missions</div>
              <div className="text-[11px] text-slate-400 font-normal">
                Gagnez jusqu'à 5 000 FCFA par tâche
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition" />
        </button>

        <button
          onClick={onOpenReferralModal}
          className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-bold text-sm flex items-center justify-between transition group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-xl">
              <Share2 className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">Programme de Parrainage</div>
              <div className="text-[11px] text-slate-400 font-normal">
                10% de commission sur chaque abonné
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition" />
        </button>
      </div>

      {/* Dernières activités (Missions soumises) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Mes Activités & Soumissions récentes
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Suivez l'état d'avancement de vos vérifications de preuves
            </p>
          </div>
          <button
            onClick={onGoToMissions}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
          >
            Nouvelle mission &rarr;
          </button>
        </div>

        <div className="divide-y divide-slate-800/80">
          {userSubmissions.length > 0 ? (
            userSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-850/30 px-3 rounded-xl transition"
              >
                <div className="space-y-1">
                  <p className="font-bold text-white text-sm sm:text-base">{sub.missionTitle}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="text-emerald-400 font-semibold">
                      +{sub.rewardAmount.toLocaleString('fr-FR')} FCFA
                    </span>
                    <span>•</span>
                    <span>
                      Soumis le{' '}
                      {sub.submittedAt
                        ? new Date(sub.submittedAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'Récemment'}
                    </span>
                  </div>
                  {sub.proofData && (
                    <p className="text-xs text-slate-500 italic max-w-xl truncate">
                      Preuve : {sub.proofData}
                    </p>
                  )}
                  {sub.adminNotes && (
                    <p className="text-xs text-slate-300 bg-slate-800/70 px-2 py-1 rounded inline-block">
                      Remarque : {sub.adminNotes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                      sub.status === 'APPROVED'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : sub.status === 'REJECTED'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                        : sub.status === 'IN_REVIEW'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {sub.status === 'APPROVED'
                      ? 'APPROUVÉ & PAYÉ'
                      : sub.status === 'REJECTED'
                      ? 'REJETÉ'
                      : sub.status === 'IN_REVIEW'
                      ? 'EN COURS D’EXAMEN'
                      : 'SOUMIS'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <p className="text-slate-400 text-sm">
                Vous n'avez pas encore accompli de mission.
              </p>
              <button
                onClick={onGoToMissions}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
              >
                Commencer ma première mission
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Registre des Transactions Comptables */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Historique des Transactions & Rémunérations
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Traçabilité comptable inviolable avec identifiant de référence
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 uppercase font-semibold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Référence</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Montant</th>
                <th className="py-3 px-4">Frais</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {userTransactions.length > 0 ? (
                userTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-850/40">
                    <td className="py-3 px-4 font-mono font-semibold text-slate-300">
                      {tx.reference}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          tx.type === 'MISSION_REWARD'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : tx.type === 'WITHDRAWAL'
                            ? 'bg-amber-500/20 text-amber-300'
                            : tx.type === 'REFERRAL_COMMISSION'
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate text-white">{tx.description}</td>
                    <td className="py-3 px-4 font-bold text-white">
                      {tx.type === 'WITHDRAWAL' ? '-' : '+'}
                      {tx.amount.toLocaleString('fr-FR')} FCFA
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {tx.fee > 0 ? `${tx.fee.toLocaleString('fr-FR')} FCFA` : '0 FCFA'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          tx.status === 'COMPLETED'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : tx.status === 'PENDING'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {new Date(tx.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-slate-500">
                    Aucune transaction comptable enregistrée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
