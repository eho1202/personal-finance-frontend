'use client'
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
import { createClient } from "@/lib/supabase/client"
import { authFormSchema } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { useWatch } from "react-hook-form"
import { IconAlertCircle, IconCheck, IconCircle } from "@tabler/icons-react"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const formSchema = authFormSchema("sign-up");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  const passwordValue = useWatch({ control: form.control, name: "password" })

  const requirements = [
    { label: "At least 8 characters", met: passwordValue?.length >= 8 },
    { label: "At least 1 uppercase letter", met: /[A-Z]/.test(passwordValue ?? "") },
    { label: "At least 1 number", met: /[0-9]/.test(passwordValue ?? "") },
    { label: "At least 1 special character", met: /[^A-Za-z0-9]/.test(passwordValue ?? "") },
  ]

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: value.email,
        password: value.password,
        options: {
          data: {
            first_name: value.first_name,
            last_name: value.last_name,
          }
        }
      })

      if (error) {
        setSignUpError(error.message);
        return;
      }

      router.push("/dashboard")
    } catch (err: any) {
      setSignUpError(err ?? "Something went wrong, please try again.")
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-row gap-4">
              <Field>
                <FieldLabel htmlFor="first_name">First Name</FieldLabel>
                <Input id="first_name" type="text" placeholder="John" required {...form.register("first_name")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                <Input id="last_name" type="text" placeholder="Doe" required {...form.register("last_name")} />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...form.register("email")}
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required {...form.register("password")} />
              <div className="mt-2 space-y-1">
                {requirements.map((req) => (
                  <div key={req.label} className="flex items-center gap-2 text-sm">
                    <span className={req.met ? "text-green-500" : "text-muted-foreground"}>
                      {req.met ? <IconCheck className="size-2.5" /> : <IconCircle className="size-2.5" />}
                    </span>
                    <span className={req.met ? "text-green-500" : "text-muted-foreground"}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" required {...form.register("confirmPassword")} />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            {signUpError && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400 px-3 py-2 rounded-md">
                <IconAlertCircle className="w-4 h-4 flex-shrink-0" />
                <p>{signUpError}</p>
              </div>
            )}
            <FieldGroup>
              <Field>
                <Button type="submit" >Create Account</Button>
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/sign-in">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
