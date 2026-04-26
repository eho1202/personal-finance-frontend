'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IconAlertCircle } from "@tabler/icons-react";
import { Button } from '@/components/ui/button';

const ErrorCard = ({ message }: { message: string }) => {
    return (
        <Card className="w-full flex-1">
            <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                    Something went wrong
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                    <IconAlertCircle />
                    {message}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="outline" onClick={() => window.location.reload()}>
                    Try again
                </Button>
            </CardContent>
        </Card>
    );
};

export default ErrorCard;