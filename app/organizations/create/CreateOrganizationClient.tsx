'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormField from '@/components/forms/FormField';
import FormCard from '@/components/forms/FormCard';
import FormErrorBanner from '@/components/forms/FormErrorBanner';

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
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      router.push('/organizations?success=1');
      router.refresh();
    } catch (err) {
      console.error('Error creating organization:', err);
      setFormError('Something went wrong while submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="px-4 py-8 md:flex-1 md:p-12 md:overflow-y-auto mt-0 flex flex-col items-center">
        {formError && <FormErrorBanner message={formError} onClose={() => setFormError(null)} />}

        <FormCard
            title="Organizations/Create"
            backHref="/organizations"
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitLabel="Create Organization"
        >
          <FormField label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
          <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
          <FormField label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
          <FormField label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
          <FormField label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
          <FormField label="Province/State" name="province" value={formData.province} onChange={handleChange} error={errors.province} />
          <FormField
              label="Country"
              name="country"
              as="select"
              value={formData.country}
              onChange={handleChange}
              error={errors.country}
              options={[
                { value: 'CA', label: 'Canada' },
                { value: 'US', label: 'United States' },
              ]}
          />
          <FormField label="Postal code" name="postal_code" value={formData.postal_code} onChange={handleChange} error={errors.postal_code} />
        </FormCard>
      </div>
  );
}
