"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useAuth } from "@/hooks/useAuth"
import { Locale } from "@/types"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
  params: { locale: Locale }
}

export default function SignInPage({ params: { locale } }: Props) {
  const t = useTranslations()
  const { signIn, loading } = useAuth()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    await signIn(
      {
        userNameOrEmail: values.email,
        password: values.password,
      },
      locale
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex flex-1 items-center justify-center px-4">
        <Card className="w-full max-w-md space-y-8 p-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="relative h-12 w-32">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-[#25466A]">
              {t("auth.sign_in")}
            </h1>
            <p className="text-center text-sm text-gray-500">
              {t("auth.sign_in_description")}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.email")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        className="h-12"
                        placeholder={t("auth.email_placeholder")}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.password")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        autoComplete="current-password"
                        className="h-12"
                        placeholder={t("auth.password_placeholder")}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-12 w-full bg-[#00ADEE] text-base font-medium hover:bg-[#00ADEE]/90"
                disabled={loading}
              >
                {loading ? t("common.loading") : t("auth.sign_in")}
              </Button>
            </form>
          </Form>
        </Card>
      </main>
    </div>
  )
}
