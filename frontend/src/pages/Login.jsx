import { useContext, useState } from "react";
import { GlobalContext } from "../store/UserContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const{getData} = useContext(GlobalContext);

  const validate = (fields = form) => {
    const errs = {};

    if (!fields.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      errs.email = "Enter a valid email.";

    if (!fields.password) errs.password = "Password is required.";
    else if (fields.password.length < 6)
      errs.password = "Password must be at least 6 characters.";

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // live-validate only updated field
    setErrors((prev) => ({
      ...prev,
      ...validate({ ...form, [name]: value }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate();
    setErrors(validation);

    if (Object.keys(validation).length) return;

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:9000/api/user/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:"include",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Login failed.");
      }

      const data = await res.json();
      setMessage({ type: "success", text: data.message || "Login successful." });

      setForm({ email: "", password: "" });
      getData();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <label className="block mb-3">
            <span className="text-sm font-medium">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`mt-1 block w-full rounded-lg border p-2 outline-none 
                ${errors.email ? "border-red-300" : "border-gray-200"}`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </label>

          {/* Password */}
          <label className="block mb-4 relative">
            <span className="text-sm font-medium">Password</span>
            <div className="mt-1">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Your password"
                className={`block w-full rounded-lg border p-2 pr-10 outline-none
                  ${errors.password ? "border-red-300" : "border-gray-200"}`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-9 text-sm opacity-70">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 rounded-xl bg-sky-600 text-white font-medium disabled:opacity-60">
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
