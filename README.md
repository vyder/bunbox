# Bun Box

## Installation

1. Install [bun](https://bun.sh) & create a new project

```sh
❯ mkdir bunbox-example && cd bunbox-example
❯ bun init
# work through prompts
❯ bun install
```

2. Install `bunbox`

```sh
❯ bun add bunbox
```

3. Create a controller: `/controllers/hello.ts`

```ts
import { Controller } from "bunbox"
import type { Context } from "bunbox"

class HelloController implements Controller {
    route: string
    method: string

    constructor() {
        this.method = "GET"
        this.route = "/hello"
    }

    run = (c: Context) => c.text("Hello!")
}

export default HelloController
```

4. Update your `index.ts`:

```ts
import BunBox from "bunbox"
const box = new BunBox()

box.serve()
```

5. Run with `bun run index.ts`:

```sh
❯ curl localhost:3000/hello
Hello!
```
