import { runDB } from "src/utils/mongoose";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { Gateway } from "src/models/gateway";
import { gatewaySchema } from "src/schemas/gateway";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";

runDB()

const handler = async function(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body} = req
    switch (method) {
        case 'GET':
            const retrived_gateway = await Gateway.findById(query.id)
            if (!retrived_gateway) return res.status(404).json({'msg': `gateway not found`})
            return res.status(200).json(retrived_gateway)
        case 'PUT':
            try {
                const updated_gateway = await Gateway.findByIdAndUpdate(query.id, body, { new: true})
                if (!updated_gateway) return res.status(404).json({'msg': `gateway not found`})
                return res.status(200).json(updated_gateway)
            } catch (error: any) {
                return res.status(500).json({ msg: error.message })
            }
        case 'DELETE':
            try {
                const deleted_gateway = await Gateway.deleteOne({ id: query.id })
                if (!deleted_gateway) return res.status(404).json({'msg': `gateway not found`})
                return res.status(200).json({'msg': 'gateway deleted'})
            } catch (error: any) {
                return res.status(500).json({ msg: error.message })
            }
        default:
            return res.status(400).json({'msg': 'this method is not allowed'})
    }
    
}

export function validate(schema: OptionalObjectSchema<ObjectShape>, handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (req.method == 'PUT') {
            try {
                await schema.validate(req.body)
            } catch (error) {
                return res.status(400).json(error)
            }
        }
        return await handler(req, res)
    }
}

export default validate(gatewaySchema,handler)