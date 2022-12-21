import { runDB } from "src/utils/mongoose";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { Device } from "src/models/device";
import { Gateway } from "src/models/gateway";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";
import { deviceCreateSchema } from "src/schemas/device";

runDB()

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body} = req

    switch (method) {
        case 'GET':
            try {
                const devices = await Device.find()
                return res.status(200).json(devices)
            } catch (error: any) {
                return res.status(500).json({ msg: error.message})
            }
        case 'POST':
            try {
                const { uid, vendor, status, gateway_id } = body
                const gateway = await Gateway.findById(gateway_id)
                if (!gateway) return res.status(404).json({'msg': `gateway not found`})
                if (gateway.devices != null) if (gateway.devices.length > 10 ) return res.status(400).json({'msg': `this gateway not allow more than 10 devices`})
                const device = await Device.create({ uid, vendor, status})
                gateway.devices.push(device._id)
                gateway.save()
                return res.status(201).json(device)
            } catch (error: any) {
                return res.status(500).json({ msg: error.message })
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

export default validate(deviceCreateSchema,handler)