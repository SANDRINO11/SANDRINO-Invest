import React from 'react';
import {
  Smartphone,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Award,
  Zap,
  TrendingUp,
  CreditCard,
  Briefcase,
  PlayCircle,
  FileCheck2,
} from 'lucide-react';
import { MissionCategory } from '../types';

interface LandingPageProps {
  onExploreMissions: (category?: MissionCategory) => void;
  onExplorePricing: () => void;
  onGoToDashboard: () => void;
  onGoToCompany: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExploreMissions,
  onExplorePricing,
  onGoToDashboard,
  onGoToCompany,
}) => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-28">
        {/* Glow gradients in background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-600/20 via-teal-500/15 to-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-lg shadow-emerald-950/30">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Paiements instantanés Mobile Money (TMoney, Flooz, Wave, Orange, MTN)</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Monétisez votre temps en ligne.{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              Rémunérations directes en Afrique.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Testez des applications mobiles africaines, répondez à des sondages d’opinion, laissez
            des avis vérifiés et recevez vos FCFA sur votre compte Mobile Money en quelques minutes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onExploreMissions()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-900/40 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              <span>Accéder aux Missions Rémunérées</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onGoToCompany}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-base transition flex items-center justify-center gap-2"
            >
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <span>Vous êtes une Entreprise ?</span>
            </button>
          </div>

          {/* Mobile Money Operators Banner */}
          <div className="pt-8 border-t border-slate-800/80 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-4">
              Passerelle de retrait & versement 100% compatible avec vos opérateurs locaux
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-bold text-slate-300">
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-yellow-500/30 text-yellow-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400" /> TMoney Togo
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-blue-500/30 text-blue-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" /> Moov Flooz (TG / BJ)
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-sky-400/30 text-sky-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" /> Wave (CI / SN)
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-orange-500/30 text-orange-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-400" /> Orange Money (CI / SN)
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-400/30 text-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> MTN MoMo (BJ / CI)
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> LeekPay Gateway
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm">
          <div className="p-4 text-center">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">48,500,000+</div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">FCFA Reversés aux membres</p>
          </div>
          <div className="p-4 text-center border-l border-slate-800">
            <div className="text-3xl sm:text-4xl font-black text-white">12,400+</div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Missions validées</p>
          </div>
          <div className="p-4 text-center border-l border-slate-800">
            <div className="text-3xl sm:text-4xl font-black text-teal-400">&lt; 5 min</div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Délai moyen de retrait</p>
          </div>
          <div className="p-4 text-center border-l border-slate-800">
            <div className="text-3xl sm:text-4xl font-black text-blue-400">6 Pays</div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">TG, BJ, CI, SN, BF, CM</p>
          </div>
        </div>
      </section>

      {/* Golden Guarantee Rule */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Règle d'or de SANDRINO : Votre argent vous appartient
              </h3>
              <p className="text-sm text-slate-300">
                Même si votre formule d’abonnement expire, les retraits d’argent déjà gagné et
                validé restent <span className="text-emerald-400 font-bold">100% autorisés à vie</span>.
                Aucun blocage de vos fonds légitimes.
              </p>
            </div>
          </div>
          <button
            onClick={onExplorePricing}
            className="shrink-0 px-5 py-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-sm font-semibold transition"
          >
            Consulter les Formules
          </button>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Des micro-tâches adaptées à votre quotidien
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Pas besoin de diplôme en informatique : un smartphone et une connexion internet
            suffisent pour commencer à être rémunéré.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => onExploreMissions('APP_TEST')}
            className="p-6 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
              Test d'Applications Mobiles
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Téléchargez des applis de startups africaines (fintechs, livraison, e-commerce),
              vérifiez leur fluidité et partagez une capture d'écran.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>Rémunération : 1 200 à 4 000 FCFA</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          <div
            onClick={() => onExploreMissions('PAID_SURVEY')}
            className="p-6 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
              Sondages d'Opinion Rémunérés
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Donnez votre avis sur des produits de grande consommation, les réseaux télécoms ou vos
              habitudes d'achat en Afrique de l'Ouest.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>Rémunération : 800 à 2 500 FCFA</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          <div
            onClick={() => onExploreMissions('PRODUCT_REVIEW')}
            className="p-6 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
              Avis Vérifiés Play Store & Maps
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Laissez des évaluations authentiques et constructives sur les fiches Google My Business
              ou les stores d'applications.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>Rémunération : 1 000 à 3 000 FCFA</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          <div
            onClick={() => onExploreMissions('CONTENT_CREATION')}
            className="p-6 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <PlayCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
              Création TikTok & Réels
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Réalisez de courtes vidéos promotionnelles pour des marques locales et faites grimper
              leur visibilité sur les réseaux sociaux.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>Rémunération : 3 000 à 10 000 FCFA</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          <div
            onClick={() => onExploreMissions('RESEARCH')}
            className="p-6 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
              Recherche Terrain & Points d'intérêt
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Vérifiez la localisation d'une boutique, les horaires d'une pharmacie de garde ou les
              prix d'un marché dans votre ville.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>Rémunération : 2 000 à 6 000 FCFA</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          <div
            onClick={() => onExploreMissions('AD_CAMPAIGN')}
            className="p-6 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
              Partages Statuts WhatsApp & Facebook
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Diffusez des affiches et communiqués officiels sur vos statuts pour générer du bouche-à-oreille
              rémunéré à l'audience.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>Rémunération : 800 à 2 000 FCFA</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </section>

      {/* How it works 3-step timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
            Processus Simple & Sécurisé
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Comment fonctionne SANDRINO en 3 étapes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl relative">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-lg mb-4">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Sélectionnez une mission</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Consultez le catalogue de missions ouvertes pour votre pays (Togo, Bénin, Côte d'Ivoire, etc.).
              Vérifiez la consigne et le montant de la rémunération en FCFA.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl relative">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-lg mb-4">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Accomplissez la tâche & Soumettez</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Suivez les instructions pas à pas. Téléversez votre preuve (capture d'écran, lien web ou code
              de confirmation) directement sur la plateforme.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl relative">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-lg mb-4">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Retirez vos FCFA immédiatement</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Dès validation de votre preuve, votre portefeuille est crédité. Demandez un retrait dès
              1 000 FCFA sur TMoney, Flooz, Wave, Orange Money ou MTN MoMo.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ce que disent nos membres en Afrique de l'Ouest
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <p className="text-sm text-slate-300 italic">
              « Je suis étudiant à l’Université de Lomé. En testant des applis et en répondant aux
              sondages entre deux cours, j'ai pu retirer 35 000 FCFA sur mon compte TMoney le mois dernier.
              C’est ultra rapide et fiable ! »
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
                K
              </div>
              <div>
                <p className="text-sm font-bold text-white">Kokou Mensah</p>
                <p className="text-xs text-slate-400">Membre à Lomé, Togo 🇹🇬</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <p className="text-sm text-slate-300 italic">
              « La formule Premium me donne accès à des missions sponsorisées très bien payées.
              Retrait direct sur Wave sans le moindre tracas. Merci à toute l'équipe SANDRINO ! »
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
              <div className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm">
                A
              </div>
              <div>
                <p className="text-sm font-bold text-white">Amina Diallo</p>
                <p className="text-xs text-slate-400">Membre à Abidjan, Côte d'Ivoire 🇨🇮</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <p className="text-sm text-slate-300 italic">
              « En tant qu'agence, nous avons lancé une campagne de 200 avis pour une nouvelle application
              béninoise. En moins de 48h, nous avions 150 retours qualifiés avec captures réelles. »
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
              <div className="w-9 h-9 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-sm">
                S
              </div>
              <div>
                <p className="text-sm font-bold text-white">Sylvain Akpovi</p>
                <p className="text-xs text-slate-400">Responsable Marketing, Cotonou 🇧🇯</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-900/50 via-slate-900 to-blue-950/50 border border-emerald-500/40 text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Prêt à transformer votre temps libre en revenus ?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-base">
            Inscrivez-vous gratuitement dès aujourd’hui et accomplissez votre première mission en
            moins de 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGoToDashboard}
              className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base transition shadow-lg shadow-emerald-950/50"
            >
              Accéder à Mon Tableau de Bord
            </button>
            <button
              onClick={onExplorePricing}
              className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base transition border border-slate-700"
            >
              Découvrir les Abonnements
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
