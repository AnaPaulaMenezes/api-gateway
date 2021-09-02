import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginUsuarioDto } from './dtos/auth-login-usuario.dto';
import { AuthRegistroUsuarioDto } from './dtos/auth-registro-usuario.dto';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/registro')
    @UsePipes(ValidationPipe)
    async registro(@Body() authRegistroUsuarioDto: AuthRegistroUsuarioDto) {
        return await this.authService.registrarUsuario(authRegistroUsuarioDto);
    }

    @Post('/login')

    async login(@Body() authLoginUsuarioDto: AuthLoginUsuarioDto) {
        return await this.authService.autenticarUsuario(authLoginUsuarioDto);
    }
}
