// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { supabase } from '@/lib/supabase';
// import { Alert, AlertTitle } from "@/components/ui/alert";
// import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
// import { motion, AnimatePresence } from 'framer-motion';

// export function AuthConfirm() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [message, setMessage] = useState('');
//     const [isError, setIsError] = useState(false);

//     useEffect(() => {
//         const confirmEmail = async () => {
//             const params = new URLSearchParams(location.search);
//             const token_hash = params.get('token_hash');
//             const type = params.get('type');

//             if (token_hash && type) {
//                 const { error } = await supabase.auth.verifyOtp({
//                     token_hash,
//                     type: type as any, // Type assertion as Supabase's type might be more specific
//                 });

//                 if (error) {
//                     setMessage(`Email verification failed: ${error.message}`);
//                     setIsError(true);
//                 } else {
//                     setMessage('Email successfully verified! You can now log in.');
//                     setIsError(false);
//                     // Redirect to login page after a short delay
//                     setTimeout(() => {
//                         navigate('/student/login');
//                     }, 3000);
//                 }
//             } else {
//                 setMessage('Invalid verification link.');
//                 setIsError(true);
//             }
//         };

//         confirmEmail();
//     }, [location, navigate]);

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//             className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"
//         >
//             <div className="w-full max-w-sm">
//                 <AnimatePresence>
//                     {message && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -20 }}
//                             transition={{ duration: 0.3 }}
//                             className="mb-4"
//                         >
//                             <Alert variant={isError ? "destructive" : "default"} className={isError ? "" : "text-green-500"}>
//                                 {isError ? <AlertCircleIcon /> : <CheckCircle2Icon />}
//                                 <AlertTitle>{message}</AlertTitle>
//                             </Alert>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </motion.div>
//     );
// }
