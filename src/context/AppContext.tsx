import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  CompanyProfile,
  Subscription,
  Campaign,
  Mission,
  MissionSubmission,
  Wallet,
  Transaction,
  WithdrawalRequest,
  AuditLog,
  PlanType,
  MobileMoneyProvider,
  canAccessFeature,
  PlatformFeature,
  PLAN_PRICING,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_COMPANY_PROFILE,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_CAMPAIGNS,
  INITIAL_MISSIONS,
  INITIAL_SUBMISSIONS,
  INITIAL_WALLETS,
  INITIAL_TRANSACTIONS,
  INITIAL_WITHDRAWALS,
  INITIAL_AUDIT_LOGS,
} from '../data/mockData';

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

interface AppContextType {
  currentUser: User;
  switchUser: (userId: string) => void;
  users: User[];
  companyProfile: CompanyProfile;
  subscriptions: Subscription[];
  campaigns: Campaign[];
  missions: Mission[];
  submissions: MissionSubmission[];
  wallets: Record<string, Wallet>;
  transactions: Transaction[];
  withdrawals: WithdrawalRequest[];
  auditLogs: AuditLog[];
  toasts: ToastNotification[];
  removeToast: (id: string) => void;
  showToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;

  // Business actions
  userWallet: Wallet;
  userSubscription?: Subscription;
  hasAccess: (feature: PlatformFeature) => boolean;

  // Actions
  submitMissionProof: (missionId: string, proofData: string) => Promise<boolean>;
  reviewSubmission: (submissionId: string, approved: boolean, notes?: string) => Promise<boolean>;
  requestWithdrawal: (
    amount: number,
    provider: MobileMoneyProvider,
    phoneNumber: string,
    accountName: string
  ) => Promise<{ success: boolean; error?: string }>;
  processWithdrawalAdmin: (
    withdrawalId: string,
    action: 'APPROVE' | 'REJECT',
    reason?: string
  ) => Promise<boolean>;
  subscribeToPlan: (
    plan: PlanType,
    provider: MobileMoneyProvider,
    phoneNumber: string
  ) => Promise<boolean>;
  createCampaign: (title: string, budget: number) => Promise<boolean>;
  createMission: (missionData: Omit<Mission, 'id' | 'currentSubmissions' | 'createdAt'>) => Promise<boolean>;
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'sandrino_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or initialize with seed data
  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_current_user`);
    return saved || 'user-member-1';
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_users`);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_company`);
    return saved ? JSON.parse(saved) : INITIAL_COMPANY_PROFILE;
  });

  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_subscriptions`);
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_campaigns`);
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [missions, setMissions] = useState<Mission[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_missions`);
    return saved ? JSON.parse(saved) : INITIAL_MISSIONS;
  });

  const [submissions, setSubmissions] = useState<MissionSubmission[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_submissions`);
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [wallets, setWallets] = useState<Record<string, Wallet>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_wallets`);
    return saved ? JSON.parse(saved) : INITIAL_WALLETS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_transactions`);
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_withdrawals`);
    return saved ? JSON.parse(saved) : INITIAL_WITHDRAWALS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_audit`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_current_user`, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_company`, JSON.stringify(companyProfile));
  }, [companyProfile]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_subscriptions`, JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_campaigns`, JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_missions`, JSON.stringify(missions));
  }, [missions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_submissions`, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_wallets`, JSON.stringify(wallets));
  }, [wallets]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_transactions`, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_withdrawals`, JSON.stringify(withdrawals));
  }, [withdrawals]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_audit`, JSON.stringify(auditLogs));
  }, [auditLogs]);

  const showToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const currentUser = users.find((u) => u.id === currentUserId) || users[0];

  const userSubscription = subscriptions.find(
    (s) => s.userId === currentUser.id && s.status === 'ACTIVE'
  );

  const userWallet: Wallet = wallets[currentUser.id] || {
    id: `wal-${currentUser.id}`,
    userId: currentUser.id,
    availableBalance: 0,
    pendingBalance: 0,
    totalEarned: 0,
    currency: 'XOF',
  };

  const hasAccess = (feature: PlatformFeature) => {
    const plan = userSubscription ? userSubscription.plan : 'FREE';
    const status = userSubscription ? userSubscription.status : null;
    return canAccessFeature(feature, plan, status);
  };

  const addAuditLog = (action: string, resource: string, payload?: any) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      userId: currentUser.id,
      action,
      resource,
      ipAddress: '154.68.22.14 (Lomé, TG)',
      userAgent: navigator.userAgent,
      payload,
      createdAt: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const switchUser = (userId: string) => {
    setCurrentUserId(userId);
    const target = users.find((u) => u.id === userId);
    showToast(
      'info',
      'Session basculée',
      `Vous agissez maintenant en tant que : ${target?.fullName} (${target?.role})`
    );
  };

  /**
   * Soumission d'une preuve de mission
   */
  const submitMissionProof = async (missionId: string, proofData: string): Promise<boolean> => {
    const mission = missions.find((m) => m.id === missionId);
    if (!mission) {
      showToast('error', 'Erreur', 'Mission introuvable.');
      return false;
    }

    // Check if already submitted
    const existing = submissions.find(
      (s) => s.missionId === missionId && s.userId === currentUser.id
    );
    if (existing) {
      showToast('error', 'Déjà soumise', 'Vous avez déjà soumis une preuve pour cette mission.');
      return false;
    }

    const newSubm: MissionSubmission = {
      id: `subm-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      missionId,
      missionTitle: mission.title,
      rewardAmount: mission.rewardPerUser,
      userId: currentUser.id,
      userName: currentUser.fullName,
      userPhone: currentUser.phone,
      status: 'SUBMITTED',
      proofData,
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    setSubmissions((prev) => [newSubm, ...prev]);

    // Update mission submission counter
    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, currentSubmissions: m.currentSubmissions + 1 } : m))
    );

    // Update pending balance in user's wallet
    setWallets((prev) => {
      const current = prev[currentUser.id] || {
        id: `wal-${currentUser.id}`,
        userId: currentUser.id,
        availableBalance: 0,
        pendingBalance: 0,
        totalEarned: 0,
        currency: 'XOF',
      };
      return {
        ...prev,
        [currentUser.id]: {
          ...current,
          pendingBalance: current.pendingBalance + mission.rewardPerUser,
        },
      };
    });

    addAuditLog('MISSION_SUBMITTED', 'MISSION', { missionId, title: mission.title });

    showToast(
      'success',
      'Preuve transmise avec succès !',
      `Votre travail a été enregistré. La récompense de ${mission.rewardPerUser.toLocaleString('fr-FR')} FCFA est en attente d'approbation.`
    );
    return true;
  };

  /**
   * WalletService.creditMissionReward (Validation et crédit atomique)
   */
  const reviewSubmission = async (
    submissionId: string,
    approved: boolean,
    notes?: string
  ): Promise<boolean> => {
    const subm = submissions.find((s) => s.id === submissionId);
    if (!subm) return false;

    const mission = missions.find((m) => m.id === subm.missionId);
    const targetUserId = subm.userId;
    const amount = subm.rewardAmount;

    if (approved) {
      const idempotencyKey = `REWARD_SUBMISSION_${submissionId}`;

      // Check idempotency in transactions
      const alreadyCredited = transactions.some((t) => t.idempotencyKey === idempotencyKey);
      if (alreadyCredited) {
        showToast('error', 'Erreur idempotence', 'Transaction déjà traitée pour cette soumission.');
        return false;
      }

      // Atomically credit wallet
      setWallets((prev) => {
        const cur = prev[targetUserId] || {
          id: `wal-${targetUserId}`,
          userId: targetUserId,
          availableBalance: 0,
          pendingBalance: 0,
          totalEarned: 0,
          currency: 'XOF',
        };
        return {
          ...prev,
          [targetUserId]: {
            ...cur,
            availableBalance: cur.availableBalance + amount,
            pendingBalance: Math.max(0, cur.pendingBalance - amount),
            totalEarned: cur.totalEarned + amount,
          },
        };
      });

      // Create COMPLETED MISSION_REWARD Transaction
      const newTx: Transaction = {
        id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        walletId: `wal-${targetUserId}`,
        userId: targetUserId,
        type: 'MISSION_REWARD',
        amount: amount,
        fee: 0,
        status: 'COMPLETED',
        reference: `REW-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        idempotencyKey,
        description: `Rémunération pour la mission : ${subm.missionTitle}`,
        metadata: { submissionId, missionTitle: subm.missionTitle },
        createdAt: new Date().toISOString(),
      };
      setTransactions((prev) => [newTx, ...prev]);

      // Update submission status
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === submissionId
            ? {
                ...s,
                status: 'APPROVED',
                adminNotes: notes || 'Mission vérifiée et approuvée.',
                reviewedAt: new Date().toISOString(),
              }
            : s
        )
      );

      // Consume campaign budget if campaignId exists
      if (mission?.campaignId) {
        setCampaigns((prev) =>
          prev.map((c) =>
            c.id === mission.campaignId ? { ...c, spentBudget: c.spentBudget + amount } : c
          )
        );
      }

      addAuditLog('SUBMISSION_APPROVED', 'MISSION_SUBMISSION', {
        submissionId,
        amount,
        targetUserId,
      });

      showToast(
        'success',
        'Mission approuvée & Rémunérée',
        `${amount.toLocaleString('fr-FR')} FCFA ont été crédités sur le compte de ${subm.userName}.`
      );
    } else {
      // Rejection: clear pending balance
      setWallets((prev) => {
        const cur = prev[targetUserId];
        if (!cur) return prev;
        return {
          ...prev,
          [targetUserId]: {
            ...cur,
            pendingBalance: Math.max(0, cur.pendingBalance - amount),
          },
        };
      });

      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === submissionId
            ? {
                ...s,
                status: 'REJECTED',
                adminNotes: notes || 'Preuve non conforme aux instructions fournies.',
                reviewedAt: new Date().toISOString(),
              }
            : s
        )
      );

      addAuditLog('SUBMISSION_REJECTED', 'MISSION_SUBMISSION', { submissionId, reason: notes });
      showToast('info', 'Soumission rejetée', `La soumission a été rejetée avec la note : "${notes}".`);
    }

    return true;
  };

  /**
   * WalletService.requestWithdrawal
   * Règles : Min 1 000 FCFA, 2% de frais, débit immédiat du portefeuille.
   */
  const requestWithdrawal = async (
    amount: number,
    provider: MobileMoneyProvider,
    phoneNumber: string,
    accountName: string
  ): Promise<{ success: boolean; error?: string }> => {
    const WITHDRAWAL_FEE_RATE = 0.02; // 2%
    const currentBal = userWallet.availableBalance;

    if (amount < 1000) {
      const err = 'Le montant minimum de retrait est de 1 000 FCFA.';
      showToast('error', 'Montant insuffisant', err);
      return { success: false, error: err };
    }

    if (amount > currentBal) {
      const err = 'Solde disponible insuffisant pour effectuer ce retrait.';
      showToast('error', 'Solde insuffisant', err);
      return { success: false, error: err };
    }

    const fee = Math.round(amount * WITHDRAWAL_FEE_RATE);
    const netAmount = amount - fee;
    const reference = `WTH-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    // 1. Débit immédiat du solde disponible
    setWallets((prev) => {
      const cur = prev[currentUser.id] || userWallet;
      return {
        ...prev,
        [currentUser.id]: {
          ...cur,
          availableBalance: cur.availableBalance - amount,
        },
      };
    });

    // 2. Création de la transaction comptable PENDING
    const newTx: Transaction = {
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      walletId: userWallet.id,
      userId: currentUser.id,
      type: 'WITHDRAWAL',
      amount: amount,
      fee: fee,
      status: 'PENDING',
      reference,
      idempotencyKey: `TX_${reference}`,
      description: `Retrait vers ${provider} (${phoneNumber})`,
      metadata: { provider, phoneNumber, accountName, netAmount },
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);

    // 3. Création formelle de la demande de retrait
    const newReq: WithdrawalRequest = {
      id: `wth-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: currentUser.id,
      userName: currentUser.fullName,
      amount,
      fee,
      netAmount,
      provider,
      phoneNumber,
      accountName,
      status: 'REQUESTED',
      reference,
      createdAt: new Date().toISOString(),
    };
    setWithdrawals((prev) => [newReq, ...prev]);

    addAuditLog('WITHDRAWAL_REQUESTED', 'WALLET', {
      amount,
      netAmount,
      fee,
      provider,
      phoneNumber,
    });

    showToast(
      'success',
      'Demande de retrait initiée !',
      `Votre demande de ${netAmount.toLocaleString('fr-FR')} FCFA (net après 2% de frais) vers ${provider} (${phoneNumber}) a été soumise pour décaissement.`
    );

    return { success: true };
  };

  /**
   * Admin approves or rejects withdrawal
   */
  const processWithdrawalAdmin = async (
    withdrawalId: string,
    action: 'APPROVE' | 'REJECT',
    reason?: string
  ): Promise<boolean> => {
    const wth = withdrawals.find((w) => w.id === withdrawalId);
    if (!wth) return false;

    if (action === 'APPROVE') {
      const providerTxId = `TX-${wth.provider}-${Date.now().toString().slice(-6)}`;

      // Update withdrawal request
      setWithdrawals((prev) =>
        prev.map((w) =>
          w.id === withdrawalId
            ? {
                ...w,
                status: 'COMPLETED',
                providerTxId,
              }
            : w
        )
      );

      // Update transaction status
      setTransactions((prev) =>
        prev.map((t) => (t.reference === wth.reference ? { ...t, status: 'COMPLETED' } : t))
      );

      addAuditLog('WITHDRAWAL_DISBURSED', 'WITHDRAWAL_REQUEST', {
        withdrawalId,
        providerTxId,
        amount: wth.amount,
      });

      showToast(
        'success',
        'Retrait décaissé avec succès !',
        `Le virement Mobile Money de ${wth.netAmount.toLocaleString('fr-FR')} FCFA vers ${wth.accountName} (${wth.phoneNumber}) a été confirmé (Réf: ${providerTxId}).`
      );
    } else {
      // Rejection: refund the debited availableBalance
      setWallets((prev) => {
        const cur = prev[wth.userId];
        if (!cur) return prev;
        return {
          ...prev,
          [wth.userId]: {
            ...cur,
            availableBalance: cur.availableBalance + wth.amount,
          },
        };
      });

      // Update withdrawal
      setWithdrawals((prev) =>
        prev.map((w) =>
          w.id === withdrawalId
            ? {
                ...w,
                status: 'REJECTED',
                failureReason: reason || 'Numéro Mobile Money erroné ou non identifié.',
              }
            : w
        )
      );

      // Mark transaction REVERSED
      setTransactions((prev) =>
        prev.map((t) => (t.reference === wth.reference ? { ...t, status: 'REVERSED' } : t))
      );

      addAuditLog('WITHDRAWAL_REJECTED', 'WITHDRAWAL_REQUEST', {
        withdrawalId,
        reason,
        refundedAmount: wth.amount,
      });

      showToast(
        'info',
        'Retrait rejeté & Solde remboursé',
        `Le montant de ${wth.amount.toLocaleString('fr-FR')} FCFA a été recrédité sur le portefeuille du membre.`
      );
    }

    return true;
  };

  /**
   * Subscribe to Plan via Mobile Money (PaymentGatewayService simulated webhook)
   */
  const subscribeToPlan = async (
    plan: PlanType,
    provider: MobileMoneyProvider,
    phoneNumber: string
  ): Promise<boolean> => {
    const pricing = PLAN_PRICING[plan];
    const paymentRef = `SUB-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const startDate = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(startDate.getDate() + pricing.durationDays);

    const newSub: Subscription = {
      id: `sub-${Date.now()}`,
      userId: currentUser.id,
      plan,
      price: pricing.price,
      status: 'ACTIVE',
      paymentRef,
      startDate: startDate.toISOString(),
      expiresAt: expiresAt.toISOString(),
      createdAt: new Date().toISOString(),
    };

    // Update subscriptions (deactivate older ones)
    setSubscriptions((prev) => [
      newSub,
      ...prev.map((s) => (s.userId === currentUser.id ? { ...s, status: 'CANCELLED' as const } : s)),
    ]);

    // Record transaction
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      walletId: userWallet.id,
      userId: currentUser.id,
      type: 'SUBSCRIPTION_PAYMENT',
      amount: pricing.price,
      fee: 0,
      status: 'COMPLETED',
      reference: paymentRef,
      idempotencyKey: `TX_${paymentRef}`,
      description: `Paiement abonnement formule ${plan} via ${provider} (${phoneNumber})`,
      metadata: { plan, provider, phoneNumber, durationDays: pricing.durationDays },
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);

    // If user was referred, credit 10% referral commission to referrer
    if (currentUser.referredById && pricing.price > 0) {
      const referrerId = currentUser.referredById;
      const commission = Math.round(pricing.price * 0.1); // 10%
      setWallets((prev) => {
        const refWallet = prev[referrerId];
        if (!refWallet) return prev;
        return {
          ...prev,
          [referrerId]: {
            ...refWallet,
            availableBalance: refWallet.availableBalance + commission,
            totalEarned: refWallet.totalEarned + commission,
          },
        };
      });

      const refTx: Transaction = {
        id: `tx-ref-${Date.now()}`,
        walletId: `wal-${referrerId}`,
        userId: referrerId,
        type: 'REFERRAL_COMMISSION',
        amount: commission,
        fee: 0,
        status: 'COMPLETED',
        reference: `REF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        idempotencyKey: `REF_${currentUser.id}_${paymentRef}`,
        description: `Commission de parrainage 10% sur l'abonnement ${plan} de ${currentUser.fullName}`,
        metadata: { referredUserId: currentUser.id, plan, commission },
        createdAt: new Date().toISOString(),
      };
      setTransactions((prev) => [refTx, ...prev]);
    }

    addAuditLog('SUBSCRIPTION_ACTIVATED', 'SUBSCRIPTION', { plan, price: pricing.price, provider });

    showToast(
      'success',
      `Formule ${pricing.label} activée !`,
      `Paiement de ${pricing.price.toLocaleString('fr-FR')} FCFA validé avec succès par ${provider}. Vos privilèges sont actifs pour ${pricing.durationDays} jours.`
    );

    return true;
  };

  /**
   * Create Campaign with 15% Platform fee
   */
  const createCampaign = async (title: string, budget: number): Promise<boolean> => {
    const paymentRef = `CMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const platformFeeRate = 0.15; // 15% Frais SANDRINO

    const newCampaign: Campaign = {
      id: `cmp-${Date.now()}`,
      companyId: companyProfile.id,
      companyName: companyProfile.companyName,
      title,
      totalBudget: budget,
      spentBudget: 0,
      platformFeeRate,
      isFunded: true,
      paymentRef,
      createdAt: new Date().toISOString(),
    };

    setCampaigns((prev) => [newCampaign, ...prev]);

    // Record company payment
    const totalWithFee = Math.round(budget * (1 + platformFeeRate));
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      walletId: userWallet.id,
      userId: currentUser.id,
      type: 'CAMPAIGN_FUNDING',
      amount: totalWithFee,
      fee: Math.round(budget * platformFeeRate),
      status: 'COMPLETED',
      reference: paymentRef,
      idempotencyKey: `TX_${paymentRef}`,
      description: `Financement campagne "${title}" (Budget: ${budget} FCFA + 15% commission plateforme)`,
      metadata: { budget, platformFee: Math.round(budget * platformFeeRate) },
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);

    addAuditLog('CAMPAIGN_FUNDED', 'CAMPAIGN', { title, budget, totalWithFee });

    showToast(
      'success',
      'Campagne créée et financée !',
      `Votre campagne "${title}" a été provisionnée de ${budget.toLocaleString('fr-FR')} FCFA. Vous pouvez désormais publier des micro-missions.`
    );

    return true;
  };

  /**
   * Create Mission under Campaign
   */
  const createMission = async (
    missionData: Omit<Mission, 'id' | 'currentSubmissions' | 'createdAt'>
  ): Promise<boolean> => {
    const newMission: Mission = {
      ...missionData,
      id: `mis-${Date.now()}`,
      companyName: companyProfile.companyName,
      currentSubmissions: 0,
      createdAt: new Date().toISOString(),
    };

    setMissions((prev) => [newMission, ...prev]);
    addAuditLog('MISSION_PUBLISHED', 'MISSION', { title: missionData.title });

    showToast(
      'success',
      'Mission publiée !',
      `La mission "${missionData.title}" est maintenant visible par les membres éligibles (${missionData.requiredPlan}).`
    );

    return true;
  };

  const resetToDefaultData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_users`);
    localStorage.removeItem(`${STORAGE_KEY}_company`);
    localStorage.removeItem(`${STORAGE_KEY}_subscriptions`);
    localStorage.removeItem(`${STORAGE_KEY}_campaigns`);
    localStorage.removeItem(`${STORAGE_KEY}_missions`);
    localStorage.removeItem(`${STORAGE_KEY}_submissions`);
    localStorage.removeItem(`${STORAGE_KEY}_wallets`);
    localStorage.removeItem(`${STORAGE_KEY}_transactions`);
    localStorage.removeItem(`${STORAGE_KEY}_withdrawals`);
    localStorage.removeItem(`${STORAGE_KEY}_audit`);
    localStorage.removeItem(`${STORAGE_KEY}_current_user`);

    setUsers(INITIAL_USERS);
    setCompanyProfile(INITIAL_COMPANY_PROFILE);
    setSubscriptions(INITIAL_SUBSCRIPTIONS);
    setCampaigns(INITIAL_CAMPAIGNS);
    setMissions(INITIAL_MISSIONS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setWallets(INITIAL_WALLETS);
    setTransactions(INITIAL_TRANSACTIONS);
    setWithdrawals(INITIAL_WITHDRAWALS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setCurrentUserId('user-member-1');

    showToast('info', 'Réinitialisation', 'Toutes les données de démonstration ont été restaurées.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchUser,
        users,
        companyProfile,
        subscriptions,
        campaigns,
        missions,
        submissions,
        wallets,
        transactions,
        withdrawals,
        auditLogs,
        toasts,
        removeToast,
        showToast,
        userWallet,
        userSubscription,
        hasAccess,
        submitMissionProof,
        reviewSubmission,
        requestWithdrawal,
        processWithdrawalAdmin,
        subscribeToPlan,
        createCampaign,
        createMission,
        resetToDefaultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
