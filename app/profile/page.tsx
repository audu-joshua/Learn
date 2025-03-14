"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-contex"
import { uploadAvatar } from "@/lib/supabase"

const profileSchema = z.object({
  full_name: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional(),
  phone: z.string().optional(),
  bio: z.string().max(500, { message: "Bio must be less than 500 characters" }).optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const { user, profile, updateProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      email: profile?.email || user?.email || "",
      phone: profile?.phone || "",
      bio: profile?.bio || "",
    },
  })

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return

    setIsLoading(true)
    try {
      const { error } = await updateProfile({
        full_name: data.full_name,
        phone: data.phone || undefined,
        bio: data.bio || undefined,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        toast({
          variant: "destructive",
          title: "Profile update failed",
          description: error.message || "Please try again.",
        })
        return
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Profile update failed",
        description: error.message || "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !event.target.files || event.target.files.length === 0) return

    const file = event.target.files[0]
    const fileSize = file.size / 1024 / 1024 // in MB

    if (fileSize > 2) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload an image smaller than 2MB.",
      })
      return
    }

    setIsUploading(true)
    try {
      const { data, error } = await uploadAvatar(user.id, file)

      if (error) {
        toast({
          variant: "destructive",
          title: "Avatar upload failed",
          description: error.message || "Please try again.",
        })
        return
      }

      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Avatar upload failed",
        description: error.message || "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsUploading(false)
    }
  }

  if (!user || !profile) {
    return (
      <div className="container max-w-2xl mx-auto py-16 px-4 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-4 text-muted-foreground">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl mx-auto py-16 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and account settings</p>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={profile.avatar_url || "/placeholder.svg?height=96&width=96"} alt={profile.full_name} />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                {profile.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2">
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleAvatarUpload}
                  disabled={isUploading}
                />
                <Button
                  size="icon"
                  className="h-8 w-8 rounded-full bg-primary text-primary-foreground"
                  disabled={isUploading}
                >
                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h2 className="text-xl font-semibold">{profile.full_name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {profile.role === "student"
                ? "Student"
                : profile.role === "school_admin"
                  ? "School Administrator"
                  : profile.role === "teacher"
                    ? "Teacher"
                    : profile.role === "parent"
                      ? "Parent"
                      : "User"}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormDescription>
                      Email cannot be changed. Contact support if you need to update your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Optional. Used for account recovery and notifications.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us a little about yourself"
                        className="resize-none"
                        rows={4}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional. Share a bit about yourself, your interests, or your goals.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

