import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AwsCognitoConfig } from './aws-cognito.config';
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [AuthController],
    providers: [AuthService, AwsCognitoConfig, JwtStrategy]
})
export class AuthModule { }
