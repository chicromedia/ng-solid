# Facebook Integration

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/@ng-solid/facebook.svg?style=flat-square

[npm-url]: https://www.npmjs.com/@ng-solid/facebook

A library of Facebook UI components for Angular

## Components

- Login button (provides user information and signed request)
- Like button (developing)
- Share button (developing)

## Installation

```bash
$ ng new PROJECT_NAME
$ cd PROJECT_NAME
$ ng add @ng-solid/facebook
```

You can also install `@ng-solid/facebook` with npm or yarn

## Usage

Import the component module you want to use in your `app.module.ts` file
and [feature modules](https://angular.io/guide/feature-modules).

```ts
import { NsFacebookModule } from '@ng-solid/facebook';

@NgModule({
  imports: [
    NsFacebookModule.forRoot({
      appId: '{api-id}',
      cookie: true,
      xfbml: true,
      version: '{api-version}'
    })
  ]
})
export class AppModule
{
}
```

## Login button

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit
{
  constructor() {}

  ngOnInit()
  {
  }

  onLogin(status: fb.StatusResponse)
  {
  }
}
```

Add this to your template:

```html
<ns-facebook-login [rounded]="true" (onLogin)="onLogin($event)">Continue with Facebook</ns-facebook-login>
```
