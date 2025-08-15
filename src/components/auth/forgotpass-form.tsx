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
import { AlertCircleIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/authcontext"
import { motion, AnimatePresence } from 'framer-motion'

export function ForgotPassForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { signIn, signInWithGoogle } = useAuth()


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        // const form = e.target as HTMLFormElement
        // const email = (form.elements.namedItem("email") as HTMLInputElement).value
        // const password = (form.elements.namedItem("password") as HTMLInputElement).value

        setLoading(true)
        setError('')

        const { error } = await signIn(email, password)
        if (error) {
            setError("Sign In Failed: " + error.message)
            setLoading(false)
        } else {
            navigate("/", { replace: true })
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
                        <CardTitle>Recover Your Password</CardTitle>
                        <CardDescription>
                            You'll receive an email with instructions to reset your password.
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
                            </AnimatePresence>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        // name="email"
                                        placeholder="user@example.com"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? <span className="loading loading-ring loading-sm"></span> : 'Send Reset Link'}
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Do you remember the password?{" "}
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
