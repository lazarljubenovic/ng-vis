import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {VisGraphModule} from "./vis-graph/vis-graph.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        VisGraphModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
