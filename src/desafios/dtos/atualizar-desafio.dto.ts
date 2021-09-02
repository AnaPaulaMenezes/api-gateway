import { IsOptional, IsPort } from "class-validator";
import { DesafioStatus } from "../interfaces/enum-status.enum";

export class AtualizarDesafioDto {

    @IsOptional()
    status: DesafioStatus;
}