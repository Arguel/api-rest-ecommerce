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
const product_service_1 = __importDefault(require("../services/product.service"));
const debug_1 = __importDefault(require("debug"));
const http_status_1 = __importDefault(require("http-status"));
const log = (0, debug_1.default)('app:product-controller');
class ProductsMiddleware {
    validateRequiredProductBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body &&
                req.body.timestamp &&
                req.body.name &&
                req.body.price &&
                req.body.stock) {
                next();
            }
            else {
                res.status(http_status_1.default.BAD_REQUEST).send({
                    error: `Missing required fields {timestamp, name, price, stock}`,
                });
            }
        });
    }
    validateProductExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_service_1.default.readById(req.params.productId);
                if (product) {
                    next();
                }
                else {
                    res
                        .status(http_status_1.default.NOT_FOUND)
                        .send({ error: `Product ${req.params.userId} not found` });
                }
            }
            catch (err) {
                res
                    .status(http_status_1.default.NOT_FOUND)
                    .send({ error: `Product ${req.params.productId} not found` });
            }
        });
    }
    extractProductId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.productId;
            next();
        });
    }
}
exports.default = new ProductsMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0L21pZGRsZXdhcmUvcHJvZHVjdC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0ZBQXlEO0FBQ3pELGtEQUEwQjtBQUMxQiw4REFBcUM7QUFFckMsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHdCQUF3QixDQUFDLENBQUM7QUFFN0QsTUFBTSxrQkFBa0I7SUFDVCxpQ0FBaUMsQ0FDNUMsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLElBQ0UsR0FBRyxDQUFDLElBQUk7Z0JBQ1IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTO2dCQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUNkLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUNkO2dCQUNBLElBQUksRUFBRSxDQUFDO2FBQ1I7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDdEMsS0FBSyxFQUFFLHlEQUF5RDtpQkFDakUsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDO0tBQUE7SUFFWSxxQkFBcUIsQ0FDaEMsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLElBQUk7Z0JBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSx5QkFBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLE9BQU8sRUFBRTtvQkFDWCxJQUFJLEVBQUUsQ0FBQztpQkFDUjtxQkFBTTtvQkFDTCxHQUFHO3lCQUNBLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLFNBQVMsQ0FBQzt5QkFDNUIsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLFlBQVksRUFBRSxDQUFDLENBQUM7aUJBQzlEO2FBQ0Y7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixHQUFHO3FCQUNBLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLFNBQVMsQ0FBQztxQkFDNUIsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLFlBQVksRUFBRSxDQUFDLENBQUM7YUFDakU7UUFDSCxDQUFDO0tBQUE7SUFFWSxnQkFBZ0IsQ0FDM0IsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ25DLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLGtCQUFrQixFQUFFLENBQUMifQ==