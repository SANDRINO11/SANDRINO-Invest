import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MissionCategory, PlanType } from '../types';
import {
  Building2,
  PlusCircle,
  CheckCircle2,
  XCircle,
  DollarSign,
  TrendingUp,
  FileCheck2,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';

export const CompanyPortal: React.FC = () => {
  const {
    companyProfile,
    campaigns,
    missions,
    submissions,
    createCampaign,
    createMission,
    reviewSubmission,
    currentUser,
    switchUser,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'REVIEW' | 'CAMPAIGNS' | 'NEW_CAMPAIGN' | 'NEW_MISSION'>('REVIEW');

  // Form states: New Campaign
  const [campTitle, setCampTitle] = useState('');
  const [campBudget, setCampBudget] = useState(250000);
  const [creatingCamp, setCreatingCamp] = useState(false);

  // Form states: New Mission
  const [misTitle, setMisTitle] = useState('');
  const [misDesc, setMisDesc] = useState('');
  const [misInstructions, setMisInstructions] = useState('');
  const [misCategory, setMisCategory] = useState<MissionCategory>('APP_TEST');
  const [misReward, setMisReward] = useState(1500);
  const [misMaxSubm, setMisMaxSubm] = useState(100);
  const [misCountry, setMisCountry] = useState('ALL');
  const [misPlan, setMisPlan] = useState<PlanType>('STARTER');
  const [misCampaignId, setMisCampaignId] = useState(campaigns[0]?.id || '');
  const [creatingMis, setCreatingMis] = useState(false);

  // Review modal notes
  const [rejectNote, setRejectNote] = useState('');
  const [selectedSubmForAction, setSelectedSubmForAction] = useState<string | null>(null);

  const pendingSubmissions = submissions.filter(
    (s) => s.status === 'SUBMITTED' || s.status === 'IN_REVIEW'
  );

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campTitle.trim() || campBudget <= 0) return;
    setCreatingCamp(true);
    await createCampaign(campTitle.trim(), campBudget);
    setCreatingCamp(false);
    setCampTitle('');
    setActiveTab('CAMPAIGNS');
  };

  const handleCreateMission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!misTitle.trim() || !misDesc.trim() || !misInstructions.trim()) return;

    setCreatingMis(true);
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 14);

    await createMission({
      campaignId: misCampaignId,
      title: misTitle,
      description: misDesc,
      instructions: misInstructions,
      category: misCategory,
      rewardPerUser: misReward,
      maxSubmissions: misMaxSubm,
      targetCountry: misCountry,
      requiredPlan: misPlan,
      deadline: deadline.toISOString(),
      isActive: true,
    });

    setCreatingMis(false);
    setMisTitle('');
    setMisDesc('');
    setMisInstructions('');
    setActiveTab('CAMPAIGNS');
  };

  const totalFundedBudget = campaigns.reduce((acc, c) => acc + c.totalBudget, 0);
  const totalSpentBudget = campaigns.reduce((acc, c) => acc + c.spentBudget, 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Profile */}
      <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-950/40">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {companyProfile.companyName}
              </h1>
              {companyProfile.isVerified && (
                <span className="text-[11px] bg-blue-500/15 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Entreprise Vérifiée
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              RCCM : {companyProfile.registrationNum} | NIF : {companyProfile.taxId} | Siège :{' '}
              {companyProfile.address}
            </p>
          </div>
        </div>

        {/* Role Helper */}
        {currentUser.role !== 'COMPANY' && (
          <button
            onClick={() => switchUser('user-company-1')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-2 self-start md:self-auto"
          >
            <span>Passer en Mode Démo Entreprise</span>
          </button>
        )}
      </div>

      {/* Metrics of Campaigns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Budget Total Engagé
          </p>
          <h3 className="text-3xl font-black text-white mt-2">
            {totalFundedBudget.toLocaleString('fr-FR')}{' '}
            <span className="text-blue-400 text-base">FCFA</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-2">Frais plateforme SANDRINO 15% inclus</p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Budget Décaissé aux Testeurs
          </p>
          <h3 className="text-3xl font-black text-white mt-2">
            {totalSpentBudget.toLocaleString('fr-FR')}{' '}
            <span className="text-emerald-400 text-base">FCFA</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-2">
            Taux de consommation :{' '}
            {totalFundedBudget > 0
              ? Math.round((totalSpentBudget / totalFundedBudget) * 100)
              : 0}
            %
          </p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Preuves en Attente d'Examen
          </p>
          <h3 className="text-3xl font-black text-white mt-2">{pendingSubmissions.length}</h3>
          <p className="text-[11px] text-amber-400 mt-2">À valider pour créditer les membres</p>
        </div>
      </div>

      {/* Navigation sub-tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('REVIEW')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'REVIEW'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Vérification des Preuves ({pendingSubmissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('CAMPAIGNS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'CAMPAIGNS'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Mes Campagnes & Missions</span>
        </button>

        <button
          onClick={() => setActiveTab('NEW_MISSION')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'NEW_MISSION'
              ? 'bg-purple-600 text-white'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Créer une Mission</span>
        </button>

        <button
          onClick={() => setActiveTab('NEW_CAMPAIGN')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'NEW_CAMPAIGN'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Financer une Campagne (+15%)</span>
        </button>
      </div>

      {/* TAB 1: REVIEW SUBMISSIONS QUEUE */}
      {activeTab === 'REVIEW' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                File de validation des preuves de travail
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Validez pour exécuter le crédit atomique du portefeuille du membre (via WalletService)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {pendingSubmissions.length > 0 ? (
              pendingSubmissions.map((subm) => (
                <div
                  key={subm.id}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 hover:border-slate-700 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white">{subm.missionTitle}</h4>
                      <p className="text-xs text-slate-400">
                        Soumis par : <strong className="text-slate-200">{subm.userName}</strong> (
                        {subm.userPhone}) • Date :{' '}
                        {subm.submittedAt
                          ? new Date(subm.submittedAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Récemment'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-emerald-400">
                        {subm.rewardAmount.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>

                  {/* Proof data */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Preuve fournie par le membre :
                    </span>
                    <p className="whitespace-pre-line leading-relaxed">{subm.proofData}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() =>
                        reviewSubmission(subm.id, false, 'Preuve insuffisante ou capture floue.')
                      }
                      className="px-4 py-2 rounded-xl bg-slate-850 hover:bg-red-950/40 text-red-300 border border-red-500/20 text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Rejeter</span>
                    </button>

                    <button
                      onClick={() => reviewSubmission(subm.id, true, 'Preuve vérifiée et conforme.')}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 transition flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approuver & Rémunérer ({subm.rewardAmount.toLocaleString('fr-FR')} F)</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Toutes les soumissions sont à jour !</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Aucune preuve en attente d'approbation pour vos missions actuellement.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CAMPAIGNS LIST */}
      {activeTab === 'CAMPAIGNS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((camp) => {
              const campMissions = missions.filter((m) => m.campaignId === camp.id);
              const percent = Math.min(
                100,
                Math.round((camp.spentBudget / camp.totalBudget) * 100)
              );

              return (
                <div
                  key={camp.id}
                  className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        Campagne Active
                      </span>
                      <h3 className="text-lg font-black text-white mt-1.5">{camp.title}</h3>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Budget consommé :</span>
                      <span className="font-bold text-white">
                        {camp.spentBudget.toLocaleString('fr-FR')} /{' '}
                        {camp.totalBudget.toLocaleString('fr-FR')} FCFA ({percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-3">
                    <span className="text-xs font-bold text-slate-300 block mb-2">
                      Missions associées ({campMissions.length}) :
                    </span>
                    <div className="space-y-1.5">
                      {campMissions.map((m) => (
                        <div
                          key={m.id}
                          className="p-2.5 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-between text-xs"
                        >
                          <span className="font-semibold text-slate-200 truncate max-w-[200px]">
                            {m.title}
                          </span>
                          <span className="font-bold text-emerald-400 shrink-0">
                            {m.rewardPerUser.toLocaleString('fr-FR')} FCFA
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: CREATE MISSION */}
      {activeTab === 'NEW_MISSION' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl">
          <h3 className="text-xl font-black text-white">Créer une nouvelle micro-mission</h3>
          <p className="text-xs text-slate-400 mt-1 mb-6">
            Définissez les consignes et la rémunération versée à chaque participant.
          </p>

          <form onSubmit={handleCreateMission} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Rattacher à la campagne :</label>
              <select
                value={misCampaignId}
                onChange={(e) => setMisCampaignId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} (Solde restant : {(c.totalBudget - c.spentBudget).toLocaleString('fr-FR')} F)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Titre de la mission :</label>
              <input
                type="text"
                required
                value={misTitle}
                onChange={(e) => setMisTitle(e.target.value)}
                placeholder="Ex: Test de chargement rapide de la page panier sur Chrome mobile"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Catégorie :</label>
                <select
                  value={misCategory}
                  onChange={(e) => setMisCategory(e.target.value as MissionCategory)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="APP_TEST">Test d'Application</option>
                  <option value="PAID_SURVEY">Sondage Rémunéré</option>
                  <option value="PRODUCT_REVIEW">Avis Produit / Store</option>
                  <option value="CONTENT_CREATION">Création de Contenu</option>
                  <option value="RESEARCH">Recherche Terrain</option>
                  <option value="AD_CAMPAIGN">Campagne Publicitaire</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Pays cible :</label>
                <select
                  value={misCountry}
                  onChange={(e) => setMisCountry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="ALL">Tous les pays</option>
                  <option value="TG">Togo</option>
                  <option value="BJ">Bénin</option>
                  <option value="CI">Côte d'Ivoire</option>
                  <option value="SN">Sénégal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Rémunération par membre :</label>
                <input
                  type="number"
                  min={500}
                  step={100}
                  required
                  value={misReward}
                  onChange={(e) => setMisReward(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nombre de places max :</label>
                <input
                  type="number"
                  min={10}
                  required
                  value={misMaxSubm}
                  onChange={(e) => setMisMaxSubm(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Formule requise :</label>
                <select
                  value={misPlan}
                  onChange={(e) => setMisPlan(e.target.value as PlanType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="FREE">Gratuit (Tous)</option>
                  <option value="STARTER">Starter</option>
                  <option value="PREMIUM">Premium</option>
                  <option value="BUSINESS">Business VIP</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Description courte :</label>
              <textarea
                required
                rows={2}
                value={misDesc}
                onChange={(e) => setMisDesc(e.target.value)}
                placeholder="Décrivez en 2 phrases l'objectif de la mission..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Consignes étape par étape :</label>
              <textarea
                required
                rows={4}
                value={misInstructions}
                onChange={(e) => setMisInstructions(e.target.value)}
                placeholder="1. Télécharger l'application sur le Play Store&#10;2. Créer un panier de 2 articles&#10;3. Faire une capture d'écran nette&#10;4. Soumettre la capture"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={creatingMis}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-950/50 transition"
            >
              {creatingMis ? 'Publication...' : 'Publier la mission'}
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: NEW CAMPAIGN (WITH 15% PLATFORM FEE) */}
      {activeTab === 'NEW_CAMPAIGN' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl mx-auto shadow-2xl">
          <h3 className="text-xl font-black text-white">Financer une nouvelle campagne</h3>
          <p className="text-xs text-slate-400 mt-1 mb-6">
            Provisionnez votre cagnotte pour rémunérer des centaines de membres.
          </p>

          <form onSubmit={handleCreateCampaign} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nom de la campagne :</label>
              <input
                type="text"
                required
                value={campTitle}
                onChange={(e) => setCampTitle(e.target.value)}
                placeholder="Ex: Campagne Acquisition Utilisateurs Q4"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Budget alloué aux récompenses (FCFA) :
              </label>
              <input
                type="number"
                min={50000}
                step={25000}
                required
                value={campBudget}
                onChange={(e) => setCampBudget(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Platform fee 15% breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Budget net reversé aux membres :</span>
                <span className="font-bold text-white">{campBudget.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Commission plateforme SANDRINO (15%) :</span>
                <span className="text-amber-400">
                  +{Math.round(campBudget * 0.15).toLocaleString('fr-FR')} FCFA
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm">
                <span className="font-bold text-white">Total à régler (Mobile Money / Virement) :</span>
                <span className="text-base font-black text-emerald-400">
                  {Math.round(campBudget * 1.15).toLocaleString('fr-FR')} FCFA
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={creatingCamp || campBudget <= 0}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-950/50 transition"
            >
              {creatingCamp ? 'Validation...' : 'Créer et Provisionner la Campagne'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
