import { Device } from "src/models/device";
import { Gateway } from "src/models/gateway";
import handlerDevice from "src/pages/api/devices/[id]"
import { testClient } from "src/utils/test-client-devices";

const request = testClient(handlerDevice);

describe("GET /devices/id", () => {
    test("return a device", async () => {
        const gateway = await Gateway.create({
            "name": "Gateway 322",
            "serial_number": "12245312rwe5435f",
            "ip": "123.145.142.154"
        })
        const device = await Device.create({
            "vendor": "Asus",
            "uid": "531531351",
            "status": "online",
            "gateway_id": `${gateway._id}`
        })
        const res = await request.get(`/devices/${device._id}`);
        await Gateway.findByIdAndDelete(gateway._id)
        await Device.findByIdAndDelete(device._id)
        expect(res.status).toBe(200);
  });
});

describe("PUT /devices/id", () => {
    test("edit a device", async () => {
        const gateway = await Gateway.create({
            "name": "Gateway 342",
            "serial_number": "12245312rwe5435f",
            "ip": "123.145.142.154"
        })
        const device = await Device.create({
            "vendor": "Asus",
            "uid": "531531351",
            "status": "online",
            "gateway_id": `${gateway._id}`
        })
        const res = await request.put(`/devices/${device._id}`).send({
            "vendor": "Asus2",
            "uid": "531531351",
            "status": "online",
        }).set('Accept', 'application/json')
        await Gateway.findByIdAndDelete(gateway._id)
        await Device.findByIdAndDelete(device._id)
        expect(res.status).toBe(200);
        expect(res.body.vendor).toBe("Asus2");
    });
  });

describe("DELETE /devices/id", () => {
    test("delete a device", async () => {
        const gateway = await Gateway.create({
            "name": "Gateway 1232",
            "serial_number": "12245312rwe5435f",
            "ip": "123.145.142.154"
        })
        const device = await Device.create({
            "vendor": "Asus",
            "uid": "531531351",
            "status": "online",
            "gateway_id": `${gateway._id}`
        })
        const res = await request.delete(`/devices/${device._id}`)
        await Gateway.findByIdAndDelete(gateway._id)
        expect(res.status).toBe(200);
    });
  });