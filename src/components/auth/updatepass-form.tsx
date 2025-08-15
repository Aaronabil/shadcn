import { cn } from "@/lib/utils"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"
// import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/authcontext"
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

export function UpdatePassForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { user, updatePassword } = useAuth()

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        setLoading(true)
        setError('')
        setSuccess('')

        if (!user) {
            setError("Anda harus login untuk memperbarui password.")
            setLoading(false)
            return
        }

        if (!validateEmail(email)) {
            setError("Email tidak valid.")
            setLoading(false)
            return
        }

        if (user.email !== email) {
            setError("Email tidak sesuai dengan email yang sedang login.")
            setLoading(false)
            return
        }

        if (!newPassword) {
            setError("Password baru tidak boleh kosong.")
            setLoading(false)
            return
        }

        const { error } = await updatePassword(newPassword)
        if (error) {
            setError(" " + error.message)
            setLoading(false)
        } else {
            setSuccess("Password berhasil diperbarui!")
            setLoading(false)
        }
    }


    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card>
                    <CardHeader>
                        <CardTitle>Update Your Password</CardTitle>
                        <CardDescription>
                            Update your email or password.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="mb-4"
                                    >
                                        <Alert variant="destructive">
                                            <AlertCircleIcon />
                                            <AlertTitle>{error}</AlertTitle>
                                        </Alert>
                                    </motion.div>
                                )}
                                {success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="mb-4"
                                    >
                                        <Alert className="text-green-500">
                                            <CheckCircle2Icon />
                                            <AlertTitle>{success}</AlertTitle>
                                        </Alert>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="user@example.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <div className="relative"> {/* Add relative positioning for icon */}
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Create a new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? <span className="loading loading-ring loading-sm"></span> : 'Update The Password'}
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Have you changed your password?{" "}
                                <Link to="/login" className="underline underline-offset-4">
                                    Sign In
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    )
}
