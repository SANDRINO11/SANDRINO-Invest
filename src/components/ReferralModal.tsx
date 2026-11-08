import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Share2,
  Copy,
  Check,
  X,
  Users,
  Coins,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, users, transactions } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const referralLink = `https://sandrino.com/register?ref=${currentUser.referralCode}`;
  const myReferrals = users.filter((u) => u.referredById === currentUser.id);
  const myReferralEarnings = transactions
    .filter((t) => t.type === 'REFERRAL_COMMISSION' && t.userId === currentUser.id)
    .reduce((acc, t) => acc + t.amount, 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `Rejoins-moi sur SANDRINO pour gagner de l'argent réel en testant des applis et en répondant à des sondages payés par Mobile Money (TMoney, Flooz, Wave, Orange, MTN) ! Utilise mon code de parrainage : ${currentUser.referralCode} ou inscris-toi ici : ${referralLink}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Programme de Parrainage</h3>
            <p className="text-xs text-slate-400">Gagnez 10% de commission sur chaque filleul</p>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Filleuls inscrits
            </span>
            <div className="text-2xl font-black text-white mt-1">{myReferrals.length}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Commissions perçues
            </span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {myReferralEarnings.toLocaleString('fr-FR')}{' '}
              <span className="text-xs text-white">FCFA</span>
            </div>
          </div>
        </div>

        {/* Referral Link & Code Box */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Votre lien d'invitation unique :
          </label>
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2.5">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="bg-transparent text-xs text-white font-mono flex-1 focus:outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copié !' : 'Copier'}</span>
            </button>
          </div>

          <button
            onClick={shareWhatsApp}
            className="w-full py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Partager directement sur WhatsApp</span>
          </button>
        </div>

        {/* How it works */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 font-bold text-white">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Comment ça fonctionne ?</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Chaque fois qu'un ami s'inscrit avec votre code et souscrit à un abonnement (Starter,
            Premium ou Business), vous recevez immédiatement <strong>10% du montant payé</strong> directement
            sur votre solde disponible, retirable sans condition.
          </p>
        </div>

        {/* Filleuls list */}
        {myReferrals.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-white block">Vos filleuls actifs :</span>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {myReferrals.map((ref) => (
                <div
                  key={ref.id}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-200">{ref.fullName}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Actif ({ref.country})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
