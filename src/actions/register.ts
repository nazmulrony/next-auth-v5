"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const register = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid field values" };
    }
    return { success: "Email sent!" };
};
