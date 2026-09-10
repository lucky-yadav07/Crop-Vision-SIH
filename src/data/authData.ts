import { UserAccount, AdminAuditLog, SystemConfig } from '../types';

export const PREDEFINED_USERS: UserAccount[] = [
  {
    id: 'user-1',
    username: 'user1',
    email: 'user1@agroguard.org',
    password: 'Password@123',
    name: 'user1',
    role: 'user',
    avatar: '👨‍🌾',
    farmName: 'Greenfield Sanctuary',
    location: 'Sector 4, Karnal Belt',
    district: 'Karnal',
    state: 'Haryana',
    totalAcres: 18.0,
    primaryCrops: ['Sugarcane', 'Rice', 'Wheat', 'Tomato'],
    phone: '+91 98765 43210',
    status: 'active',
    lastLogin: 'Today, 10:45 AM',
    createdAt: '2025-01-15',
    totalScans: 14
  },
  {
    id: 'user-2',
    username: 'user2',
    email: 'user2@agroguard.org',
    password: 'Password@456',
    name: 'user2',
    role: 'user',
    avatar: '👩‍🌾',
    farmName: 'Sunrise Organic Valley',
    location: 'Dindori Hills, Nashik',
    district: 'Nashik',
    state: 'Maharashtra',
    totalAcres: 12.5,
    primaryCrops: ['Tomato', 'Chili', 'Mustard', 'Maize'],
    phone: '+91 98112 34567',
    status: 'active',
    lastLogin: 'Yesterday, 04:20 PM',
    createdAt: '2025-02-01',
    totalScans: 9
  },
  {
    id: 'admin-1',
    username: 'admin',
    email: 'admin@agroguard.org',
    password: 'Admin@2026',
    name: 'admin',
    role: 'admin',
    avatar: '🛡️',
    designation: 'Lead Agronomist & National Surveillance Director',
    organization: 'National Crop Health & Disease Surveillance Directorate',
    location: 'ICAR Krishi Bhavan, New Delhi',
    phone: '+91 94000 88888',
    status: 'active',
    lastLogin: 'Just now',
    createdAt: '2024-11-10',
    totalScans: 52
  }
];

export const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'log-1',
    timestamp: 'Today, 11:20 AM',
    action: 'Scan Verification',
    actorName: 'admin',
    actorRole: 'admin',
    details: 'Verified Tomato Early Blight diagnosis for user1 (Karnal Belt). Confirmed 92% confidence.',
    status: 'success'
  },
  {
    id: 'log-2',
    timestamp: 'Today, 09:15 AM',
    action: 'Alert Broadcast',
    actorName: 'admin',
    actorRole: 'admin',
    details: 'Dispatched regional warning for Fall Armyworm in Maize across Haryana & Punjab belts.',
    status: 'warning'
  },
  {
    id: 'log-3',
    timestamp: 'Yesterday, 05:40 PM',
    action: 'Expert Consultation Reply',
    actorName: 'admin',
    actorRole: 'admin',
    details: 'Reviewed inquiry #exp-102 from user2 regarding Chili Leaf Curl. Assigned biological neem protocol.',
    status: 'info'
  },
  {
    id: 'log-4',
    timestamp: 'Yesterday, 02:10 PM',
    action: 'AI Threshold Calibration',
    actorName: 'admin',
    actorRole: 'admin',
    details: 'Adjusted minimum disease confidence threshold to 75% for monsoon high-humidity zones.',
    status: 'success'
  }
];

export const INITIAL_SYSTEM_CONFIG: SystemConfig = {
  aiConfidenceThreshold: 75,
  strictPlantValidation: true,
  maintenanceMode: false,
  allowPublicRegistration: false,
  smsNotificationsEnabled: true,
  broadcastChannel: 'all'
};
