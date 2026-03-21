import { IsNumber, IsPositive } from 'class-validator';

export class PlaceBetDto {
    @IsNumber()
    @IsPositive()
    amount!: number;

    @IsString()
    currency!: string;
}

import { IsString } from 'class-validator';
