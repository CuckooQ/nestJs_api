import { IsString } from "class-validator";

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString({ each: true })
  readonly genres: string[];  
}
