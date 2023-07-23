import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

export default function AuthProvider({children}: {children: ReactNode}) {
    return (
        <ClerkProvider>
            {children}
        </ClerkProvider>
    )
}