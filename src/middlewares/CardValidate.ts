import { NextFunction, Request ,Response} from "express";

const schemaCard ={
    numero:{
        required: 'O campo do numero e obrigatorio  e siga esse padrao 000 000 000 000',
        regex: /^\d{3} \d{3} \d{3} \d{3}$/
    },
    codigo:{
        required: 'codigo e obrigatorio e',
        minCodigo:1
    },
    senha:{
        required:'A senha e obrigatoria',
        min: 8
    },
    id_usuario:{
        required: 'O id de usuario e obrigatorio'
    }
}

export function cardValidate(
    req : Request,
    res: Response,
    next : NextFunction
){
    const cardData = req.body;
    const erros: string[] = [];

    Object.keys(schemaCard).forEach(item =>{
        const itenSchema = schemaCard[item];

        if(itenSchema.required && !cardData[item]){
            erros.push(`Campo ${item} - ${itenSchema.required}`);
        }

       if(itenSchema.regex && !itenSchema.regex.test(cardData[item])){
            erros.push(`Campo ${item} - esta no formato incorreto ex :000 000 000 000}`);
       }

    
       if(itenSchema.minCodigo && (cardData[item].length > itenSchema.minCodigo)){
        erros.push(`Campo ${item} - o tamnnho minio e de ${itenSchema.minCodigo}`);
       }

       if(itenSchema.min && (cardData[item].length < itenSchema.min)){
        erros.push(`Campo ${item} - o tamnnho minio e de ${itenSchema.min}}`);
       }


    });
    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }

    return next();
}
