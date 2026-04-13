"use client";
import { useStoreContext } from "@/context/authContext";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

const Logout = ({
  setTab,
}: {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { setAuth, setToken } = useStoreContext();
  const handleConfirm = () => {
    setAuth({ authenticate: false, user: null });
    setToken(null);
    localStorage.removeItem("token");
  };
  const handleCancel = () => {
    setTab("dashboard"); // Redirect to homepage or dashboard if the user cancels
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
        <div className="flex flex-col items-center text-center">
          <div className="p-4 rounded-full bg-red-500/10 mb-6">
             <LogOut className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-white">
            Log Out Confirmation
          </h2>
          <p className="text-gray-400 mb-8 max-w-sm">
            Are you sure you want to end your session? You will need to sign in again to manage your courses.
          </p>
          <div className="flex w-full gap-4">
            <button
              onClick={handleCancel}
              className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all active:scale-[0.98]"
            >
              Log Out
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Logout;
