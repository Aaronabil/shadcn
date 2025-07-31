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
    import { Link } from "react-router-dom"

    export function RegisterForm({
    className,
    ...props
    }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
            <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>
                Register now to have an account.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form>
                <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Full Name</Label>
                    <Input
                    id="fullname"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    required
                    />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" placeholder="Create a password" required />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                    <Label htmlFor="password">Confirm Password</Label>
                    </div>
                    <Input id="password" type="password" placeholder="Confirm your password" required />
                </div>
                <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                    Create account
                    </Button>
                </div>
                </div>
                <div className="mt-4 text-center text-sm">
                Already have an account? {" "}
                <Link to="/login" className="underline underline-offset-4">
                    Sign up
                </Link>
                </div>
            </form>
            </CardContent>
        </Card>
        </div>
    )
    }
