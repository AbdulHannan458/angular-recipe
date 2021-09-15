import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuhtIntercepterService } from "./shared/intercepters/auth-intercepter.service";
import { RecipeService } from "./shared/services/recipe.service";
import { ShoppingListService } from "./shared/services/shopping-list.service";

@NgModule({
    providers: [
        RecipeService,
        ShoppingListService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuhtIntercepterService,
          multi: true
        }
    ]
})
export class CoreModule {
    
}