"use client";
import { useStoreContext } from "@/context/authContext";


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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Are you sure you want to log out?
        </h2>
        <p className="text-gray-600 mb-6">
          You’ll need to sign in again to access your account.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Yes, Log Out
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            No, Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
