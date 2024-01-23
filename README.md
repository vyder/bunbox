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

## Usage

My goal with this project is to hideaway as much of the boiler plate import
crud as I can, following in the footsteps of frameworks like Rails.

By default, this is the directory structure `bunbox` expects:

```txt
|
|- index.ts
|- controllers/
    |- hello.ts
```

1. Create a controller:

```ts
// controllers/hello.ts
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

or in vanilla JavaScript:

```js
// controllers/hello.js
class HelloController {
    constructor() {
        this.method = "GET"
        this.route = "/hello"
    }

    run = c => c.text("Hello")
}
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
