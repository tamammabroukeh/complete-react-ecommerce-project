import React from "react";
import { Suspense } from "react";
import { LottieHandler } from "..";
const SuspenseFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <LottieHandler type="loading" message="please wait while loading..." />
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseFallback;
