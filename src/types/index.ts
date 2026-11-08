export type Role = 'MEMBER' | 'COMPANY' | 'ADMIN';

export type PlanType = 'FREE' | 'STARTER' | 'PREMIUM' | 'BUSINESS';

export type SubscriptionStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'PENDING_PAYMENT';

export type MissionCategory =
  | 'APP_TEST'
  | 'PAID_SURVEY'
  | 'PRODUCT_REVIEW'
  | 'CONTENT_CREATION'
  | 'DIGITAL_SERVICE'
  | 'RESEARCH'
  | 'AD_CAMPAIGN';

export type SubmissionStatus =
  | 'IN_PROGRESS'
  | 'SUBMITTED'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'REJECTED';

export type TransactionType =
  | 'SUBSCRIPTION_PAYMENT'
  | 'CAMPAIGN_FUNDING'
  | 'MISSION_REWARD'
  | 'WITHDRAWAL'
  | 'SERVICE_FEE'
  | 'REFERRAL_COMMISSION';

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REVERSED';

export type WithdrawalStatus =
  | 'REQUESTED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'REJECTED'
  | 'FAILED';

export type MobileMoneyProvider =
  | 'TMONEY'
  | 'FLOOZ'
  | 'LEEKPAY'
  | 'ORANGE_MONEY'
  | 'MTN_MOMO'
  | 'WAVE';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  country: string; // "TG", "BJ", "CI", "SN", etc.
  role: Role;
  avatarUrl?: string;
  referralCode: string;
  referredById?: string;
  createdAt: string;
}

export interface CompanyProfile {
  id: string;
  userId: string;
  companyName: string;
  registrationNum?: string;
  taxId?: string;
  website?: string;
  address?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: PlanType;
  price: number;
  status: SubscriptionStatus;
  paymentRef?: string;
  startDate?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface Campaign {
  id: string;
  companyId: string;
  companyName?: string;
  title: string;
  totalBudget: number;
  spentBudget: number;
  platformFeeRate: number; // 0.15 (15% Frais SANDRINO)
  isFunded: boolean;
  paymentRef?: string;
  createdAt: string;
}

export interface Mission {
  id: string;
  campaignId?: string;
  companyName?: string;
  title: string;
  description: string;
  instructions: string;
  category: MissionCategory;
  rewardPerUser: number;
  maxSubmissions: number;
  currentSubmissions: number;
  targetCountry: string; // "ALL" or "TG", "BJ", "CI", etc.
  requiredPlan: PlanType;
  deadline: string;
  isActive: boolean;
  createdAt: string;
}

export interface MissionSubmission {
  id: string;
  missionId: string;
  missionTitle: string;
  rewardAmount: number;
  userId: string;
  userName: string;
  userPhone: string;
  status: SubmissionStatus;
  proofData?: string;
  adminNotes?: string;
  submittedAt?: string;
  reviewedAt?: string;
  createdAt: string;
}

export interface Wallet {
  id: string;
  userId: string;
  availableBalance: number;
  pendingBalance: number;
  totalEarned: number;
  currency: string; // "XOF"
}

export interface Transaction {
  id: string;
  walletId: string;
  userId: string;
  type: TransactionType;
  amount: number;
  fee: number;
  status: TransactionStatus;
  reference: string;
  idempotencyKey: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  fee: number; // 2%
  netAmount: number;
  provider: MobileMoneyProvider;
  phoneNumber: string;
  accountName: string;
  status: WithdrawalStatus;
  reference: string;
  providerTxId?: string;
  failureReason?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  resource: string;
  ipAddress?: string;
  userAgent?: string;
  payload?: any;
  createdAt: string;
}

export type PlatformFeature =
  | 'DASHBOARD'
  | 'DAILY_MISSIONS'
  | 'ACTIVITY_HISTORY'
  | 'SPONSORED_MISSIONS'
  | 'WALLET'
  | 'WITHDRAWALS'
  | 'SUBSCRIPTIONS'
  | 'REFERRAL'
  | 'NOTIFICATIONS'
  | 'SUPPORT';

export const PLAN_FEATURES: Record<PlanType, PlatformFeature[]> = {
  FREE: ['DASHBOARD'],
  STARTER: ['DASHBOARD', 'DAILY_MISSIONS', 'ACTIVITY_HISTORY'],
  PREMIUM: [
    'DASHBOARD',
    'DAILY_MISSIONS',
    'ACTIVITY_HISTORY',
    'SPONSORED_MISSIONS',
    'WALLET',
    'WITHDRAWALS',
  ],
  BUSINESS: [
    'DASHBOARD',
    'DAILY_MISSIONS',
    'ACTIVITY_HISTORY',
    'SPONSORED_MISSIONS',
    'WALLET',
    'WITHDRAWALS',
    'SUBSCRIPTIONS',
    'REFERRAL',
    'NOTIFICATIONS',
    'SUPPORT',
  ],
};

/**
 * Règle d'or : Même si l'abonnement expire, les retraits d'argent déjà validé
 * restent impérativement autorisés.
 */
export function canAccessFeature(
  feature: PlatformFeature,
  currentPlan: PlanType | null,
  status: SubscriptionStatus | null
): boolean {
  if (feature === 'WITHDRAWALS' || feature === 'WALLET') {
    return true;
  }
  if (!currentPlan || status !== 'ACTIVE') {
    return PLAN_FEATURES.FREE.includes(feature);
  }
  return PLAN_FEATURES[currentPlan]?.includes(feature) ?? false;
}

export const PLAN_PRICING: Record<PlanType, { price: number; durationDays: number; label: string; badge: string }> = {
  FREE: { price: 0, durationDays: 365, label: 'Gratuit', badge: 'Découverte' },
  STARTER: { price: 2500, durationDays: 7, label: 'Starter', badge: 'Populaire' },
  PREMIUM: { price: 5000, durationDays: 7, label: 'Premium', badge: 'Recommandé' },
  BUSINESS: { price: 12000, durationDays: 30, label: 'Business VIP', badge: 'Pro' },
};
