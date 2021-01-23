import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { CreateMovieDto } from "./create-video.dto";

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
