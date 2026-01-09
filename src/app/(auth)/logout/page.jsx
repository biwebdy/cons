import { logoutAction } from "@/data/services/auth-service";

export const dynamic = "force-dynamic";

export default function page({}) {
  logoutAction();
}
