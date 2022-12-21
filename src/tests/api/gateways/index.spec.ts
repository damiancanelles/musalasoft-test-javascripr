import { Gateway } from "src/models/gateway";
import handlerGateway from "src/pages/api/gateways/index"
import { testClient } from "src/utils/test-client-gateways";

const request = testClient(handlerGateway);

describe("GET /gateways", () => {
  test("return the gateways list", async () => {
    const res = await request.get("/gateways/");
    expect(res.status).toBe(200);
  });
});

describe("POST /gateways", () => {
    test("create a gateway", async () => {
        const res = await request.post("/gateways/").send({
            "name": "Gateway 6",
            "serial_number": "12245312rwe5435f",
            "ip": "123.145.142.154"
        }).set('Accept', 'application/json')
        await Gateway.findByIdAndDelete(res.body._id)
        expect(res.status).toBe(201);
    });
  });

describe("POST /gateways", () => {
    test("create a gateway whit the same name", async () => {
        const res = await request.post("/gateways/").send({
            "name": "Gateway 9",
            "serial_number": "12245312rwe5435f",
            "ip": "123.145.142.154"
        }).set('Accept', 'application/json')
        const res2 = await request.post("/gateways/").send({
          "name": "Gateway 9",
          "serial_number": "12245312rwe5435f",
          "ip": "123.145.142.154"
        }).set('Accept', 'application/json')
        await Gateway.findByIdAndDelete(res.body._id)
        expect(res.status).toBe(201);
        expect(res2.status).toBe(400);
    });
  });

describe("POST /gateways", () => {
    test("create a gateway with invalid ip", async () => {
        const res = await request.post("/gateways/").send({
            "name": "Gateway 2",
            "serial_number": "12245312rwe5435f",
            "ip": "asd"
        }).set('Accept', 'application/json')
        await Gateway.findByIdAndDelete(res.body._id)
        expect(res.status).toBe(400);
    });
  });