'use client';

import React from "react";

interface FormCardProps {
    title: string;
    backHref: string;
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
    submitLabel: string;
}

export default function FormCard({
                                     title,
                                     backHref,
                                     children,
                                     onSubmit,
                                     isSubmitting,
                                     submitLabel,
                                 }: FormCardProps) {
    return (
        <>
            <h1 className="mb-8 text-3xl font-bold self-start ml-2">
                <a href={backHref} className="text-indigo-400 hover:text-indigo-600 transition-colors">
                    {title.split('/')[0]}
                </a>
                <span className="text-indigo-400 font-medium mx-1">/</span>
                {title.split('/')[1]}
            </h1>

            <div className="w-full max-w-2xl bg-white rounded-md shadow overflow-hidden ml-2 -mt-2">
                <form onSubmit={onSubmit}>
                    <div className="flex flex-wrap -mb-8 -mr-6 p-8">{children}</div>
                    <div className="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? 'Creating...' : submitLabel}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
