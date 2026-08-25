import React, { useState } from "react";
import {
  Mail,
  Send,
} from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] =
    useState({});

  const [success, setSuccess] =
    useState(false);

  const handleChange = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name =
        "Name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email =
        "Email is required.";
    } else if (
      !/^\S+@\S+\.\S+$/.test(
        form.email
      )
    ) {
      nextErrors.email =
        "Enter a valid email.";
    }

    if (!form.subject.trim()) {
      nextErrors.subject =
        "Subject is required.";
    }

    if (!form.message.trim()) {
      nextErrors.message =
        "Message is required.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors =
      validate();

    setErrors(validationErrors);

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      return;
    }

    localStorage.setItem(
      "vibeai_contact",
      JSON.stringify({
        ...form,
        createdAt:
          new Date().toISOString(),
      })
    );

    setSuccess(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="page narrow-page">
      <section className="page-header">
        <span className="eyebrow">
          <Mail size={15} />
          Contact
        </span>

        <h1>
          How can we help?
        </h1>

        <p>
          Send us a message and our team
          will get back to you.
        </p>
      </section>

      {success && (
        <div className="success-box">
          Your message was submitted
          successfully.
        </div>
      )}

      <form
        className="form-card"
        onSubmit={handleSubmit}
      >
        <label>
          Name

          <input
            value={form.name}
            onChange={(event) =>
              handleChange(
                "name",
                event.target.value
              )
            }
          />

          {errors.name && (
            <small className="field-error">
              {errors.name}
            </small>
          )}
        </label>

        <label>
          Email

          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              handleChange(
                "email",
                event.target.value
              )
            }
          />

          {errors.email && (
            <small className="field-error">
              {errors.email}
            </small>
          )}
        </label>

        <label>
          Subject

          <input
            value={form.subject}
            onChange={(event) =>
              handleChange(
                "subject",
                event.target.value
              )
            }
          />

          {errors.subject && (
            <small className="field-error">
              {errors.subject}
            </small>
          )}
        </label>

        <label>
          Message

          <textarea
            rows="6"
            value={form.message}
            onChange={(event) =>
              handleChange(
                "message",
                event.target.value
              )
            }
          />

          {errors.message && (
            <small className="field-error">
              {errors.message}
            </small>
          )}
        </label>

        <button
          className="btn btn-primary"
          type="submit"
        >
          <Send size={17} />
          Send message
        </button>
      </form>
    </main>
  );
};

export default Contact;