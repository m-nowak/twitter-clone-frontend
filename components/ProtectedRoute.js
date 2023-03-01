import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAccount } from "../contexts/AccountContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router, isAuthenticated]);

  return <>{isAuthenticated ? children : null}</>;
}
