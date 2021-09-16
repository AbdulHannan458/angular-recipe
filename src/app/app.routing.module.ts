import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    // { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    {
        path: 'recipes',
        loadChildren: () => import('./recipes/recipes.module').then( m => m.RecipesModule)
    },
    {
        path: 'shopping-list',
        loadChildren: () => import('./shopping-list/shopping-list.module').then( m => m.ShoppingListModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
    },
    { path: 'not-found',
    loadChildren: () => import('./shared/page-not-found/page-not-found.module').then( m => m.PageNotFoundModule)
    },
    {
        path: '**',
        redirectTo: '/not-found'
    }
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes,
        {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}