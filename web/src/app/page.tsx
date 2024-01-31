"use client";
import { useRouter } from "next/navigation";
import { RegisterForm } from "./components/RegisterForm";
import { HeaderNav } from "./ui/HeaderNav";
import { InfoModal } from "./ui/charts/InfoModal";
import { DashboardStickyHeader } from "./ui/dashboard/DashboardStickyHeader";
import { DashboardView } from "./ui/dashboard/DashboardView";
import { trpc } from "./utils/trpc";

function Home() {
  const { data, isLoading } = trpc.getMe.useQuery();
  const { mutateAsync } = trpc.login.useMutation();
  let router = useRouter();

  if (isLoading) {
    return null;
  }

  if (!data?.user) {
    router.push("/register");
  }

  return (
    <main className="page flex flex-col">
      <HeaderNav />
      <DashboardView />
    </main>
  );
}

export default trpc.withTRPC(Home);
