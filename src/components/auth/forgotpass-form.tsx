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
// import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/authcontext"
import { motion, AnimatePresence } from 'framer-motion'

export function ForgotPassForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    // const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { resetPasswordForEmail } = useAuth()

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

        if (!validateEmail(email)) {
            setError("Invalid email.")
            setLoading(false)
            return
        }

        const { error } = await resetPasswordForEmail(email)
        if (error) {
            setError("Failed to send password reset link: " + error.message)
            setLoading(false)
        } else {
            setSuccess("Email valid. Please cek your email.")
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
                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? <span className="loading loading-ring loading-sm"></span> : 'Send Reset Link'}
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                We hope you will not forget your password again.{" "}
                                {/* <Link to="/login" className="underline underline-offset-4">
                                    Sign In
                                </Link> */}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    )
}
