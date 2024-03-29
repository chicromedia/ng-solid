import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { NS_FACEBOOK_CONFIG } from '../providers/config.provider';
import FacebookEventCallback = fb.FacebookEventCallback;
import ShareDialogParams = fb.ShareDialogParams;

@Injectable( { providedIn: 'root' } )
export class NsFacebookService
{
    private readonly ready$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );
    private readonly script: string = 'https://connect.facebook.net/en_US/sdk.js';

    constructor( @Inject( NS_FACEBOOK_CONFIG ) private config: fb.InitParams,
                 @Inject( PLATFORM_ID ) private platformId: string,
                 private meta: Meta )
    {
        this.init( this.config );
    }

    private loadScript( config: fb.InitParams )
    {
        const facebookId: string = `ns-facebook-${ config.appId }`;
        if ( !document.getElementById( facebookId ) )
        {
            const script = document.createElement( 'script' ) as HTMLScriptElement;
            script.type = 'text/javascript';
            script.id = facebookId;
            script.async = true;
            script.defer = true;
            script.crossOrigin = 'anonymous';
            script.src = this.script;
            document.body.appendChild( script );

            ( window as any ).fbAsyncInit = () =>
            {
                FB.init( config );
            };

            script.onload = () =>
            {
                if ( config.debug )
                {
                    console.info( `Loaded FB SDK for ${ config.appId }` );
                }
                this.ready$.next( true );
            };
        }
    }

    private init( config: fb.InitParams )
    {
        if ( isPlatformBrowser( this.platformId ) && config && config.appId )
        {
            this.loadScript( { cookie: false, xfbml: true, version: 'v9.0', debug: false, ...config } );
        }
    }

    get onReady(): Observable<boolean>
    {
        return this.ready$.pipe( filter( value => !!value ) );
    }

    get checkLoginState(): Observable<fb.StatusResponse>
    {
        return from( new Promise<fb.StatusResponse>(
            resolve => FB.getLoginStatus( resolve )
        ) );
    }

    login( scope: string )
    {
        return from( new Promise<fb.StatusResponse>( ( resolve, reject ) =>
            FB.login( response =>
            {
                if ( response.status === 'connected' )
                {
                    resolve( response );
                } else
                {
                    reject( response );
                }
            }, { scope } )
        ) );
    }

    logout()
    {
        return from(
            new Promise( resolve => FB.logout( resolve ) )
        );
    }

    subscribe( event: fb.FacebookEventType, callback: FacebookEventCallback<fb.FacebookEventType> )
    {
        FB.Event.subscribe( event, callback );
    }

    unsubscribe( event: fb.FacebookEventType, callback: FacebookEventCallback<fb.FacebookEventType> )
    {
        FB.Event.unsubscribe( event, callback );
    }

    share( params: ShareDialogParams )
    {
        params.hashtag = 'hashtag' in params && params.hashtag ? `#${ params.hashtag }` : null;
        return from(
            new Promise<fb.ShareDialogResponse>( resolve =>
                FB.ui( {
                    app_id: this.config.appId,
                    display: 'popup',
                    method: 'share',
                    ...params
                }, resolve )
            )
        );
    }

    openGraph( definition: fb.OpenGraph )
    {
        const appId = `property='fb:app_id'`;
        this.meta.getTag( appId )
            ? this.meta.updateTag( { property: 'fb:app_id', content: this.config.appId }, appId )
            : this.meta.addTag( { property: 'fb:app_id', content: this.config.appId } );

        const siteName = `property='og:site_name'`;
        this.meta.getTag( siteName )
            ? this.meta.updateTag( { property: 'og:site_name', content: this.config.siteName }, siteName )
            : this.meta.addTag( { property: 'og:site_name', content: this.config.siteName } );

        Object.entries( definition ).forEach( ( [ property, content ] ) =>
        {
            const selector = `property='og:${ property }'`;
            const exits = this.meta.getTag( selector );
            if ( !exits && content )
            {
                this.meta.addTag( { property: `og:${ property }`, content: content } );
            } else if ( exits )
            {
                this.meta.updateTag( { property: `og:${ property }`, content: content || '' }, selector );
            }
        } );
    }
}
