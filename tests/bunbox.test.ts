import { describe, expect, test } from "bun:test"
import axios from "axios"

import { BunBox } from "../src/bunbox"

const box = new BunBox({
    controllers: "tests/hello-world/controllers",
})
box.serve()

const PORT = 3000
const URL = `http://localhost:${PORT}`

describe("bunbox", () => {
    test("server is running", async () => {
        const response = await axios(URL)
        expect(response.status).toBe(200)
    })

    test("HelloController is responding", async () => {
        const response = await axios(`${URL}/hello`)
        expect(response.status).toBe(200)
        expect(response.data).toMatch(/hello/i)
    })
})
