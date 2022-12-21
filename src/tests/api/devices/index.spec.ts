import { Device } from "src/models/device";
import { Gateway } from "src/models/gateway";
import handlerDevice from "src/pages/api/devices/index"
import { testClient } from "src/utils/test-client-devices";

const request = testClient(handlerDevice);

describe("GET /devices", () => {
  test("return the devices list", async () => {
    const res = await request.get("/devices/");
    expect(res.status).toBe(200);
  });
});

describe("POST /devices", () => {
    test("create a device", async () => {
        const gateway = await Gateway.create({
            "name": "Gateway 27",
            "serial_number": "12245312rwe5435f",
            "ip": "123.145.142.154"
        })
        const res = await request.post("/devices/").send({
            "vendor": "Asus",
            "uid": "531531351",
            "status": "online",
            "gateway_id": `${gateway._id}`
        }).set('Accept', 'application/json')
        await Gateway.findByIdAndDelete(gateway._id)
        await Device.findByIdAndDelete(res.body._id)
        expect(res.status).toBe(201);
    });
  });