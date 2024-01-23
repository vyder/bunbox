import { Controller } from "../../../src/controller"
import type { Context } from "../../../src/index"

class HelloController implements Controller {
    route: string
    method: string
    db?: any

    constructor() {
        this.method = "GET"
        this.route = "/hello"
    }

    run = (c: Context) => c.text("Hello")
}

export default HelloController
