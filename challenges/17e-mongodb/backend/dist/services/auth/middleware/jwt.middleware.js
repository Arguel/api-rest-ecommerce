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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const user_service_1 = __importDefault(require("../../../components/user/services/user.service"));
// @ts-expect-error
const jwtSecret = process.env.JWT_SECRET;
class JwtMiddleware {
    verifyRefreshBodyField(req, res, next) {
        if (req.body && req.body.refreshToken) {
            return next();
        }
        else {
            return res
                .status(400)
                .send({ errors: ['Missing required field: refreshToken'] });
        }
    }
    validRefreshNeeded(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.default.getUserByEmailWithPassword(res.locals.jwt.email);
            const salt = crypto_1.default.createSecretKey(Buffer.from(res.locals.jwt.refreshKey.data));
            const hash = crypto_1.default
                .createHmac('sha512', salt)
                .update(res.locals.jwt.userId + jwtSecret)
                .digest('base64');
            if (hash === req.body.refreshToken) {
                req.body = {
                    userId: user._id,
                    email: user.email,
                    provider: 'email',
                    permissionLevel: user.permissionLevel,
                };
                return next();
            }
            else {
                return res.status(400).send({ errors: ['Invalid refresh token'] });
            }
        });
    }
    validJWTNeeded(req, res, next) {
        if (req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                }
                else {
                    res.locals.jwt = jsonwebtoken_1.default.verify(authorization[1], jwtSecret);
                    next();
                }
            }
            catch (err) {
                return res.status(403).send();
            }
        }
        else {
            return res.status(401).send();
        }
    }
}
exports.default = new JwtMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0Lm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zZXJ2aWNlcy9hdXRoL21pZGRsZXdhcmUvand0Lm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnRUFBK0I7QUFDL0Isb0RBQTRCO0FBRTVCLGtHQUEwRTtBQUUxRSxtQkFBbUI7QUFDbkIsTUFBTSxTQUFTLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7QUFFakQsTUFBTSxhQUFhO0lBQ1Ysc0JBQXNCLENBQzNCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCO1FBRTFCLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQyxPQUFPLElBQUksRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNMLE9BQU8sR0FBRztpQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLHNDQUFzQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQy9EO0lBQ0gsQ0FBQztJQUVZLGtCQUFrQixDQUM3QixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsTUFBTSxJQUFJLEdBQVEsTUFBTSxzQkFBWSxDQUFDLDBCQUEwQixDQUM3RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQ3JCLENBQUM7WUFDRixNQUFNLElBQUksR0FBRyxnQkFBTSxDQUFDLGVBQWUsQ0FDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQzVDLENBQUM7WUFDRixNQUFNLElBQUksR0FBRyxnQkFBTTtpQkFDaEIsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7aUJBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2lCQUN6QyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEIsSUFBSSxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2xDLEdBQUcsQ0FBQyxJQUFJLEdBQUc7b0JBQ1QsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHO29CQUNoQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLFFBQVEsRUFBRSxPQUFPO29CQUNqQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7aUJBQ3RDLENBQUM7Z0JBQ0YsT0FBTyxJQUFJLEVBQUUsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNwRTtRQUNILENBQUM7S0FBQTtJQUVNLGNBQWMsQ0FDbkIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7UUFFMUIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ2hDLElBQUk7Z0JBQ0YsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlELElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDakMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUMvQjtxQkFBTTtvQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFRLENBQUM7b0JBQ2hFLElBQUksRUFBRSxDQUFDO2lCQUNSO2FBQ0Y7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDL0I7U0FDRjthQUFNO1lBQ0wsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztDQUNGO0FBRUQsa0JBQWUsSUFBSSxhQUFhLEVBQUUsQ0FBQyJ9