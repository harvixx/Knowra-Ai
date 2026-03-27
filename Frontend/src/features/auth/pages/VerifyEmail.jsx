import { useVerifyEmail } from "../hooks/useVerifyEmail";

const VerifyEmail = () => {
  const { status } = useVerifyEmail();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg)] text-[var(--text)] transition-all duration-300">

      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--text) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity: 0.05,
        }}
      />

      <div
        className="relative w-full max-w-sm p-10 transition-all duration-300"
        style={{
          background: "var(--bg)",
          border: "1px solid color-mix(in srgb, var(--text) 12%, transparent)",
          boxShadow:
            "0 24px 64px color-mix(in srgb, var(--text) 6%, transparent)",
        }}
      >
        {/* Corner accents */}
        {[
          "top-0 left-0 border-t-2 border-l-2",
          "top-0 right-0 border-t-2 border-r-2",
          "bottom-0 left-0 border-b-2 border-l-2",
          "bottom-0 right-0 border-b-2 border-r-2",
        ].map((cls, i) => (
          <span
            key={i}
            className={`absolute w-3.5 h-3.5 ${cls}`}
            style={{ borderColor: "var(--text)" }}
          />
        ))}

        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-6">
          <div
            className="w-7 h-7 flex items-center justify-center border-2"
            style={{ borderColor: "var(--text)" }}
          >
            <div
              className="w-2.5 h-2.5 rotate-45"
              style={{ background: "var(--text)" }}
            />
          </div>

          <span className="font-serif text-xl font-bold">Knowra</span>

          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 border">
            AI
          </span>
        </div>

        {/* Content */}
        {status === "loading" && (
          <>
            <h1 className="font-serif text-2xl font-bold mb-2">
              Verifying...
            </h1>
            <p className="text-xs opacity-60">
              Please wait while we verify your email.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="font-serif text-2xl font-bold mb-2">
              Verified 🎉
            </h1>
            <p className="text-xs opacity-60">
              Your email has been verified successfully. Redirecting...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="font-serif text-2xl font-bold mb-2">
              Verification Failed ❌
            </h1>
            <p className="text-xs opacity-60">
              Invalid or expired link. Please try again.
            </p>
          </>
        )}

        {/* Divider */}
        <div className="h-px mt-8 opacity-20 bg-current" />
      </div>
    </div>
  );
};

export default VerifyEmail;