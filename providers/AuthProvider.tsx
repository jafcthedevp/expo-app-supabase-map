import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { router } from 'expo-router';
import { supabase } from '@/utils/supabase';

type AuthData = {
    loading: boolean;
    session: Session | null;

}

const AuthContext = createContext<AuthData>({
    loading: true,
    session: null,
});

interface props {
    children: React.ReactNode;
}

export default function AuthProvider(props: props) {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<Session | null>(null);


    useEffect(() => {
        async function fetchSession(){
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                throw error;
            }
            if (data.session) {
                setSession(data.session);   
            } else {
                router.replace("/(auth)/signin");
            }
            setLoading(false);
        };
        fetchSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(async (_, session) => {
            setSession(session);
            setLoading(false);

            if (session) {
                router.replace("/profile");
            } else {
                router.replace('/(auth)/signin');
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        }
    }, []);  

        return (
            <AuthContext.Provider value={{ loading, session }}>
                {props.children}
            </AuthContext.Provider>
        )
}

export const useAuth = () => { 
    return useContext(AuthContext)
};
    