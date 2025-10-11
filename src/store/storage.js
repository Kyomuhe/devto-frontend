import { create } from "zustand";

const useSignupStore = create((set) => ({
  signupData: {},
  updateSignupData: (data) => set((state) => ({ signupData: { ...state.signupData, ...data } })),
  clearSignupData: () => set({ signupData: {} }),
}));

export default useSignupStore;