## Zero Zero

This a chrome extension that syncs videos using WebSockets

## How it works

You open a youtube video (currently is the only supported website), create a room and share the code with a friend who also has the extension installed.
For development, you may want to open another tab.

### Running the express server

```
npm run dev
```

### Installing the extension:

- Build

```
cd extension
npm run build
```

- Go to **chrome://extensions/**
- Enable developer mode
- Click "Load Unpacked"
- Select the "dist" folder
