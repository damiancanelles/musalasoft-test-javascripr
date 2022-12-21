import { runDB } from "src/utils/mongoose";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { Gateway } from "src/models/gateway";
import { Device } from "src/models/device";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";
import { gatewaySchema } from "src/schemas/gateway";

runDB()

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
    const { method, body} = req

    switch (method) {
        case 'GET':
            try {
                const gateways = await Gateway.find().populate({ path: 'devices', model: Device })
                return res.status(200).json(gateways)
            } catch (error: any) {
                return res.status(500).json({ msg: error.message})
            }
        case 'POST':
            const { name, serial_number, ip } = body
            try {
                const exists = await Gateway.findOne({ name })
                if (exists) return res.status(400).json({ msg: 'name not available'})
                const gateway = await Gateway.create({ name, serial_number, ip})
                return res.status(201).json(gateway)
            } catch (error: any) {
                return res.status(500).json({ msg: error.message})
            }
        default:
            return res.status(400).json({'msg': 'this method is not allowed'})
    }
    
}

export function validate(schema: OptionalObjectSchema<ObjectShape>, handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (req.method == 'POST') {
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