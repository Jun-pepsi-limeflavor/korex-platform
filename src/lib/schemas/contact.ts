import { z } from "zod";

export const contactInquirySchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z
    .string()
    .email("Invalid email")
    .refine(
      (e) =>
        !["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"].includes(
          e.split("@")[1]?.toLowerCase() ?? ""
        ),
      "Business email required"
    ),
  company: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  process: z.string().optional(),
  volume: z.string().optional(),
  description: z.string().max(500, "Max 500 characters").optional(),
  hearAboutUs: z.string().optional(),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;
