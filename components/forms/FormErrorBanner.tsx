'use client';

interface FormErrorBannerProps {
    message: string | null;
    onClose: () => void;
}

export default function FormErrorBanner({ message, onClose }: FormErrorBannerProps) {
    if (!message) return null;

    return (
        <div className="mb-6 flex items-center justify-between rounded-md bg-red-500 px-4 py-3 text-white shadow w-full max-w-2xl">
            <div className="flex items-center space-x-2">
                <svg
                    className="w-5 h-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
                </svg>
                <span>{message}</span>
            </div>
            <button type="button" onClick={onClose} className="text-white hover:text-gray-200">
                ×
            </button>
        </div>
    );
}
