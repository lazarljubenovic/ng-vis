import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {PlaygroundComponent} from "./playground.component";
import {VisNetworkModule} from "../core/vis-network/vis-network.module";

@NgModule({
    declarations: [
        PlaygroundComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        VisNetworkModule,
    ],
    providers: [],
    bootstrap: [
        PlaygroundComponent,
    ],
})
export class AppModule {
}
