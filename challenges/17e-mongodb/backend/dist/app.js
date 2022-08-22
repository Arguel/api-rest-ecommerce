"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const error_handler_config_1 = __importDefault(require("./common/error.handler.config"));
const cart_routes_config_1 = __importDefault(require("./components/cart/cart.routes.config"));
const user_routes_config_1 = __importDefault(require("./components/user/user.routes.config"));
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
routes.push(new cart_routes_config_1.default(app));
routes.push(new user_routes_config_1.default(app));
routes.forEach((route) => {
    debugLog(`Routes configured for ${route.getName()}`);
});
// Manage non-existent routes
app.use(error_middleware_1.default.routeNotFound);
// Errors
process.on('uncaughtException', (error) => __awaiter(void 0, void 0, void 0, function* () {
    error_handler_config_1.default.handleError(error);
    if (!error_handler_config_1.default.isTrustedError(error))
        process.exit(1);
}));
process.on('unhandledRejection', (reason) => {
    throw reason;
});
exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLGtEQUEwQjtBQUMxQixnREFBd0I7QUFDeEIsb0RBQTRCO0FBRTVCLHVHQUF3RTtBQUN4RSxrR0FBeUU7QUFDekUsb0dBQTJFO0FBQzNFLHlGQUF5RDtBQUN6RCw4RkFBOEQ7QUFDOUQsOEZBQStEO0FBRS9ELE1BQU0sR0FBRyxHQUF3QixJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUMzQyxNQUFNLFFBQVEsR0FBb0IsSUFBQSxlQUFLLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0MsTUFBTSxNQUFNLEdBQThCLEVBQUUsQ0FBQztBQUU3QyxjQUFjO0FBQ2QsR0FBRyxDQUFDLEdBQUcsQ0FBQyx5QkFBYyxDQUFDLENBQUM7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGNBQUksR0FBRSxDQUFDLENBQUM7QUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGdCQUFNLEdBQUUsQ0FBQyxDQUFDO0FBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsMEJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVoQyxnQkFBZ0I7QUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLCtCQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksNEJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSw0QkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQXlCLEVBQVEsRUFBRTtJQUNqRCxRQUFRLENBQUMseUJBQXlCLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDdkQsQ0FBQyxDQUFDLENBQUM7QUFDSCw2QkFBNkI7QUFDN0IsR0FBRyxDQUFDLEdBQUcsQ0FBQywwQkFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRXZDLFNBQVM7QUFDVCxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQU8sS0FBWSxFQUFpQixFQUFFO0lBQ3BFLDhCQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLElBQUksQ0FBQyw4QkFBWSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUMsTUFBYSxFQUFTLEVBQUU7SUFDeEQsTUFBTSxNQUFNLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLEdBQUcsQ0FBQyJ9