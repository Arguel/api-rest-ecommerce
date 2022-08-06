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
const http_status_1 = __importDefault(require("http-status"));
const error_handler_config_1 = __importDefault(require("../../../common/error.handler.config"));
class ErrorMiddleware {
    handle(err, req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!error_handler_config_1.default.isTrustedError(err)) {
                next(err);
                return;
            }
            error_handler_config_1.default.handleError(err);
        });
    }
    routeNotFound(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(http_status_1.default.NOT_FOUND).json({
                error: `404 - ${http_status_1.default['404_MESSAGE']}`,
                description: `Route '${req.originalUrl}' - Method '${req.method}' not found`,
            });
        });
    }
}
exports.default = new ErrorMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvYXBwL21pZGRsZXdhcmUvZXJyb3IubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLDhEQUFxQztBQUNyQyxnR0FBZ0U7QUFHaEUsTUFBTSxlQUFlO0lBQ2IsTUFBTSxDQUNWLEdBQWMsRUFDZCxHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsSUFBSSxDQUFDLDhCQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ1YsT0FBTzthQUNSO1lBQ0QsOEJBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQztLQUFBO0lBRUssYUFBYSxDQUNqQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDcEMsS0FBSyxFQUFFLFNBQVMscUJBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDM0MsV0FBVyxFQUFFLFVBQVUsR0FBRyxDQUFDLFdBQVcsZUFBZSxHQUFHLENBQUMsTUFBTSxhQUFhO2FBQzdFLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9