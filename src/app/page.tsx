import NavigationBar from "@/components/navigation-bar";
import { DataTableDemo } from "@/components/table-example";
import React from "react";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className="flex p-12 flex-col h-screen">
      <NavigationBar />
      {session?.user?.name ? (
        <> SessinResult {session?.user?.name}</>
      ) : (
        <>you are not login</>
      )}

      <DataTableDemo />
    </main>
  );
}
