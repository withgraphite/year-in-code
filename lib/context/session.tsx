"use client";

import React, { createContext, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const SessionContext = createContext(null);

const supabase = createClientComponentClient();

export const SessionProvider = ({ children }) => {
	const [session, setSession] = useState(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	return (
		<SessionContext.Provider value={{ session, supabase }}>
			{children}
		</SessionContext.Provider>
	);
};