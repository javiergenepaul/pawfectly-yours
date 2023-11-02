"use client";

import LoadingMask from "@/components/loading-mask";
import NavigationBar from "@/components/navigation-bar";
import { DataTableDemo } from "@/components/table-example";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function Home() {
  const queryClient = useQueryClient();

  const [showTable, setShowTable] = React.useState<boolean>(false);

  const { isError, data, error, isFetching, refetch, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => axiosInstance.get("api/auth/hello-world"),
    enabled: showTable,
  });

  if (isError) {
    toast({
      variant: "destructive",
      description:
        "Oops. There is something wrong with the server, please try again later.",
    });
  }

  const sampleHelloWorld = () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  return (
    <main className="flex p-12 flex-col h-screen">
      <LoadingMask isLoading={isLoading} />
      <NavigationBar />
      {JSON.stringify(data?.data)}

      <DataTableDemo />
      <Button className="mb-2" onClick={() => setShowTable(true)}>
        set show table
      </Button>
      <Button className="mb-2" onClick={sampleHelloWorld}>
        invalidate
      </Button>
    </main>
  );
}
