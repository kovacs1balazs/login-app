import React, { FC, memo } from "react";
import { useLocation } from "react-router-dom";

const SuccessPageComponent: FC = () => {
    const location = useLocation();
    const { username } = location.state as { username: string };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#38C5AB] to-[#2739A4]">
            <h1 className="text-5xl font-bold text-white">Hello {username}</h1>
        </div>
    );
}

export const SuccessPage = memo(SuccessPageComponent);