import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole } from "@/types/user.types";
import { mockUsers } from "@/services/mock-data/users.data";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  switchRole: (role: UserRole) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Default to logged-in Wholesale Clinic or Customer for easy testing
      user: mockUsers[0], // Admin by default for seamless exploration, easily switchable in header!
      isAuthenticated: true,

      login: async (email: string) => {
        const found = mockUsers.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (found) {
          set({ user: found, isAuthenticated: true });
          return { success: true };
        }

        // Generic mock login if not matched
        const newUser: User = {
          id: `usr-new-${Date.now()}`,
          name: email.split("@")[0],
          email,
          role: "customer",
          addresses: [],
          createdAt: new Date().toISOString(),
        };
        set({ user: newUser, isAuthenticated: true });
        return { success: true };
      },

      switchRole: (role: UserRole) => {
        const targetUser = mockUsers.find((u) => u.role === role);
        if (targetUser) {
          set({ user: targetUser, isAuthenticated: true });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },
    }),
    {
      name: "cureline_auth_storage",
    }
  )
);
