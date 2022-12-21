import { object, string, number, TypeOf } from "yup";

export const gatewaySchema = object({
    serial_number: string().required(),
    name: string().required(),
    ip: string().required().matches(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, 'this in not a valid ipv4 address')
})

export type Gateway = TypeOf<typeof gatewaySchema>