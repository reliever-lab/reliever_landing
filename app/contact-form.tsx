"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldChangeEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

const initialFormData = {
  industry: "",
  role: "",
  companySize: "",
  email: "",
  automationNeeds: "",
  website: "",
};

const companySizeOptions = ["1-10", "11-50", "51-200", "201-500", "501+"];

export function ContactForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");

  const updateField =
    (field: keyof typeof initialFormData) =>
    (event: FieldChangeEvent) => {
      setStatus((current) => (current === "submitting" ? current : "idle"));
      setFormData((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFormData(initialFormData);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>업종</span>
          <input
            autoComplete="off"
            name="industry"
            onChange={updateField("industry")}
            placeholder="예: SaaS, 제조, 금융"
            required
            type="text"
            value={formData.industry}
          />
        </label>

        <label>
          <span>직책</span>
          <input
            autoComplete="organization-title"
            name="role"
            onChange={updateField("role")}
            placeholder="예: CTO, Engineering Manager"
            required
            type="text"
            value={formData.role}
          />
        </label>

        <label>
          <span>회사 규모</span>
          <select
            name="companySize"
            onChange={updateField("companySize")}
            required
            value={formData.companySize}
          >
            <option value="">선택해 주세요</option>
            {companySizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>이메일 주소</span>
          <input
            autoComplete="email"
            name="email"
            onChange={updateField("email")}
            placeholder="name@company.com"
            required
            type="email"
            value={formData.email}
          />
        </label>
      </div>

      <label>
        <span>자동화를 원하는 업무</span>
        <textarea
          name="automationNeeds"
          onChange={updateField("automationNeeds")}
          placeholder="슬랙에서 반복적으로 처리하고 싶은 질문, 리포트, 검토, 승인 업무를 알려주세요."
          required
          rows={5}
          value={formData.automationNeeds}
        />
      </label>

      <label className="honeypot-field" aria-hidden="true">
        <span>Website</span>
        <input
          autoComplete="off"
          name="website"
          onChange={updateField("website")}
          tabIndex={-1}
          type="text"
          value={formData.website}
        />
      </label>

      <button className="primary-button" disabled={isSubmitting} type="submit">
        {isSubmitting ? "전송 중..." : "문의 보내기"}
      </button>

      <div className="form-status" aria-live="polite">
        {status === "success" && (
          <p className="success-message">
            문의가 접수되었습니다. 곧 연락드리겠습니다.
          </p>
        )}
        {status === "error" && (
          <p className="error-message">
            전송에 실패했습니다. 잠시 후 다시 시도해주세요.
          </p>
        )}
      </div>
    </form>
  );
}
