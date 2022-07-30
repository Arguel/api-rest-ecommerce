"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const debug_1 = __importDefault(require("debug"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const product_routes_config_1 = __importDefault(require("./components/product/product.routes.config"));
const logs_middleware_1 = __importDefault(require("./components/app/middleware/logs.middleware"));
const error_middleware_1 = __importDefault(require("./components/app/middleware/error.middleware"));
const app = (0, express_1.default)();
const debugLog = (0, debug_1.default)('app');
const routes = [];
// Middlewares
app.use(logs_middleware_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(error_middleware_1.default.handle);
// Routes config
routes.push(new product_routes_config_1.default(app));
routes.forEach((route) => {
    debugLog(`Routes configured for ${route.getName()}`);
});
exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLGtEQUEwQjtBQUMxQixnREFBd0I7QUFDeEIsb0RBQTRCO0FBRTVCLHVHQUF3RTtBQUN4RSxrR0FBeUU7QUFDekUsb0dBQTJFO0FBRTNFLE1BQU0sR0FBRyxHQUF3QixJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUMzQyxNQUFNLFFBQVEsR0FBb0IsSUFBQSxlQUFLLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0MsTUFBTSxNQUFNLEdBQThCLEVBQUUsQ0FBQztBQUU3QyxjQUFjO0FBQ2QsR0FBRyxDQUFDLEdBQUcsQ0FBQyx5QkFBYyxDQUFDLENBQUM7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGNBQUksR0FBRSxDQUFDLENBQUM7QUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGdCQUFNLEdBQUUsQ0FBQyxDQUFDO0FBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsMEJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVoQyxnQkFBZ0I7QUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLCtCQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNyQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBeUIsRUFBRSxFQUFFO0lBQzNDLFFBQVEsQ0FBQyx5QkFBeUIsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN2RCxDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLEdBQUcsQ0FBQyJ9