import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mission, MissionCategory, PlanType } from '../types';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Coins,
  Lock,
  ArrowRight,
  X,
  Upload,
  Link as LinkIcon,
  AlertTriangle,
  Sparkles,
  Smartphone,
  FileCheck2,
  Star,
  PlayCircle,
  TrendingUp,
  Zap,
} from 'lucide-react';

interface MissionsCatalogProps {
  initialCategory?: MissionCategory;
  onGoToPricing: () => void;
}

const CATEGORY_LABELS: Record<MissionCategory, { label: string; icon: any }> = {
  APP_TEST: { label: "Test d'Apps", icon: Smartphone },
  PAID_SURVEY: { label: 'Sondages', icon: FileCheck2 },
  PRODUCT_REVIEW: { label: 'Avis Vérifiés', icon: Star },
  CONTENT_CREATION: { label: 'Création Contenu', icon: PlayCircle },
  DIGITAL_SERVICE: { label: 'Services Digitaux', icon: Zap },
  RESEARCH: { label: 'Recherche Terrain', icon: TrendingUp },
  AD_CAMPAIGN: { label: 'Partages Publicitaires', icon: Sparkles },
};

export const MissionsCatalog: React.FC<MissionsCatalogProps> = ({
  initialCategory,
  onGoToPricing,
}) => {
  const { missions, submissions, currentUser, userSubscription, submitMissionProof } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'ALL');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMissionModal, setActiveMissionModal] = useState<Mission | null>(null);

  // Form state inside modal
  const [proofText, setProofText] = useState('');
  const [proofUrl, setProofUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const userPlan = userSubscription?.plan || 'FREE';

  const planHierarchy: Record<PlanType, number> = {
    FREE: 0,
    STARTER: 1,
    PREMIUM: 2,
    BUSINESS: 3,
  };

  const isEligibleForMission = (requiredPlan: PlanType) => {
    return planHierarchy[userPlan] >= planHierarchy[requiredPlan];
  };

  // Filtered list
  const filteredMissions = missions.filter((m) => {
    if (!m.isActive) return false;
    if (selectedCategory !== 'ALL' && m.category !== selectedCategory) return false;
    if (selectedCountry !== 'ALL' && m.targetCountry !== 'ALL' && m.targetCountry !== selectedCountry)
      return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchDesc = m.description.toLowerCase().includes(q);
      const matchComp = m.companyName?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchComp) return false;
    }
    return true;
  });

  const handleOpenModal = (mission: Mission) => {
    setActiveMissionModal(mission);
    setProofText('');
    setProofUrl('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMissionModal) return;
    if (!proofText.trim() && !proofUrl.trim()) return;

    setSubmitting(true);
    const combinedProof = [
      proofText.trim(),
      proofUrl.trim() ? `Lien / Capture : ${proofUrl.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    await submitMissionProof(activeMissionModal.id, combinedProof);
    setSubmitting(false);
    setActiveMissionModal(null);
  };

  // Check if current user has submitted this mission
  const hasUserSubmitted = (missionId: string) => {
    return submissions.find((s) => s.missionId === missionId && s.userId === currentUser.id);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">Catalogue des Missions</h1>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {filteredMissions.length} disponibles
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Sélectionnez une mission adaptée à votre pays, suivez les instructions et gagnez des FCFA
            instantanément.
          </p>
        </div>

        {/* Current plan status pill */}
        <div className="flex items-center gap-2 bg-slate-950/80 px-4 py-2 rounded-2xl border border-slate-800 self-start md:self-auto">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <div className="text-xs">
            <span className="text-slate-400">Votre Formule : </span>
            <span className="font-extrabold text-white">{userPlan}</span>
          </div>
          {userPlan !== 'BUSINESS' && (
            <button
              onClick={onGoToPricing}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 ml-2"
            >
              Surclasser &rarr;
            </button>
          )}
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="space-y-4">
        {/* Search & Country Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par mot-clé (ex: Gozem, Djamo, sondage, TikTok, test)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 shrink-0">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 font-semibold">Pays :</span>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">
                🌍 Tous les pays
              </option>
              <option value="TG" className="bg-slate-900">
                🇹🇬 Togo (TG)
              </option>
              <option value="BJ" className="bg-slate-900">
                🇧🇯 Bénin (BJ)
              </option>
              <option value="CI" className="bg-slate-900">
                🇨🇮 Côte d'Ivoire (CI)
              </option>
              <option value="SN" className="bg-slate-900">
                🇸🇳 Sénégal (SN)
              </option>
            </select>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3.5 py-2 rounded-xl shrink-0 transition ${
              selectedCategory === 'ALL'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800'
            }`}
          >
            Toutes les catégories
          </button>
          {(Object.keys(CATEGORY_LABELS) as MissionCategory[]).map((cat) => {
            const Icon = CATEGORY_LABELS[cat].icon;
            const isSel = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl shrink-0 flex items-center gap-1.5 transition ${
                  isSel
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{CATEGORY_LABELS[cat].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMissions.map((mission) => {
          const eligible = isEligibleForMission(mission.requiredPlan);
          const userSub = hasUserSubmitted(mission.id);
          const percent = Math.min(
            100,
            Math.round((mission.currentSubmissions / mission.maxSubmissions) * 100)
          );

          return (
            <div
              key={mission.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-200 relative overflow-hidden group ${
                userSub
                  ? 'bg-slate-900/90 border-emerald-500/40'
                  : !eligible
                  ? 'bg-slate-900/60 border-slate-800 opacity-90'
                  : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/20'
              }`}
            >
              {/* Top Meta info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      {CATEGORY_LABELS[mission.category]?.label || mission.category}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {mission.targetCountry === 'ALL'
                        ? '🌍 Pan-Afrique'
                        : mission.targetCountry === 'TG'
                        ? '🇹🇬 Togo'
                        : mission.targetCountry === 'CI'
                        ? '🇨🇮 Côte d’Ivoire'
                        : mission.targetCountry === 'BJ'
                        ? '🇧🇯 Bénin'
                        : mission.targetCountry === 'SN'
                        ? '🇸🇳 Sénégal'
                        : mission.targetCountry}
                    </span>
                  </div>

                  {/* Required Plan badge */}
                  <span
                    className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded border ${
                      mission.requiredPlan === 'FREE'
                        ? 'bg-slate-800 text-slate-300 border-slate-700'
                        : mission.requiredPlan === 'STARTER'
                        ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                        : mission.requiredPlan === 'PREMIUM'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                    }`}
                  >
                    Formule {mission.requiredPlan}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition line-clamp-2">
                    {mission.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    Annonceur :{' '}
                    <span className="text-slate-200">{mission.companyName || 'Partenaire Certifié'}</span>
                  </p>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {mission.description}
                  </p>
                </div>
              </div>

              {/* Progress & Reward footer */}
              <div className="pt-6 space-y-4">
                {/* Progress bar of slots */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                    <span>
                      Places : {mission.currentSubmissions} / {mission.maxSubmissions}
                    </span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Reward & Button */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Rémunération
                    </span>
                    <span className="text-lg font-black text-emerald-400">
                      {mission.rewardPerUser.toLocaleString('fr-FR')}{' '}
                      <span className="text-xs text-white">FCFA</span>
                    </span>
                  </div>

                  {userSub ? (
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                        userSub.status === 'APPROVED'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {userSub.status === 'APPROVED' ? 'Rémunéré' : 'Preuve soumise'}
                    </span>
                  ) : !eligible ? (
                    <button
                      onClick={onGoToPricing}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Débloquer ({mission.requiredPlan})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenModal(mission)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 hover:scale-105 active:scale-95 transition flex items-center gap-1.5"
                    >
                      <span>Participer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMissions.length === 0 && (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Aucune mission ne correspond à vos filtres</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Essayez de réinitialiser la recherche ou de changer de pays pour voir plus d'opportunités.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedCountry('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold transition"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* Interactive Modal: Mission Details & Proof Submission */}
      {activeMissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  {CATEGORY_LABELS[activeMissionModal.category]?.label}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {activeMissionModal.title}
                </h2>
                <p className="text-xs text-slate-400">
                  Proposée par :{' '}
                  <span className="text-slate-200 font-semibold">
                    {activeMissionModal.companyName}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setActiveMissionModal(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Compensation summary card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-850 to-slate-850 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">Récompense garantie :</span>
                <div className="text-2xl font-black text-emerald-400">
                  {activeMissionModal.rewardPerUser.toLocaleString('fr-FR')} FCFA
                </div>
              </div>
              <div className="text-right text-xs text-slate-400">
                <div>Date limite : {new Date(activeMissionModal.deadline).toLocaleDateString('fr-FR')}</div>
                <div className="text-slate-300 font-semibold">
                  Disponibilité : {activeMissionModal.maxSubmissions - activeMissionModal.currentSubmissions} places
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Instructions détaillées à respecter :
              </h4>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                {activeMissionModal.instructions}
              </div>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-800">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Transmettre votre preuve d'accomplissement :
              </h4>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Compte-rendu, code de vérification ou explications :
                </label>
                <textarea
                  required
                  rows={3}
                  value={proofText}
                  onChange={(e) => setProofText(e.target.value)}
                  placeholder="Ex: J'ai effectué le test sur l'application Gozem avec succès. Code reçu : QR-2026-TG99. L'application est fluide."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lien vers la capture d'écran, post ou preuve (Postimages, Imgur, Drive, etc.) :</span>
                </label>
                <input
                  type="text"
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  placeholder="https://postimg.cc/mon-capture-d-ecran ou https://vm.tiktok.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Une fois soumise, votre preuve est vérifiée sous 2h à 24h. Le montant de{' '}
                  <strong className="text-emerald-400">
                    {activeMissionModal.rewardPerUser.toLocaleString('fr-FR')} FCFA
                  </strong>{' '}
                  sera automatiquement crédité sur votre solde disponible.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveMissionModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 transition flex items-center gap-2"
                >
                  {submitting ? 'Envoi en cours...' : 'Confirmer et Soumettre ma preuve'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
