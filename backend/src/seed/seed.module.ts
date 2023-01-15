import { Module } from "@nestjs/common";
import { FormModule } from "../form/form.module";
import { SeedController } from "./seed.controller";

@Module({
  imports: [FormModule],
  controllers: [SeedController],
  providers: [],
})
export class SeedModule {}
