import app from './app';
import config from 'config';
import sourceMapSupport from 'source-map-support';
import debug from 'debug';

// Enable stack traces translation to typescript
sourceMapSupport.install();

const debugLog: debug.IDebugger = debug('server');
const port = config.get<number>('server.port');

app.listen(port, () => debugLog(`Server running at http://localhost:${port}`));
