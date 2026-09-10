export type SeverityLevel = 'Low' | 'Moderate' | 'High' | 'Severe';

export type DetectedImageCategory =
  | 'plant_or_crop'
  | 'agricultural_pest'
  | 'human_face'
  | 'animal'
  | 'non_agricultural_object'
  | 'other_invalid';

export interface ImageValidationResult {
  isValid: boolean;
  category: DetectedImageCategory;
  reason: string;
  userMessage: string;
}

export type CropType = 
  | 'Sugarcane'
  | 'Maize'
  | 'Mustard'
  | 'Rice'
  | 'Tomato'
  | 'Potato'
  | 'Wheat'
  | 'Cotton'
  | 'Chili';

export interface DetectionResult {
  id: string;
  type: 'disease' | 'pest';
  crop: CropType;
  name: string;
  scientificName?: string;
  confidence: number;
  severity: SeverityLevel;
  imageUrl: string;
  timestamp: string;
  symptoms: string[];
  possibleCauses: string[];
  recommendedActions: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  preventiveMeasures: string[];
  ipmPractices?: {
    cultural: string[];
    biological: string[];
    chemicalThreshold: string;
  };
  affectedAreaEstimate?: string;
  notes?: string;
}

export interface ScanRecord {
  id: string;
  userId?: string;
  farmerName?: string;
  date: string;
  crop: CropType;
  type: 'disease' | 'pest';
  detectionName: string;
  confidence: number;
  severity: SeverityLevel;
  imageUrl: string;
  status: 'Action Required' | 'Monitoring' | 'Resolved';
  recommendationSummary: string;
  symptoms: string[];
  verifiedByAdmin?: boolean;
  adminNotes?: string;
  overriddenDiagnosis?: string;
}

export interface CropItem {
  id: string;
  name: CropType;
  variety: string;
  acres: number;
  sowingDate: string;
  healthStatus: 'Healthy' | 'Moderate Risk' | 'High Risk';
  currentRisk: string;
  lastScanDate: string;
  imageUrl: string;
  stage: 'Germination' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvesting';
}

export interface WeatherCondition {
  temperature: number;
  humidity: number;
  rainfallMm: number;
  forecast: string;
  windSpeedKmH: number;
  uvIndex: number;
  city: string;
}

export interface RiskAlert {
  id: string;
  title: string;
  category: 'Disease Risk' | 'Pest Risk' | 'Weather';
  severity: SeverityLevel;
  affectedCrops: CropType[];
  description: string;
  weatherFactor: string;
  recommendedAction: string;
  validUntil: string;
}

export interface KnowledgeItem {
  id: string;
  name: string;
  scientificName?: string;
  category: 'Diseases' | 'Pests' | 'Prevention' | 'Best Practices';
  crop: CropType | 'Multiple Crops';
  imageUrl: string;
  description: string;
  symptoms: string[];
  prevention: string[];
  management: string[];
  favorableConditions: string;
}

export interface ExpertConsultation {
  id: string;
  farmerName: string;
  userId?: string;
  phone: string;
  crop: CropType;
  problemDescription: string;
  location: string;
  contactPreference: 'Phone Call' | 'WhatsApp' | 'Field Visit' | 'Email';
  urgency: 'Standard (within 24h)' | 'Urgent (within 4h)';
  imageUrl?: string;
  status: 'Submitted' | 'Under Review' | 'Officer Assigned' | 'Resolved';
  createdAt: string;
  assignedOfficer?: string;
  officialReply?: string;
  resolvedAt?: string;
}

export type UserRole = 'admin' | 'user';

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  password: string; // predefined password
  name: string;
  role: UserRole;
  avatar?: string;
  farmName?: string;
  location?: string;
  district?: string;
  state?: string;
  totalAcres?: number;
  primaryCrops?: CropType[];
  phone?: string;
  status: 'active' | 'suspended';
  lastLogin?: string;
  designation?: string;
  organization?: string;
  createdAt: string;
  totalScans?: number;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  action: string;
  actorName: string;
  actorRole: UserRole;
  details: string;
  status: 'success' | 'warning' | 'info';
}

export interface SystemConfig {
  aiConfidenceThreshold: number; // e.g. 75
  strictPlantValidation: boolean;
  maintenanceMode: boolean;
  allowPublicRegistration: boolean;
  smsNotificationsEnabled: boolean;
  broadcastChannel: 'all' | 'high-risk' | 'test';
}

export interface FarmerProfile {
  name: string;
  farmName: string;
  phone: string;
  email: string;
  location: string;
  district: string;
  state: string;
  totalAcres: number;
  primaryCrops: CropType[];
  preferredLanguage: string;
  notifications: {
    smsAlerts: boolean;
    weatherWarnings: boolean;
    pestOutbreakUpdates: boolean;
    weeklyDigest: boolean;
  };
  offlineMode: boolean;
}

