import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Activity,
  Users,
  Search,
  ExternalLink,
  Smartphone,
  RotateCcw,
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    withdrawals,
    processWithdrawalAdmin,
    auditLogs,
    users,
    campaigns,
    transactions,
    resetToDefaultData,
    currentUser,
    switchUser,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'WITHDRAWALS' | 'AUDIT' | 'USERS'>('WITHDRAWALS');
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'REQUESTED');
  const completedWithdrawals = withdrawals.filter((w) => w.status === 'COMPLETED');

  const totalPlatformFees = transactions
    .filter((t) => t.type === 'CAMPAIGN_FUNDING' || t.type === 'WITHDRAWAL')
    .reduce((acc, t) => acc + t.fee, 0);

  const totalRewardsPaid = transactions
    .filter((t) => t.type === 'MISSION_REWARD' && t.status === 'COMPLETED')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalDisbursedMobileMoney = completedWithdrawals.reduce((acc, w) => acc + w.netAmount, 0);

  const handleConfirmReject = async () => {
    if (!rejectId) return;
    await processWithdrawalAdmin(rejectId, 'REJECT', rejectReason || 'Numéro Mobile Money erroné');
    setRejectId(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-red-950/40">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Supervision Centrale SANDRINO
              </h1>
              <span className="text-[11px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-extrabold uppercase">
                Administrateur Root
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Contrôle des flux Mobile Money, trésorerie, conformité et piste d'audit
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          {currentUser.role !== 'ADMIN' && (
            <button
              onClick={() => switchUser('user-admin-1')}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition"
            >
              Passer en Mode Admin
            </button>
          )}
          <button
            onClick={resetToDefaultData}
            className="px-3.5 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
            title="Restaurer les données de démonstration"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser Données</span>
          </button>
        </div>
      </div>

      {/* Global Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Commissions Plateforme
          </p>
          <h3 className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
            {totalPlatformFees.toLocaleString('fr-FR')}{' '}
            <span className="text-sm text-white">FCFA</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-2">15% campagnes + 2% retraits</p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total Décaissé Mobile Money
          </p>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
            {totalDisbursedMobileMoney.toLocaleString('fr-FR')}{' '}
            <span className="text-sm text-blue-400">FCFA</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-2">{completedWithdrawals.length} virements réussis</p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Retraits en Attente
          </p>
          <h3 className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">
            {pendingWithdrawals.length}
          </h3>
          <p className="text-[11px] text-slate-400 mt-2">Validation requise</p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Membres & Entreprises
          </p>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">{users.length}</h3>
          <p className="text-[11px] text-slate-400 mt-2">Comptes inscrits</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('WITHDRAWALS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'WITHDRAWALS'
              ? 'bg-amber-600 text-white'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Décaissements Mobile Money ({pendingWithdrawals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('AUDIT')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'AUDIT'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Journal d'Audit ({auditLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('USERS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'USERS'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Comptes Utilisateurs ({users.length})</span>
        </button>
      </div>

      {/* TAB 1: WITHDRAWALS MANAGEMENT */}
      {activeTab === 'WITHDRAWALS' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                File des demandes de retrait Mobile Money
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Vérifiez et déclenchez l'ordre de virement direct via TMoney, Flooz, Wave, Orange ou MTN
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Référence</th>
                  <th className="py-3 px-4">Membre & Compte</th>
                  <th className="py-3 px-4">Opérateur</th>
                  <th className="py-3 px-4">Brut</th>
                  <th className="py-3 px-4">Frais (2%)</th>
                  <th className="py-3 px-4">Net à verser</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {withdrawals.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-850/40">
                    <td className="py-3 px-4 font-mono font-semibold text-slate-200">
                      {w.reference}
                      {w.providerTxId && (
                        <span className="block text-[10px] text-emerald-400 font-mono">
                          Tx: {w.providerTxId}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{w.userName}</div>
                      <div className="text-[11px] text-slate-400">
                        {w.phoneNumber} ({w.accountName})
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-800 text-slate-200">
                        {w.provider}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {w.amount.toLocaleString('fr-FR')} F
                    </td>
                    <td className="py-3 px-4 text-amber-400">
                      {w.fee.toLocaleString('fr-FR')} F
                    </td>
                    <td className="py-3 px-4 font-black text-emerald-400">
                      {w.netAmount.toLocaleString('fr-FR')} FCFA
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          w.status === 'COMPLETED'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : w.status === 'REJECTED'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {w.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {w.status === 'REQUESTED' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setRejectId(w.id)}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs transition"
                            title="Rejeter et rembourser le solde"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => processWithdrawalAdmin(w.id, 'APPROVE')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Décaisser</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-500">Traité</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: AUDIT LOGS */}
      {activeTab === 'AUDIT' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                Piste d'audit et traçabilité de conformité
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Enregistrement immuable des actions, adresses IP et requêtes financières
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Horodatage</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Ressource</th>
                  <th className="py-3 px-4">Adresse IP</th>
                  <th className="py-3 px-4">Données (Payload)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-850/40">
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString('fr-FR')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-emerald-400">{log.action}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{log.resource}</td>
                    <td className="py-3 px-4 text-slate-400">{log.ipAddress || '127.0.0.1'}</td>
                    <td className="py-3 px-4 text-[11px] text-slate-400 max-w-sm truncate">
                      {log.payload ? JSON.stringify(log.payload) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: USERS LIST */}
      {activeTab === 'USERS' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-bold text-white">Utilisateurs enregistrés</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((u) => (
              <div
                key={u.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-white">{u.fullName}</h4>
                  <p className="text-xs text-slate-400">{u.email} • {u.phone}</p>
                  <p className="text-[11px] text-emerald-400 font-mono mt-1">Code : {u.referralCode}</p>
                </div>
                <div className="text-right space-y-1">
                  <span className="text-[10px] uppercase font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded block">
                    {u.role}
                  </span>
                  <button
                    onClick={() => switchUser(u.id)}
                    className="text-xs text-emerald-400 hover:underline font-semibold"
                  >
                    Prendre la main &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h4 className="text-lg font-bold text-white">Rejeter la demande de retrait</h4>
            <p className="text-xs text-slate-300">
              Le montant débité sera immédiatement recrédité sur le portefeuille disponible du membre.
            </p>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Motif du rejet :</label>
              <textarea
                rows={2}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Ex: Numéro Mobile Money erroné ou non identifié..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setRejectId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                Confirmer le Rejet & Rembourser
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
