import "@/styles/global.css";

import { createCtx } from '@reatom/core'
import { reatomContext, useUpdate } from '@reatom/npm-react'
import { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { usePageContext } from "vike-react/usePageContext";
import { pageContextAtom } from "@/lib/global.model";

const ctx = createCtx()

const Sync = () => {
  const pageContext = usePageContext();
  useUpdate((ctx) => pageContextAtom(ctx, pageContext), [pageContext]);
  return null
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <reatomContext.Provider value={ctx}>
      <Sync />
      <div className="bg-white min-h-screen w-full flex flex-col items-center overflow-hidden">
        <Header />
        <div className="flex flex-col items-center justify-center w-full h-full">
          {children}
        </div>
        <Footer />
      </div>
    </reatomContext.Provider>
  )
}