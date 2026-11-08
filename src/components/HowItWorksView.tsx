import React from 'react';
import {
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  Building2,
  Users,
  Coins,
  ArrowRight,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface HowItWorksViewProps {
  onGoToMissions: () => void;
  onGoToPricing: () => void;
  onGoToCompany: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({
  onGoToMissions,
  onGoToPricing,
  onGoToCompany,
}) => {
  return (
    <div className="space-y-16 pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Guide Complet SANDRINO
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Comment fonctionne la plateforme ?
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          SANDRINO met en relation les startups & entreprises panafricaines cherchant des retours
          qualifiés et des dizaines de milliers de testeurs rémunérés en Mobile Money.
        </p>
      </div>

      {/* For Members */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Pour les Membres (Testeurs)</h2>
            <p className="text-xs text-slate-400">Gagnez des FCFA avec votre téléphone portable</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-black">
              1
            </div>
            <h3 className="text-base font-bold text-white">Choisissez une mission</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consultez le catalogue selon votre pays (Togo, Bénin, Côte d'Ivoire, Sénégal) et votre
              formule d'abonnement.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-black">
              2
            </div>
            <h3 className="text-base font-bold text-white">Accomplissez la tâche</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Téléchargez l'application demandée, répondez au sondage ou laissez votre avis. Prenez
              une capture d'écran claire prouvant l'accomplissement.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-black">
              3
            </div>
            <h3 className="text-base font-bold text-white">Retrait Mobile Money</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dès validation de votre preuve, votre solde est crédité. Retirez dès 1 000 FCFA sur
              votre numéro personnel (TMoney, Flooz, Wave, Orange, MTN).
            </p>
          </div>
        </div>

        {/* Golden rule reminder */}
        <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-4">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          <p className="text-xs text-slate-300">
            <strong className="text-white">Sécurité garantie :</strong> Même si votre abonnement
            expire, vos fonds acquis restent à 100% disponibles au retrait. Aucun solde n'est jamais
            perdu.
          </p>
        </div>
      </div>

      {/* For Companies */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Pour les Entreprises & Startups</h2>
            <p className="text-xs text-slate-400">Collectez des feedbacks et de la visibilité qualifiée</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-black">
              1
            </div>
            <h3 className="text-base font-bold text-white">Création de Campagne</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fixez votre enveloppe budgétaire. La plateforme applique une commission transparente de
              15% pour couvrir la gestion et les vérifications.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-black">
              2
            </div>
            <h3 className="text-base font-bold text-white">Ciblage Précis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ciblez des utilisateurs par pays (ex: résidents à Lomé, Cotonou ou Abidjan) et par
              formule d'expérience (Starter, Premium, VIP).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-black">
              3
            </div>
            <h3 className="text-base font-bold text-white">Validation des Preuves</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vérifiez les captures d'écran et avis directement depuis votre tableau de bord. Les
              membres ne sont payés qu'après votre approbation.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onGoToCompany}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-2"
          >
            <span>Accéder à l'Espace Entreprise</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white text-center">Questions fréquentes (FAQ)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white">Quel est le montant minimum de retrait ?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Le seuil minimum est de 1 000 FCFA. Les frais de transfert opérateur sont de 2%.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white">Quels opérateurs sont acceptés ?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              TMoney Togo, Moov Flooz (Togo & Bénin), Wave (CI & Sénégal), Orange Money, MTN MoMo et
              LeekPay.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white">Combien de temps prend un virement ?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Les décaissements Mobile Money sont généralement traités entre 3 et 15 minutes après
              approbation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white">Comment fonctionne le parrainage ?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vous touchez 10% de commission sur chaque souscription à une formule payante réalisée
              par vos filleuls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
