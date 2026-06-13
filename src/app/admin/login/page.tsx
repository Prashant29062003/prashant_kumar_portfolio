import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
            <p className="text-muted-foreground text-sm">
              Enter your password to continue.
            </p>
          </div>
          <form action={login} className="space-y-4">
            <Input
              name="password"
              type="password"
              required
              autoFocus
              placeholder="Password"
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
