'use client';

import React from 'react';

interface FormFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    error?: string[];
    type?: string;
    as?: 'input' | 'select';
    options?: { value: string; label: string }[];
}

export default function FormField({
                                      label,
                                      name,
                                      value,
                                      onChange,
                                      error,
                                      type = 'text',
                                      as = 'input',
                                      options = [],
                                  }: FormFieldProps) {
    const baseClasses = `form-input w-[95%] ${error ? 'form-input-error' : ''}`;

    return (
        <div className="pb-8 pr-6 w-full lg:w-1/2">
            <label htmlFor={name} className="form-label">
                {label}:
            </label>

            {as === 'select' ? (
                <select id={name} name={name} value={value} onChange={onChange} className={baseClasses}>
                    <option value="">Select {label.toLowerCase()}</option>
                    {options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input id={name} name={name} type={type} value={value} onChange={onChange} className={baseClasses} />
            )}

            {error && <p className="form-error-text">{error[0]}</p>}
        </div>
    );
}
