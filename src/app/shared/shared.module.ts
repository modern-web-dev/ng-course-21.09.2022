import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { CardComponent } from './card/card.component';
import { ValidationMessageComponent } from './validation-message/validation-message.component';

const exportedDeclarations = [ValidationMessageComponent, CardComponent];
const exportedModules = [RouterModule, CommonModule];
@NgModule({
  declarations: [...exportedDeclarations],
  imports: [...exportedModules],
  exports: [...exportedDeclarations, ...exportedModules],
})
export class SharedModule {
  
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [AuthService],
    };
  }
}
