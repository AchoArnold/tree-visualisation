# Frontend

The frontend is done with Tyepscript and Vue.js. It uses the default vue.js setup with typescript so  didn't do any configuration on it.

## Code Walkthrough

The code is found in the `./src` directory. I created a file `src/keys.ts` which stores constants like the API endpoint for the backend.

Like the backend, I called the nodes in the graph `Item` since I couldn't find a better name.

So when the app starts, the code queries the backend for the JSON structure wth all items. And it then builds a `Tree` data structure with the JSON data returned from the API.

There's a component `TreeVisualizer.vue` which takes the tree datastructure built from the stpe above and it renders the tree on a page as a set of boxes and lines between the boses.

For rendering the nodes in the tree, I render each node as a `<div>` with fixed height/width and an offset which is calculated based on the hierarchy of the node on the graph. The lines between nodes are drawn using SVG from the center of the parent node to the center of the child node.

**NOTE:** The frontend requires the backend to be up before you can visualize the tree.

## Setup

### Environment variables

The file `src/keys.ts` stores constants like the API endpoint for the backend. This file could be configured to use `process.env` to get the variables in the build step from the ENV.

### Installation

The dependencies can be installed using the command below

```bash
npm install
```

### Running the Application

**NOTE:** Make sure the backend is running before you start the frontend. The default URL is [http://localhost:8080](http://localhost:8080) so make sure the port `8080` is free.

```bash
npm run serve
```

### Testing

You can run unit tests using the command below. I used `jest` for unit tests. 

```bash
npm run test:unit
```

### Lints and fixes files

I used ts-lint for linting, You can run the linter using the command below

```bash
npm run lint
```
