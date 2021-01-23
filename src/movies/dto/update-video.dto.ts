import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from "./create-video.dto";

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
