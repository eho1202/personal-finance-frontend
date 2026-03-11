import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';

const Home = async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/sign-in")
  redirect("/dashboard")
}

export default Home;