import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class GetManyUserDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    readonly limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    readonly offset?: number;

    /**
      * @example "+79999999999"
      */
    @IsOptional()
    @IsString()
    readonly phone?: string;

    /**
      * @example "Ada"
      */
    @IsOptional()
    @IsString()
    readonly name?: string;
}