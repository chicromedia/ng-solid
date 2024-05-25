import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NsInputNumberComponent } from './input-number.component';

describe( 'NsInputNumberComponent', () =>
{
    let component: NsInputNumberComponent;
    let fixture: ComponentFixture<NsInputNumberComponent>;

    beforeEach( waitForAsync( () =>
    {
        TestBed.configureTestingModule( {
            declarations: [ NsInputNumberComponent ]
        } )
            .compileComponents();
    } ) );

    beforeEach( () =>
    {
        fixture = TestBed.createComponent( NsInputNumberComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create', () =>
    {
        expect( component ).toBeTruthy();
    } );
} );
