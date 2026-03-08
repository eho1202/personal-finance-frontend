'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { IconAlertTriangle } from "@tabler/icons-react";
import ETLUpload from './etl-upload';

const NotFoundCard = ({ month, year }: NotFoundCardProps) => {
    return (
        <Card className="w-full flex-1">
            <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                    Upload your Credit Card Statement
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                    <IconAlertTriangle /> 
                    No data available for {month} {year}. Upload a statement to get started.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 py-6">
                <ETLUpload />
            </CardContent>
        </Card>
    );
};

export default NotFoundCard;