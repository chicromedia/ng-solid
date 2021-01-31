# @NG-SOLID/COMPONENTS

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
and [feature modules](https://angular.io/guide/feature-modules).

```ts
import { NsButtonModule } from '@ng-solid/components';

@NgModule({
  imports: [ NsButtonModule ]
})
export class AppModule
{
}
```
