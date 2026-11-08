import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlanType, MobileMoneyProvider, PLAN_PRICING, PLAN_FEATURES } from '../types';
import {
  Check,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  HelpCircle,
  Smartphone,
  Lock,
  X,
  Clock,
  Layers,
} from 'lucide-react';

interface PricingPageProps {
  onGoToMissions: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onGoToMissions }) => {
  const { userSubscription, subscribeToPlan, currentUser } = useApp();
  const currentPlan = userSubscription?.plan || 'FREE';

  // Checkout modal
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PlanType | null>(null);
  const [provider, setProvider] = useState<MobileMoneyProvider>('TMONEY');
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phone || '+228 90 12 34 56');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'DETAILS' | 'USSD_PUSH' | 'SUCCESS'>('DETAILS');

  const handleOpenCheckout = (plan: PlanType) => {
    setSelectedPlanForCheckout(plan);
    setStep('DETAILS');
  };

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForCheckout) return;

    if (selectedPlanForCheckout === 'FREE') {
      await subscribeToPlan('FREE', 'LEEKPAY', phoneNumber);
      setSelectedPlanForCheckout(null);
      return;
    }

    // Step 2: Show simulated USSD Push
    setStep('USSD_PUSH');
    setIsProcessing(true);

    setTimeout(async () => {
      await subscribeToPlan(selectedPlanForCheckout, provider, phoneNumber);
      setIsProcessing(false);
      setStep('SUCCESS');
      setTimeout(() => {
        setSelectedPlanForCheckout(null);
      }, 1500);
    }, 2500);
  };

  const plansList: Array<{
    type: PlanType;
    name: string;
    price: number;
    duration: string;
    popular?: boolean;
    recommended?: boolean;
    badge: string;
    features: string[];
    description: string;
  }> = [
    {
      type: 'FREE',
      name: 'Gratuit',
      price: 0,
      duration: 'À vie',
      badge: 'Découverte',
      description: 'Pour explorer la plateforme et tester les premières fonctionnalités.',
      features: [
        'Accès au tableau de bord membre',
        'Consultation du catalogue complet de missions',
        'Missions partenaires en accès libre (sondages gratuits)',
        'Retraits de solde toujours garantis',
      ],
    },
    {
      type: 'STARTER',
      name: 'Starter',
      price: 2500,
      duration: '7 Jours',
      popular: true,
      badge: 'Idéal Débutants',
      description: 'Débloquez les missions quotidiennes régulières et augmentez vos gains.',
      features: [
        'Toutes les options de la formule Gratuite',
        'Missions quotidiennes débloquées',
        'Tests d’applications et enquêtes rémunérées standard',
        'Historique d’activité détaillé & reçu comptable',
        'Support standard par e-mail & Telegram',
      ],
    },
    {
      type: 'PREMIUM',
      name: 'Premium',
      price: 5000,
      duration: '7 Jours',
      recommended: true,
      badge: 'Plus Rentable',
      description: 'Accédez aux missions sponsorisées à haute rémunération et retraits prioritaires.',
      features: [
        'Toutes les options de la formule Starter',
        'Missions sponsorisées exclusives à forte valeur (jusqu’à 5 000 FCFA)',
        'Validation accélérée des preuves (moins de 4h)',
        'Frais de retrait réduits & traitement prioritaire Mobile Money',
        'Notifications SMS / WhatsApp des nouvelles missions VIP',
      ],
    },
    {
      type: 'BUSINESS',
      name: 'Business VIP',
      price: 12000,
      duration: '30 Jours',
      badge: 'Professionnel',
      description: 'Formule illimitée pour les créateurs de contenu, testeurs assidus et leaders réseau.',
      features: [
        'Accès illimité à TOUTES les missions VIP sans restriction',
        'Bonus de parrainage boosté : 10% direct sur tous vos filleuls',
        'Missions de création de contenu TikTok / Réels prioritaires',
        'Accès anticipé aux campagnes publicitaires pan-africaines',
        'Support direct WhatsApp dédié 24h/7j',
      ],
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Formules transparentes sans engagement</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Choisissez la formule adaptée à votre ambition de gains
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Activez votre formule en quelques secondes avec votre compte Mobile Money habituel
          (TMoney, Flooz, Wave, Orange Money, MTN MoMo).
        </p>
      </div>

      {/* Règle d'or Notification Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center gap-5 max-w-4xl mx-auto shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Règle d'or de l'infrastructure SANDRINO
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Même si votre formule d'abonnement expire ou n'est pas renouvelée, vos retraits d'argent
            sur les gains validés{' '}
            <strong className="text-emerald-400">restent impérativement autorisés à vie</strong>.
            Votre portefeuille et vos fonds ne sont jamais confisqués.
          </p>
        </div>
      </div>

      {/* Plans Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plansList.map((plan) => {
          const isCurrent = currentPlan === plan.type;
          return (
            <div
              key={plan.type}
              className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between transition relative ${
                plan.recommended
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/30 border-emerald-500/60 shadow-xl shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                  : plan.popular
                  ? 'bg-slate-900 border-blue-500/40'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                    plan.recommended
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : plan.popular
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {plan.badge}
                </span>

                {isCurrent && (
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Actif
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-black text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 min-h-[32px]">{plan.description}</p>
                <div className="pt-2">
                  <span className="text-3xl font-black text-white">
                    {plan.price.toLocaleString('fr-FR')}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 ml-1">
                    FCFA / {plan.duration}
                  </span>
                </div>
              </div>

              {/* Feature list */}
              <div className="my-6 pt-6 border-t border-slate-800/80 space-y-3 flex-1">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-4">
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs border border-slate-700 cursor-default"
                  >
                    Formule actuellement active
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenCheckout(plan.type)}
                    className={`w-full py-3 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 ${
                      plan.recommended
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50'
                        : 'bg-slate-800 hover:bg-slate-750 text-white border border-slate-700'
                    }`}
                  >
                    <span>{plan.price === 0 ? 'Choisir Gratuit' : `Souscrire avec Mobile Money`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature comparison table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-white">Matrice des privilèges par formule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Fonctionnalité</th>
                <th className="py-3 px-4 text-center">Gratuit</th>
                <th className="py-3 px-4 text-center">Starter</th>
                <th className="py-3 px-4 text-center">Premium</th>
                <th className="py-3 px-4 text-center">Business VIP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Tableau de bord personnel</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Missions quotidiennes standards</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Historique d’activités & reçus</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Missions sponsorisées VIP (3 000+ FCFA)</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Portefeuille & Retraits d’argent validé</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓ (À vie)</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓ (À vie)</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓ (À vie)</td>
                <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓ (À vie)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Commissions de parrainage boostées (10%)</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center text-purple-400 font-bold">✓ (10% Direct)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Support VIP WhatsApp 24/7</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center text-purple-400 font-bold">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedPlanForCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedPlanForCheckout(null)}
              className="absolute top-6 right-6 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {step === 'DETAILS' && (
              <form onSubmit={handleStartPayment} className="space-y-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                    Souscription Sécurisée
                  </span>
                  <h3 className="text-xl font-black text-white mt-2">
                    Formule {selectedPlanForCheckout}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Montant :{' '}
                    <strong className="text-white">
                      {PLAN_PRICING[selectedPlanForCheckout].price.toLocaleString('fr-FR')} FCFA
                    </strong>{' '}
                    pour {PLAN_PRICING[selectedPlanForCheckout].durationDays} jours
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Moyen de paiement Mobile Money :
                  </label>
                  <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value as MobileMoneyProvider)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="TMONEY">TMoney (Togo)</option>
                    <option value="FLOOZ">Moov Flooz (Togo / Bénin)</option>
                    <option value="WAVE">Wave (Côte d'Ivoire / Sénégal)</option>
                    <option value="ORANGE_MONEY">Orange Money (CI / Sénégal)</option>
                    <option value="MTN_MOMO">MTN MoMo (Bénin / CI)</option>
                    <option value="LEEKPAY">LeekPay Global</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Numéro de téléphone du compte :
                  </label>
                  <input
                    type="text"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+228 90 12 34 56"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <p className="text-[11px] text-slate-400">
                    Une invite de validation USSD (Push) sera envoyée sur ce numéro.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Chiffrement bancaire SSL HMAC-SHA256 opéré par LeekPay & les banques centrales régionales.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition flex items-center justify-center gap-2"
                >
                  <span>Payer {PLAN_PRICING[selectedPlanForCheckout].price.toLocaleString('fr-FR')} FCFA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {step === 'USSD_PUSH' && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto animate-pulse">
                  <Smartphone className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white">Validation USSD en cours...</h4>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  Veuillez taper votre code secret Mobile Money sur votre téléphone ({phoneNumber}) pour
                  valider le paiement de {PLAN_PRICING[selectedPlanForCheckout].price.toLocaleString('fr-FR')} FCFA.
                </p>
                <div className="flex justify-center items-center gap-1.5 text-xs text-emerald-400 font-semibold pt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>En attente de confirmation opérateur...</span>
                </div>
              </div>
            )}

            {step === 'SUCCESS' && (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h4 className="text-lg font-black text-white">Paiement Validé !</h4>
                <p className="text-xs text-slate-300">
                  Votre formule {selectedPlanForCheckout} est désormais active. Bonnes missions !
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
