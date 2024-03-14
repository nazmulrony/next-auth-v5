"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonProps {
    href: string;
    label: string;
}
export const BackButton = ({ href, label }: BackButtonProps) => {
    const router = useRouter();
    return (
        <Button
            className="font-normal w-full "
            size="sm"
            variant="link"
            asChild
        >
            <Link href={href}>{label}</Link>
        </Button>
    );
};
