import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="backdrop flex min-h-svh flex-col items-center justify-center gap-6 bg-transparent px-2! md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
