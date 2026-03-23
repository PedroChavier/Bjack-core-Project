import { IsNumber, IsPositive, IsString } from 'class-validator';

export class PlaceBetDto {
    @IsNumber()
    @IsPositive()
    amount!: number;

    @IsString()
    currency!: string;
}
