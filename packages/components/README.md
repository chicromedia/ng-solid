# Angular UI Components

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/@ng-solid/facebook.svg?style=flat-square

[npm-url]: https://www.npmjs.com/@ng-solid/facebook

An Angular UI component library based on Ant Design.

## Installation

```bash
$ ng new PROJECT_NAME
$ cd PROJECT_NAME
$ ng add @ng-solid/components
```

You can also install `@ng-solid/components` with npm or yarn

## Usage

Import the component module you want to use in your `app.module.ts` file
or [feature modules](https://angular.io/guide/feature-modules) as you need.

### Buttons

```ts
import { NsButtonModule } from '@ng-solid/components';

@NgModule({
  imports: [
    ...
      NsButtonModule
  ]
})
export class AppModule
{
}
```

and in your html template

```angular2html
<ns-button label="My Button" [primary]="true"></ns-button>
```
