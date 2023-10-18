import { NextFunction, Request, Response, request } from "express";


const schemaUser={
    nome:{
        required:'Nome e obrigatorio'
    },
    cpf: {
        regex: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        message: 'CPF está em um formato incorreto'
    }
    
}


export function userValidate(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const userData = req.body;
    const erros: string[] = [];

    Object.keys(schemaUser).forEach(item => {
        const itemSchema = schemaUser[item];

        if (itemSchema.required && !userData[item]) {
            erros.push(`Campo ${item} - ${itemSchema.required}`);
        }

        if (itemSchema.regex && !itemSchema.regex.test(userData[item])) {
            erros.push(`Campo ${item} está no formato incorreto`);
        }
    });

    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }

    return next();
}


