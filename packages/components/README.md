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

### Icons

```ts
import { NsIconModule } from '@ng-solid/components';

@NgModule({
  imports: [
    ...
      NsIconModule.forRoot({ path: './assets/icons' })
  ]
})
export class AppModule
{
}
```

Add to file `angular.json` the following

```json
{
  "assets": [
    {
      "glob": "**/*.svg",
      "input": "node_modules/@ng-solid/components/assets",
      "output": "assets/icons"
    }
  ]
}
```

and in your html template

```angular2html
<ns-icon [name]="'add'"></ns-icon>
```
