"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Member = () => {
  const router = useRouter();
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin?callbackUrl=/ClientMember");
    },
  });
  
  return (
    <div>
      <h1>Member Client Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
};

export default Member;
