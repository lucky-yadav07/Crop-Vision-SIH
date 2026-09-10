import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, AdminAuditLog, SystemConfig } from '../types';
import { PREDEFINED_USERS, INITIAL_AUDIT_LOGS, INITIAL_SYSTEM_CONFIG } from '../data/authData';

interface AuthContextType {
  currentUser: UserAccount | null;
  users: UserAccount[];
  isAdmin: boolean;
  isUser: boolean;
  login: (usernameOrEmail: string, password: string) => { success: boolean; message?: string; user?: UserAccount };
  quickLogin: (userId: string) => void;
  switchUser: (userId: string) => void;
  logout: () => void;
  updateUser: (userId: string, updates: Partial<UserAccount>) => void;
  resetUserPassword: (userId: string, newPassword: string) => boolean;
  toggleUserStatus: (userId: string) => void;
  addUser: (userData: {
    username: string;
    email: string;
    password: string;
    name: string;
    role: 'user' | 'admin';
    farmName?: string;
    location?: string;
    district?: string;
    state?: string;
    totalAcres?: number;
    primaryCrops?: any[];
    phone?: string;
    designation?: string;
  }) => UserAccount;
  auditLogs: AdminAuditLog[];
  addAuditLog: (action: string, details: string, status?: 'success' | 'warning' | 'info') => void;
  systemConfig: SystemConfig;
  updateSystemConfig: (updates: Partial<SystemConfig>) => void;
  isAuthModalOpen: boolean;
  authModalTarget: string | null;
  openAuthModal: (targetUserIdOrRole?: string) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_USER_ID: 'agroguard_auth_current_user_id',
  USERS: 'agroguard_auth_users',
  AUDIT_LOGS: 'agroguard_admin_audit_logs',
  SYSTEM_CONFIG: 'agroguard_system_config',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initialize Users List with automatic migration to user1, user2, and admin
  const [users, setUsers] = useState<UserAccount[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 3) {
          return parsed.map((u: UserAccount) => {
            if (u.id === 'admin-1' || u.role === 'admin' || u.username === 'admin') {
              return { ...u, name: 'admin', username: 'admin' };
            }
            if (u.id === 'user-1' || u.username === 'farmer1' || u.username === 'user1') {
              return { ...u, name: 'user1', username: 'user1', email: 'user1@agroguard.org' };
            }
            if (u.id === 'user-2' || u.username === 'farmer2' || u.username === 'user2') {
              return { ...u, name: 'user2', username: 'user2', email: 'user2@agroguard.org' };
            }
            return u;
          });
        }
      }
    } catch (e) {
      console.warn('Could not parse stored users:', e);
    }
    return PREDEFINED_USERS;
  });

  // 2. Initialize Current User (Default to user1, or Admin if previously set)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const storedId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
      if (storedId) {
        const found = users.find((u) => u.id === storedId);
        if (found) return found;
      }
    } catch (e) {
      console.warn('Could not retrieve current user id:', e);
    }
    // Default to user1
    return users[0] || PREDEFINED_USERS[0];
  });

  // 3. Initialize Audit Logs
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not retrieve audit logs:', e);
    }
    return INITIAL_AUDIT_LOGS;
  });

  // 4. Initialize System Config
  const [systemConfig, setSystemConfig] = useState<SystemConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SYSTEM_CONFIG);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not retrieve system config:', e);
    }
    return INITIAL_SYSTEM_CONFIG;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTarget, setAuthModalTarget] = useState<string | null>(null);

  const openAuthModal = (targetUserIdOrRole?: string) => {
    setAuthModalTarget(targetUserIdOrRole || null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalTarget(null);
  };

  // Sync users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.warn('Failed to save users to localStorage', e);
    }
  }, [users]);

  // Sync current user ID to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUser.id);
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
      }
    } catch (e) {
      console.warn('Failed to save current user id to localStorage', e);
    }
  }, [currentUser]);

  // Sync audit logs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
    } catch (e) {
      console.warn('Failed to save audit logs to localStorage', e);
    }
  }, [auditLogs]);

  // Sync config
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SYSTEM_CONFIG, JSON.stringify(systemConfig));
    } catch (e) {
      console.warn('Failed to save system config to localStorage', e);
    }
  }, [systemConfig]);

  const addAuditLog = (
    action: string,
    details: string,
    status: 'success' | 'warning' | 'info' = 'info'
  ) => {
    const newLog: AdminAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      action,
      actorName: currentUser ? currentUser.name : 'System',
      actorRole: currentUser ? currentUser.role : 'admin',
      details,
      status
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const login = (usernameOrEmail: string, password: string) => {
    const trimmedInput = usernameOrEmail.trim().toLowerCase();
    const trimmedPass = password.trim();

    const targetUser = users.find(
      (u) =>
        u.username.toLowerCase() === trimmedInput ||
        u.email.toLowerCase() === trimmedInput
    );

    if (!targetUser) {
      return {
        success: false,
        message: 'No account found with this username or email address.'
      };
    }

    if (targetUser.password !== trimmedPass) {
      return {
        success: false,
        message: 'Incorrect password. Please verify predefined credentials or use quick autofill.'
      };
    }

    if (targetUser.status === 'suspended') {
      return {
        success: false,
        message: 'This account is currently suspended by the system administrator.'
      };
    }

    // Update last login
    const updatedUser: UserAccount = {
      ...targetUser,
      lastLogin: 'Just now'
    };

    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setCurrentUser(updatedUser);

    addAuditLog(
      'User Authentication',
      `User ${updatedUser.name} (${updatedUser.role.toUpperCase()}) logged in successfully.`,
      'success'
    );

    setIsAuthModalOpen(false);
    return { success: true, user: updatedUser };
  };

  // Admin can switch between users directly without password; regular users require password verification
  const switchUser = (userId: string) => {
    if (currentUser?.role === 'admin') {
      const target = users.find((u) => u.id === userId);
      if (target) {
        const updatedUser = { ...target, lastLogin: 'Just now' };
        setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
        setCurrentUser(updatedUser);
        addAuditLog(
          'Admin Session Switch',
          `Administrator admin switched active session to ${target.name} (${target.role.toUpperCase()}) without password.`,
          'info'
        );
        setIsAuthModalOpen(false);
      }
    } else {
      openAuthModal(userId);
    }
  };

  const quickLogin = (userId: string) => {
    if (currentUser?.role === 'admin') {
      switchUser(userId);
    } else {
      openAuthModal(userId);
    }
  };

  const logout = () => {
    if (currentUser) {
      addAuditLog(
        'Session Terminated',
        `User ${currentUser.name} signed out.`,
        'info'
      );
    }
    setCurrentUser(null);
    setIsAuthModalOpen(true);
  };

  const updateUser = (userId: string, updates: Partial<UserAccount>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updates } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, ...updates } : null));
    }
    addAuditLog('User Profile Updated', `Updated settings for account ID ${userId}`, 'info');
  };

  const resetUserPassword = (userId: string, newPassword: string): boolean => {
    if (!newPassword || newPassword.length < 6) return false;
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, password: newPassword } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, password: newPassword } : null));
    }
    const target = users.find((u) => u.id === userId);
    addAuditLog(
      'Password Reset',
      `Password changed for user ${target?.name || userId}.`,
      'warning'
    );
    return true;
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'active' ? 'suspended' : 'active';
          addAuditLog(
            'User Status Modified',
            `Status for ${u.name} toggled to ${newStatus.toUpperCase()}`,
            newStatus === 'suspended' ? 'warning' : 'success'
          );
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const addUser = (userData: {
    username: string;
    email: string;
    password: string;
    name: string;
    role: 'user' | 'admin';
    farmName?: string;
    location?: string;
    district?: string;
    state?: string;
    totalAcres?: number;
    primaryCrops?: any[];
    phone?: string;
    designation?: string;
  }) => {
    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      ...userData,
      status: 'active',
      avatar: userData.role === 'admin' ? '🛡️' : '🧑‍🌾',
      createdAt: new Date().toISOString().split('T')[0],
      totalScans: 0,
      lastLogin: 'Never'
    };
    setUsers((prev) => [...prev, newUser]);
    addAuditLog('User Provisioned', `New ${newUser.role} account created: ${newUser.name} (${newUser.username})`, 'success');
    return newUser;
  };

  const updateSystemConfig = (updates: Partial<SystemConfig>) => {
    setSystemConfig((prev) => ({ ...prev, ...updates }));
    addAuditLog('System Configuration Updated', `Updated keys: ${Object.keys(updates).join(', ')}`, 'info');
  };

  const isAdmin = currentUser?.role === 'admin';
  const isUser = currentUser?.role === 'user';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        isAdmin,
        isUser,
        login,
        quickLogin,
        switchUser,
        logout,
        updateUser,
        resetUserPassword,
        toggleUserStatus,
        addUser,
        auditLogs,
        addAuditLog,
        systemConfig,
        updateSystemConfig,
        isAuthModalOpen,
        authModalTarget,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
