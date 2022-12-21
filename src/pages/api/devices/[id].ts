import { runDB } from "src/utils/mongoose";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { Device } from "src/models/device";
import { Gateway } from "src/models/gateway";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";
import { deviceSchema } from "src/schemas/device";

runDB()

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body} = req

    switch (method) {
        case 'GET':
            const retrieved_device = await Device.findById(query.id)
            if (!retrieved_device) return res.status(404).json({ msg: 'device not found'})
            return res.status(200).json(retrieved_device)
        case 'PUT':
            const updated_device = await Device.findByIdAndUpdate(query.id, body, { new: true})
            if (!updated_device) return res.status(404).json({ msg: 'device not found'})
            return res.status(200).json(updated_device)
        case 'DELETE':
            const deleted_device = await Device.findByIdAndDelete(query.id)
            if (!deleted_device) return res.status(404).json({ msg: 'device not found'})
            Gateway.remove({ devices: query.id})
            return res.status(200).json({'msg': 'device deleted'})
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

export default validate(deviceSchema,handler)