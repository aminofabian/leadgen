import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { BeatLoader } from "react-spinners";

const VerificationForm = dynamic(
  () => import('@/components/auth/verification-form').then(mod => mod.VerificationForm),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full w-full">
        <div className="p-6 rounded-lg bg-white/10 flex items-center flex-col gap-4">
          <h1 className="text-2xl font-semibold text-white">
            Loading...
          </h1>
          <BeatLoader color="#f059da" />
        </div>
      </div>
    )
  }
);

export default function NewVerificationPage() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Suspense
        fallback={
          <div className="p-6 rounded-lg bg-white/10 flex items-center flex-col gap-4">
            <h1 className="text-2xl font-semibold text-white">
              Loading...
            </h1>
            <BeatLoader color="#f059da" />
          </div>
        }
      >
        <VerificationForm />
      </Suspense>
    </div>
  );
}