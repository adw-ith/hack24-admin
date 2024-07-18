"use client";
import Login from "@/components/login";
import Teams from "@/components/teams";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function Home() {
  const { signedIn, setSignedIn } = useAuth();
  return signedIn ? <Teams /> : <Login />;
}
