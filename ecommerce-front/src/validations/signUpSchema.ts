import { z } from "zod";
const signUpSchema = z
  .object({
    firstname: z.string().min(3, { message: "First name is required" }),
    lastname: z.string().min(3, { message: "Last name is required" }),
    email: z.string().min(3, { message: "Email address is required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmpassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((input) => input.password === input.confirmpassword, {
    message: "Password and confirm password doesn`t match",
    path: ["confirmpassword"],
  });
type SignUpType = z.infer<typeof signUpSchema>;

export { signUpSchema, type SignUpType };
