'use client';

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { newVerification } from "@/actions/new-verification";

export function VerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  
  const searchParams = useSearchParams();

  const onSubmit = useCallback(async () => {
    try {
      const token = searchParams.get("token");
      
      if (!token) {
        setError("Missing token!");
        return;
      }

      const data = await newVerification(token);
      
      setSuccess(data.success);
      setError(data.error);
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="p-6 rounded-lg bg-white/10 flex items-center flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isLoading ? "Verifying your email" : success ? "Email Verified" : "Verification Failed"}
      </h1>
      {isLoading && (
        <BeatLoader color="#f059da" />
      )}
      <FormSuccess message={success} />
      <FormError message={error} />
    </div>
  );
} 