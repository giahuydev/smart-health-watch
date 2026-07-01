import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
