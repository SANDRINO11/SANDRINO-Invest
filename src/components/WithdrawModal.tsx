import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MobileMoneyProvider } from '../types';
import {
  Wallet,
  X,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Info,
} from 'lucide-react';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OPERATORS: Array<{
  id: MobileMoneyProvider;
  name: string;
  country: string;
  color: string;
  prefix: string;
}> = [
  { id: 'TMONEY', name: 'TMoney', country: 'Togo (TG)', color: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300', prefix: '+228' },
  { id: 'FLOOZ', name: 'Moov Flooz', country: 'Togo & Bénin', color: 'border-blue-500/50 bg-blue-500/10 text-blue-300', prefix: '+228' },
  { id: 'WAVE', name: 'Wave Money', country: 'CI & Sénégal', color: 'border-sky-500/50 bg-sky-500/10 text-sky-300', prefix: '+225' },
  { id: 'ORANGE_MONEY', name: 'Orange Money', country: 'CI & Sénégal', color: 'border-orange-500/50 bg-orange-500/10 text-orange-300', prefix: '+225' },
  { id: 'MTN_MOMO', name: 'MTN MoMo', country: 'Bénin & CI', color: 'border-amber-400/50 bg-amber-400/10 text-amber-300', prefix: '+229' },
  { id: 'LEEKPAY', name: 'LeekPay Express', country: 'Pan-Afrique', color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300', prefix: '+228' },
];

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose }) => {
  const { userWallet, currentUser, requestWithdrawal } = useApp();

  const [selectedProvider, setSelectedProvider] = useState<MobileMoneyProvider>('TMONEY');
  const [amount, setAmount] = useState<number>(userWallet.availableBalance >= 5000 ? 5000 : userWallet.availableBalance);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phone || '+228 90 12 34 56');
  const [accountName, setAccountName] = useState(currentUser.fullName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentBal = userWallet.availableBalance;
  const numAmount = Number(amount) || 0;
  const feeRate = 0.02; // 2% frais de traitement
  const fee = Math.round(numAmount * feeRate);
  const netAmount = Math.max(0, numAmount - fee);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (numAmount < 1000) {
      setErrorMsg('Le montant minimum de retrait est de 1 000 FCFA.');
      return;
    }

    if (numAmount > currentBal) {
      setErrorMsg('Solde disponible insuffisant pour ce montant.');
      return;
    }

    if (!phoneNumber.trim()) {
      setErrorMsg('Veuillez renseigner un numéro de téléphone Mobile Money valide.');
      return;
    }

    setIsSubmitting(true);
    const result = await requestWithdrawal(numAmount, selectedProvider, phoneNumber, accountName);
    setIsSubmitting(false);

    if (result.success) {
      onClose();
    } else if (result.error) {
      setErrorMsg(result.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Retrait Mobile Money</h3>
              <p className="text-xs text-slate-400">Transfert direct et sécurisé vers votre compte</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Available Balance info card */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Solde disponible immédiat
            </span>
            <div className="text-2xl font-black text-white mt-0.5">
              {currentBal.toLocaleString('fr-FR')}{' '}
              <span className="text-emerald-400 text-sm">FCFA</span>
            </div>
          </div>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-bold border border-emerald-500/20">
            Retrait garanti
          </span>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleWithdraw} className="space-y-4">
          {/* Operator Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              1. Choisissez votre opérateur Mobile Money
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {OPERATORS.map((op) => {
                const isSelected = selectedProvider === op.id;
                return (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => setSelectedProvider(op.id)}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/10 shadow-sm'
                        : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs font-bold text-white">{op.name}</span>
                    <span className="text-[10px] text-slate-400 mt-1">{op.country}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                2. Montant à retirer (FCFA)
              </label>
              <button
                type="button"
                onClick={() => setAmount(currentBal)}
                className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300"
              >
                Tout retirer ({currentBal.toLocaleString('fr-FR')} F)
              </button>
            </div>
            <div className="relative">
              <input
                type="number"
                min={1000}
                max={currentBal}
                step={500}
                required
                value={amount}
                onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-emerald-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                FCFA
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Seuil minimum imposé : 1 000 FCFA</p>
          </div>

          {/* Fee & Net Amount Calculation Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Montant brut débité :</span>
              <span className="font-semibold text-white">{numAmount.toLocaleString('fr-FR')} FCFA</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Frais de transfert opérateur (2%) :</span>
              <span className="text-amber-400">-{fee.toLocaleString('fr-FR')} FCFA</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm">
              <span className="font-bold text-white">Net crédité sur votre compte :</span>
              <span className="text-base font-black text-emerald-400">
                {netAmount.toLocaleString('fr-FR')} FCFA
              </span>
            </div>
          </div>

          {/* Phone & Beneficiary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Numéro Mobile Money :</label>
              <input
                type="text"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+228 90 12 34 56"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nom du titulaire :</label>
              <input
                type="text"
                required
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Ex: Kokou Mensah"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting || currentBal < 1000 || numAmount < 1000}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg shadow-emerald-950/50 transition flex items-center gap-2"
            >
              {isSubmitting ? 'Traitement...' : 'Confirmer le retrait'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
