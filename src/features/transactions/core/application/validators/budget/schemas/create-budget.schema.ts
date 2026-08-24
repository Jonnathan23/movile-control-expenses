import z from "zod";

export const CreateBudgeValidatetSchema = z.object({
    amount: z.number({ message: "Invalid amount" }).positive("Invalid amount"),
});
