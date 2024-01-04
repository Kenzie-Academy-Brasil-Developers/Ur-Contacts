import { z } from "zod"

export const schema = z.object({
    name: z.string(),
    email: z.string(),
    telephone: z.string(),
    password: z.string()
})

export type UserData = z.infer<typeof schema>