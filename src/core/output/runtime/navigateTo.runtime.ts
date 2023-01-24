import { watermarkTemplate } from '../templates';

export function createRuntimeNavigateToFunction() {
  return `
    ${watermarkTemplate}
    import { navigateTo as defaultNavigateTo } from '#app';
    import { NavigateToOptions } from 'nuxt/dist/app/composables/router';
    import { NavigationFailure } from 'vue-router';
    import type { TypedNamedRouteLocation } from './__router';
    import { TypedRouteList } from './__routes';

    export const navigateTo: <T extends TypedRouteList>(
      to: TypedNamedRouteLocation<T>,
      options?: NavigateToOptions
    ) => Promise<void | NavigationFailure | TypedNamedRoute<T>> = defaultNavigateTo as any;

  `;
}
