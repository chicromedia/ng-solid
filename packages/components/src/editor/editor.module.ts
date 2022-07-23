import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NsEditorComponent } from './editor.component';
import { NsDropdownModule } from '../dropdown/dropdown.module';
import { NsFormsModule } from '../form/forms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NsEditorParagraphComponent } from './components/paragraph/paragraph.component';
import { NsEditorToggleCommandComponent } from './components/toogle/toggle.component';
import { NsEditorColorPickerComponent } from './components/color-picker/color-picker.component';
import { NsEditorListComponent } from './components/list/list.component';
import { NsEditorLinkComponent } from './components/link/link.component';
import { NsEditorSetup } from './interfaces/editor-config';
import { NsEditorService, nsEditorSetupFactory } from './services/editor.service';
import { NsEditorLabelPipe } from './pipes/editor-label.pipe';
import { NsButtonModule } from '../button/button.module';

export const NS_EDITOR_SETUP_TOKEN = new InjectionToken<NsEditorSetup>( 'NsEditorSetup' );

@NgModule( {
    imports: [
        CommonModule,
        NsDropdownModule,
        NsFormsModule,
        ReactiveFormsModule,
        NsButtonModule,
        FormsModule
    ],
    declarations: [
        NsEditorComponent,
        NsEditorParagraphComponent,
        NsEditorToggleCommandComponent,
        NsEditorColorPickerComponent,
        NsEditorListComponent,
        NsEditorLinkComponent,
        NsEditorLabelPipe,
    ],
    exports: [ NsEditorComponent ]
} )
export class NsEditorModule
{
    static forRoot( config?: NsEditorSetup ): ModuleWithProviders<NsEditorModule>
    {
        return {
            ngModule: NsEditorModule,
            providers: [
                {
                    provide: NS_EDITOR_SETUP_TOKEN,
                    useValue: config,
                },
                {
                    provide: NsEditorService,
                    useFactory: nsEditorSetupFactory,
                    deps: [ NS_EDITOR_SETUP_TOKEN, DOCUMENT ],
                },
            ],
        };
    }
}
