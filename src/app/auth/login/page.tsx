import { AuthPanel } from "@/components/client/auth-panel";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("تسجيل الدخول", "واجهة تسجيل دخول مستقبلية قابلة للربط مع SSO Darhous.");

export default function LoginPage() {
  return <AuthPanel mode="login" />;
}
