import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const { handleRegister, loading, error } = useRegister();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [focused, setFocused] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegister(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg)] text-[var(--text)] transition-all duration-300">

      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, var(--text) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity: 0.06,
        }}
      />

      {/* 🔥 Wider Card */}
      <div
        className="relative w-full max-w-sm p-8 transition-all duration-300"
        style={{
          background: "var(--bg)",
          border: "1px solid color-mix(in srgb, var(--text) 12%, transparent)",
          boxShadow:
            "0 24px 64px color-mix(in srgb, var(--text) 6%, transparent)",
        }}
      >
        {/* Corners */}
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
        <div className="flex items-center gap-2.5 mb-1">
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

        {/* Heading */}
        <h1 className="font-serif text-[2.2rem] font-black mt-4 mb-1 leading-none">
          Create account.
        </h1>

        <p className="text-[10px] font-mono uppercase mb-6 opacity-60">
          Start your journey
        </p>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--text) 15%, transparent), transparent)",
          }}
        />

        <form onSubmit={onSubmit} className="space-y-4">

          {/* Name */}
          <Input
            label="Full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            focused={focused}
            setFocused={setFocused}
          />

          {/* Email */}
          <Input
            label="Email address"
            name="email"
            value={form.email}
            onChange={handleChange}
            focused={focused}
            setFocused={setFocused}
          />

          {/* Password */}
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            focused={focused}
            setFocused={setFocused}
          />

          {/* Error */}
          {error && (
            <div className="text-[10px] text-center text-red-500 border border-red-500/20 p-2">
              ⚠ {error}
            </div>
          )}

          {/* 🔥 Animated Button (same as login) */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full py-3 font-mono text-[11px] tracking-[0.22em] uppercase overflow-hidden mt-2"
            style={{
              background: "var(--text)",
              color: "var(--bg)",
            }}
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
              style={{ background: "var(--bg)" }}
            />

            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                border:
                  "1px solid color-mix(in srgb, var(--text) 40%, transparent)",
              }}
            />

            <span className="relative z-10 flex justify-center">
              <HoverText loading={loading} />
            </span>
          </button>
        </form>

        {/* Footer */}
        <p className="mt-5 text-center text-[10px] opacity-60">
          Already have an account?{" "}
          <a href="/login">Login →</a>
        </p>
      </div>
    </div>
  );
};

/* 🔥 SAME INPUT SYSTEM AS LOGIN */
const Input = ({
  label,
  name,
  value,
  onChange,
  focused,
  setFocused,
  type = "text",
}) => {
  return (
    <div>
      <label
        className="text-[9px] uppercase mb-2 block"
        style={{
          color:
            focused === name
              ? "var(--text)"
              : "color-mix(in srgb, var(--text) 40%, transparent)",
        }}
      >
        {label}
      </label>

      <div
        className="relative"
        style={{
          border:
            focused === name
              ? "1px solid var(--text)"
              : "1px solid color-mix(in srgb, var(--text) 15%, transparent)",
          background:
            focused === name
              ? "color-mix(in srgb, var(--text) 3%, transparent)"
              : "transparent",
        }}
      >
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused("")}
          className="w-full px-3 py-2.5 bg-transparent outline-none"
        />

        <div
          className="absolute bottom-0 left-0 h-[1.5px] transition-all duration-300"
          style={{
            width: focused === name ? "100%" : "0%",
            background: "var(--text)",
          }}
        />
      </div>
    </div>
  );
};

/* 🔥 BUTTON TEXT ANIMATION */
const HoverText = ({ loading }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? "var(--text)" : "var(--bg)" }}
    >
      {loading ? "Creating..." : "Sign Up"}
    </span>
  );
};

export default Register;