import React, { useState } from 'react'
import { cn } from "@/lib/utils"
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
import { Link } from "react-router-dom"
import { signUp } from "@/lib/supabase"
import { Eye, EyeOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters')
            setLoading(false)
            return
        }

        const { error } = await signUp(formData.email, formData.password, formData.fullName)
        if (error) {
            setError("Register Failed: " + error.message)
        } else {
            setSuccess('Please check email to verify your account.')
            setFormData({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
        setLoading(false)
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
                    <CardTitle>Sign up</CardTitle>
                    <CardDescription>
                        Register now to have an account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <AnimatePresence>
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
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullname"
                                    name="fullName" // Add name attribute
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.fullName} // Controlled component
                                    onChange={handleChange} // Controlled component
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email" // Add name attribute
                                    type="email"
                                    placeholder="user@example.com"
                                    value={formData.email} // Controlled component
                                    onChange={handleChange} // Controlled component
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
                                        name="password" // Add name attribute
                                        type={showPassword ? 'text' : 'password'} // Toggle password visibility
                                        placeholder="Create a password"
                                        value={formData.password} // Controlled component
                                        onChange={handleChange} // Controlled component
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
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label> {/* Change htmlFor */}
                                </div>
                                <div className="relative"> {/* Add relative positioning for icon */}
                                    <Input
                                        id="confirmPassword" // Change id
                                        name="confirmPassword" // Add name attribute
                                        type={showPassword ? 'text' : 'password'} // Toggle password visibility
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword} // Controlled component
                                        onChange={handleChange} // Controlled component
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
                                <Button type="submit" className="w-full" disabled={loading}> {/* Add disabled state */}
                                    Create account
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account? {" "}
                            <Link to="/login" className="underline underline-offset-4">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
        </motion.div>
    )
}
