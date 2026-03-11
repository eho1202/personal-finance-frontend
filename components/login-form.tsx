'use client'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { authFormSchema, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { IconAlertCircle } from '@tabler/icons-react'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  const formSchema = authFormSchema("sign-in");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: value.email,
        password: value.password,
      })
      
      if (error) {
        setSignInError(error.message);
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      setSignInError(err ?? "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...form.register("email")}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required {...form.register("password")} />
              </Field>

              {signInError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400 px-3 py-2 rounded-md">
                  <IconAlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p>{signInError}</p>
                </div>
              )}
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Login"}
                </Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/sign-up">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
