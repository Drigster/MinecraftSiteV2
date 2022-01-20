import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import redirect from "nextjs-redirect"

export default function Admin() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
        console.log("Unauthenticated");
        router.push(`${process.env.NEXTAUTH_URL}/login`)
    }
  })

  if (status === "loading") {
    return "Loading..."
  }

  return "User is logged in"
}