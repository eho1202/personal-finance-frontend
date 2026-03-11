import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { createClient } from '@/lib/supabase/server';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react'

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return (
        <NextIntlClientProvider>
            <SidebarProvider
                style={{
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties}
            >
                <AppSidebar variant="inset" user={{ 
                    first_name: user?.user_metadata?.first_name ?? "", 
                    last_name: user?.user_metadata?.last_name ?? "", 
                    email: user?.user_metadata?.email ?? ""
                }}/>
                <SidebarInset>
                    <SiteHeader />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </NextIntlClientProvider>
    )
}
