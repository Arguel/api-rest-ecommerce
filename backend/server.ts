import app from './app';
import config from 'config';
import sourceMapSupport from 'source-map-support';

// Enable stack traces translation to typescript
sourceMapSupport.install();

app.listen(config.get<number>('server.port'));
