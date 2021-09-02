import { BadRequestException, PipeTransform } from "@nestjs/common";
import { DesafioStatus } from "../interfaces/enum-status.enum";

export class DesafioStatusValidacaoPipe implements PipeTransform {
    readonly statusPermitidos = [
        DesafioStatus.ACEITO,
        DesafioStatus.NEGADO,
        DesafioStatus.CANCELADO,
    ]

    transform(value: any) {
        const status = value.status.toUpperCase();
        if (!this.isStatusValido(status)) {
            throw new BadRequestException(`O status ${status} não é valido para esta operação`)
        }
        return value;
    }
    isStatusValido(status: any) {
        const idx = this.statusPermitidos.indexOf(status);

        return idx !== -1;
    }
}