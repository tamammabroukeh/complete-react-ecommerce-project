import { z } from "zod";

const signInSchema = z.object({
  email: z.string().min(3, { message: "Email address is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

type SignInType = z.infer<typeof signInSchema>;

export { signInSchema, type SignInType };
