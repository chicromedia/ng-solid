# @NG-SOLID/FACEBOOK

An Angular UI component library based on Ant Design.

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
