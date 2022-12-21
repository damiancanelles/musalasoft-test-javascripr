import { Gateway } from "src/models/gateway";
import handlerGateway from "src/pages/api/gateways/[id]"
import { testClient } from "src/utils/test-client-gateways";

const request = testClient(handlerGateway);

describe("GET /gateways/id", () => {
    test("return a gateway", async () => {
        const gateway = await Gateway.create({
            "name": "Gateway 2",
            "serial_number": "12245312rwe5435f",
            "ip": "123.145.142.154"
        })
        const res = await request.get(`/gateways/${gateway._id}`);
        await Gateway.findByIdAndDelete(gateway._id)
        expect(res.status).toBe(200);
  });
});

describe("PUT /gateways/id", () => {
    test("edit a gateway", async () => {
        const gateway = await Gateway.create({
            "name": "Gateway 2",
            "serial_number": "12245312rwe5435f",
            "ip": "123.145.142.154"
        })
        const res = await request.put(`/gateways/${gateway._id}`).send({
            "name": "Gateway 3",
            "serial_number": "12245312rwe5435f",
            "ip": "123.145.142.154"
        }).set('Accept', 'application/json')
        await Gateway.findByIdAndDelete(gateway._id)
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Gateway 3");
    });
  });

describe("DELETE /gateways/id", () => {
    test("delete a gateway", async () => {
        const gateway = await Gateway.create({
            "name": "Gateway 2",
            "serial_number": "12245312rwe5435f",
            "ip": "123.145.142.154"
        })
        const res = await request.delete(`/gateways/${gateway._id}`)
        expect(res.status).toBe(200);
    });
  });