import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { passportJwtSecret } from "jwks-rsa";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AwsCognitoConfig } from "./aws-cognito.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private logger = new Logger(JwtStrategy.name);

    constructor(private authConfig: AwsCognitoConfig) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            audience: authConfig.clientID,
            issuer: authConfig.authority,
            algorithms: ['RS256'],
            secretOrKeyProvider: passportJwtSecret(
                {
                    cache: true,
                    rateLimit: true,
                    jwksRequestsPerMinute: 5,
                    jwksUri: `${authConfig.authority}/.well-known/jwks.json`
                }
            )
        })
    }

    public async validate(payload: any) {
        this.logger.log(`payload: ${JSON.stringify(payload)}`);

        return { idUsuario: payload.sub, email: payload.email }
    }
}