import { Hono } from "hono"
// import { db } from "bun:sqlite"
import { Glob } from "bun"

import type { Server } from "bun"
import type { Controller } from "./controller"

export type BunBoxConfig = {
    controllers?: string
}

export class BunBox {
    config: BunBoxConfig

    app: Hono
    server?: Server

    constructor(config: BunBoxConfig = {}) {
        config.controllers = config.controllers ?? "controllers"
        this.config = config

        this.app = new Hono()
        this.app.get("/", c => c.text("Hello, bunbox"))
    }

    serve = async (): Promise<Server> => {
        const controllers: Controller[] = []
        const controllerFiles = new Glob(`${this.config.controllers}/*.{js,ts}`)

        for await (const file of controllerFiles.scan(".")) {
            const filename = `${process.cwd()}/${file}`
            const controllerModule = await import(filename)

            if (
                controllerModule &&
                typeof controllerModule.default === "function"
            ) {
                const ControllerClass = controllerModule.default
                const instance = new ControllerClass()
                controllers.push(instance)
            } else {
                console.error(
                    `ERROR: Cannot load module '${controllerModule.default}'`
                )
            }
        }

        for (const controller of controllers) {
            this.app.on([controller.method], controller.route, controller.run)
        }

        this.server = Bun.serve({
            fetch: this.app.fetch,
        })
        return this.server
    }
}
