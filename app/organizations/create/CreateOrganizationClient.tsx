'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateOrganizationClient() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    country: '',
    postal_code: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setFormError(null);

    try {
      const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('auth-token='))
          ?.split('=')[1];

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
          Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (res.status === 422) {
        const data = await res.json();
        setErrors(data.errors || {});
        setFormError('There is one form error.');
        setIsSubmitting(false);
        return;
      }

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      router.push('/organizations');
      router.refresh();
    } catch (err) {
      console.error('Error creating organization:', err);
      setFormError('Something went wrong while submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
      <div className="px-4 py-4 md:flex-1 md:px-10 md:py-6 md:overflow-y-auto mt-0">
        {formError && (
            <div className="mb-6 flex items-center justify-between rounded-md bg-red-500 px-4 py-3 text-white shadow">
              <div className="flex items-center space-x-2">
                <svg
                    className="w-5 h-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
                  />
                </svg>
                <span>{formError}</span>
              </div>
              <button
                  type="button"
                  onClick={() => setFormError(null)}
                  className="text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
        )}
        {/* Header */}
        <h1 className="mb-6 text-3xl font-bold ml-2">
          <a
              href="/organizations"
              className="text-indigo-400 hover:text-indigo-600 transition-colors"
          >
            Organizations
          </a>
          <span className="text-indigo-400 font-medium mx-1">/</span>
          Create
        </h1>

        {/* Form Card */}
        <div className="max-w-3xl bg-white rounded-md shadow overflow-hidden ml-2 -mt-2">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mb-8 -mr-6 p-8">
              {/* Name */}
              <div className="pb-8 pr-6 w-full lg:w-1/2">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input w-[95%] ${
                        errors.name ? 'form-input-error' : ''
                    }`}
                />
                {errors.name && (
                    <p className="form-error-text">{errors.name[0]}</p>
                )}
              </div>

              {/* Email */}
              <div className="pb-8 pr-6 w-full lg:w-1/2">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input w-[95%] ${
                        errors.email ? 'form-input-error' : ''
                    }`}
                />
                {errors.email && (
                    <p className="form-error-text">{errors.email[0]}</p>
                )}
              </div>

              {/* Phone */}
              <div className="pb-8 pr-6 w-full lg:w-1/2">
                <label htmlFor="phone" className="form-label">
                  Phone:
                </label>
                <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input w-[95%] ${
                        errors.phone ? 'form-input-error' : ''
                    }`}
                />
                {errors.phone && (
                    <p className="form-error-text">{errors.phone[0]}</p>
                )}
              </div>

              {/* Address */}
              <div className="pb-8 pr-6 w-full lg:w-1/2">
                <label htmlFor="address" className="form-label">
                  Address:
                </label>
                <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className={`form-input w-[95%] ${
                        errors.address ? 'form-input-error' : ''
                    }`}
                />
                {errors.address && (
                    <p className="form-error-text">{errors.address[0]}</p>
                )}
              </div>

              {/* City */}
              <div className="pb-8 pr-6 w-full lg:w-1/2">
                <label htmlFor="city" className="form-label">
                  City:
                </label>
                <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    className={`form-input w-[95%] ${
                        errors.city ? 'form-input-error' : ''
                    }`}
                />
                {errors.city && (
                    <p className="form-error-text">{errors.city[0]}</p>
                )}
              </div>

              {/* Province/State */}
              <div className="pb-8 pr-6 w-full lg:w-1/2">
                <label htmlFor="province" className="form-label">
                  Province/State:
                </label>
                <input
                    id="province"
                    name="province"
                    type="text"
                    value={formData.province}
                    onChange={handleChange}
                    className={`form-input w-[95%] ${
                        errors.province ? 'form-input-error' : ''
                    }`}
                />
                {errors.province && (
                    <p className="form-error-text">{errors.province[0]}</p>
                )}
              </div>

              {/* Country */}
              <div className="pb-8 pr-6 w-full lg:w-1/2">
                <label htmlFor="country" className="form-label">
                  Country:
                </label>
                <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`form-input w-[95%] ${
                        errors.country ? 'form-input-error' : ''
                    }`}
                >
                  <option value="">Select a country</option>
                  <option value="CA">Canada</option>
                  <option value="US">United States</option>
                </select>
                {errors.country && (
                    <p className="form-error-text">{errors.country[0]}</p>
                )}
              </div>

              {/* Postal Code */}
              <div className="pb-8 pr-6 w-full lg:w-1/2">
                <label htmlFor="postal_code" className="form-label">
                  Postal code:
                </label>
                <input
                    id="postal_code"
                    name="postal_code"
                    type="text"
                    value={formData.postal_code}
                    onChange={handleChange}
                    className={`form-input w-[95%] ${
                        errors.postal_code ? 'form-input-error' : ''
                    }`}
                />
                {errors.postal_code && (
                    <p className="form-error-text">{errors.postal_code[0]}</p>
                )}
              </div>
            </div>

            {/* Submit button */}
            <div className="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Organization'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}
