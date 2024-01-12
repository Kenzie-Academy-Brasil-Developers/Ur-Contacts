import { z } from "zod";

export const registerFormSchema = z.object({
    name: z
        .string()
        .nonempty("Insira o nome do usuário."),

    email: z
        .string()
        .nonempty("Insira o email.")
        .email("Digite um email válido."),

    password: z
        .string()
        .nonempty("Insira uma senha.")
        .min(8, "A senha precisa conter pelo menos 8 caracteres.")
        .regex(/(?=.*?[A-Z])/, "A senha deve conter pelo menos uma letra maiúscula.")
        .regex(/(?=.*?[a-z])/, "A senha deve conter pelo menos uma letra minuscula.")
        .regex(/(?=.*?[#?!@$%^&*-])/, "A senha deve conter pelo menos um caractere especial.")
        .regex(/(?=.*?[0-9])/, "A senha deve conter pelo menos um número."),

    confirm: z.string().nonempty("Confirme sua senha."),

    telephone: z.string().nonempty("Informe seu contato"),

}).refine(({password, confirm}) => password === confirm, {
    message: "As senhas não correspondem.",
    path: ["confirm"]
})