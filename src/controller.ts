import type { Context, Env, Input, Next } from "hono"
import type { HandlerResponse } from "hono/types"

export type ControllerConfig = {
    route: string
    method: string
    db?: any
}

export interface Controller {
    route: string
    method: string
    db?: any

    run(context: Context<Env, string, Input>, next: Next): HandlerResponse<any>
}
