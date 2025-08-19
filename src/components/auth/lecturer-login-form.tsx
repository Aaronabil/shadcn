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
import { Eye, EyeOff } from 'lucide-react'

export function LecturerLoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { signIn } = useAuth()


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        setLoading(true)
        setError('')

        const { error } = await signIn(email, password)
        if (error) {
            setError("Sign In Failed: " + error.message)
            setLoading(false)
        } else {
            navigate("/dashboard-dosen", { replace: true })
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
                        <CardTitle>Sign in to your lecturer account</CardTitle>
                        <CardDescription>
                            Enter your email below to sign in to your account
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
                                        placeholder="lecturer@example.com"
                                        required
                                    />
                                </div>
                                <div className="relative grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <Link to="/forgot-password" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
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
                                        {loading ? <span className="loading loading-ring loading-sm"></span> : 'Sign In'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    )
}
