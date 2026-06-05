import { useState } from "react";

function Hello() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation Rules
  const emailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const passwordValid =
    formData.password.length >= 8 &&
    /\d/.test(formData.password);

  // Error Messages
  const emailError =
    formData.email && !emailValid
      ? "Please enter a valid email address."
      : "";

  const passwordError =
    formData.password && !passwordValid
      ? "Password must be at least 8 characters and contain a number."
      : "";

  // Disable button if either field is invalid
  const isFormInvalid =
    !emailValid || !passwordValid;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormInvalid) {
      alert("Login Successful!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <br />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          {emailError && (
            <p style={{ color: "red" }}>
              {emailError}
            </p>
          )}
        </div>

        <br />

        <div>
          <label>Password:</label>
          <br />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />

          {passwordError && (
            <p style={{ color: "red" }}>
              {passwordError}
            </p>
          )}
        </div>

        <br />

        <button
          type="submit"
          disabled={isFormInvalid}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Hello;