    import { createClient } from '@supabase/supabase-js'

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    export const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Auth helpers
    export const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
        data: {
            full_name: fullName,
        }
        }
    })
    return { data, error }
    }

    export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    return { data, error }
    }

    export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
    }

    export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
    }