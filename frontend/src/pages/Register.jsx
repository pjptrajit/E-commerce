import { useEffect, useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);

  const validate = (fields = form) => {
    const errs = {};

    if (!fields.name.trim()) errs.name = "Name is required.";

    // Simple phone validation: accept digits, spaces, + and - with 7-15 chars
    if (!fields.phone.trim()) errs.phone = "Phone is required.";
    else if (!/^[\d +\-()]{7,20}$/.test(fields.phone)) errs.phone = "Enter a valid phone number.";

    if (!fields.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = "Enter a valid email.";

    if (!fields.password) errs.password = "Password is required.";
    else if (fields.password.length < 6) errs.password = "Password must be at least 6 characters.";
     
    return errs;
   
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setForm((prev)=>({...prev,[name]:value}));

    // live-validate single field
    setErrors((prev) => ({ ...prev, ...validate({...form,[name]:value}) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length) return;

    setSubmitting(true);
    setMessage(null);

    try {
      // Example POST request - change URL to your backend endpoint
      const res = await fetch("http://localhost:9000/api/user/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Registration failed");
      }

      const data = await res.json();
      setMessage({ type: "success", text: data.message || "Registered successfully." });
      setForm({ name: "", phone: "", email: "", password: "" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4">Create an account</h1>

        {message && (
          <div
            role="status"
            className={`mb-4 p-3 rounded ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <label className="block mb-2">
            <span className="text-sm font-medium">Full name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border p-2 outline-none focus:ring ${errors.name ? 'border-red-300' : 'border-gray-200'}`}
              placeholder="Your name"
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </label>

          <label className="block mb-2">
            <span className="text-sm font-medium">Phone</span>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border p-2 outline-none focus:ring ${errors.phone ? 'border-red-300' : 'border-gray-200'}`}
              placeholder="+1 555 555 555"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </label>

          <label className="block mb-2">
            <span className="text-sm font-medium">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border p-2 outline-none focus:ring ${errors.email ? 'border-red-300' : 'border-gray-200'}`}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </label>

          <label className="block mb-4 relative">
            <span className="text-sm font-medium">Password</span>
            <div className="mt-1">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className={`block w-full rounded-lg border p-2 pr-10 outline-none focus:ring ${errors.password ? 'border-red-300' : 'border-gray-200'}`}
                placeholder="At least 6 characters"
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-8 text-sm opacity-70"
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 rounded-xl bg-sky-600 text-white font-medium disabled:opacity-60">
            {submitting ? 'Creating...' : 'Create account'}
          </button>
        </form>
 
        <p className="mt-4 text-sm text-gray-600 text-center">
          By creating an account you agree to our <a className="underline">Terms</a>.
        </p>
      </div>
    </div>
  );
}
