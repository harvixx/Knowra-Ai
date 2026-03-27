import { useVerify } from "../hooks/useVerify";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const { handleResend, loading, success, error } = useVerify();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg)] text-[var(--text)]">

      <div className="w-full max-w-sm p-8 border">
        
        <h2 className="text-xl font-bold mb-4 text-center">
          Verify your email
        </h2>

        <p className="text-sm text-center opacity-70 mb-6">
          We’ve sent a verification link to your email.  
          Please check your inbox.
        </p>

        {/* Resend Button */}
        <button
          onClick={handleResend}
          disabled={loading}
          className="w-full py-2 bg-[var(--text)] text-[var(--bg)]"
        >
          {loading ? "Sending..." : "Send Verification Request"}
        </button>

        {/* Success */}
        {success && (
          <p className="text-green-500 text-sm text-center mt-4">
            {success}
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-4">
            {error}
          </p>
        )}

        {/* Change Email */}
        <p className="text-xs text-center mt-6 opacity-70">
          Wrong email?{" "}
          <span
            className="cursor-pointer underline"
            onClick={() => navigate("/register")}
          >
            Change Email
          </span>
        </p>
      </div>
    </div>
  );
};

export default Verify;