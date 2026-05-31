import { AuthPanel } from "@/components/client/auth-panel";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("إنشاء حساب", "واجهة إنشاء حساب مستقبلية قابلة للربط مع SSO Darhous.");

export default function RegisterPage() {
  return <AuthPanel mode="register" />;
}
