"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("config"));
const source_map_support_1 = __importDefault(require("source-map-support"));
const debug_1 = __importDefault(require("debug"));
// Enable stack traces translation to typescript
source_map_support_1.default.install();
const debugLog = (0, debug_1.default)('server');
const port = config_1.default.get('server.port');
app_1.default.listen(port, () => debugLog(`Server running at http://localhost:${port}`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLG9EQUE0QjtBQUM1Qiw0RUFBa0Q7QUFDbEQsa0RBQTBCO0FBRTFCLGdEQUFnRDtBQUNoRCw0QkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUUzQixNQUFNLFFBQVEsR0FBb0IsSUFBQSxlQUFLLEVBQUMsUUFBUSxDQUFDLENBQUM7QUFDbEQsTUFBTSxJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxHQUFHLENBQVMsYUFBYSxDQUFDLENBQUM7QUFFL0MsYUFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLHNDQUFzQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMifQ==