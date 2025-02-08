
import { auth } from "@/auth";
import { Button } from "@/components/ui/button"
import Hero from "@/sections/Hero";
import TrendDestination from "@/sections/TrendDestination";
import { doLogout } from "./actions";
import DashboardRedirect from "@/components/ClientNavigation";



export default async function Home() {
  const session = await auth();

  return (
    session?.user?.role == null || session?.user?.role == 'user' ? (
      <div className="px-10">
      <Hero/>
      {/* <TrendDestination/> */}

      <h1 className="text-3xl mt-[50px]">
        Welcome, {session?.user?.role}
        <form action={doLogout}>
            <button className="bg-blue-400 my-2 text-white p-1 rounded" type="submit">Logout</button>
        </form>
      </h1>

    </div>
    ):(
      <DashboardRedirect role={session?.user?.role}/>
    )
  );
}
