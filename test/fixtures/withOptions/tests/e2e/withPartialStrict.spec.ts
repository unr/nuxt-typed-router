import { fileURLToPath } from 'node:url';
import { setup } from '@nuxt/test-utils';
import { assertType } from 'vitest';
import { runTypesDiagnostics } from '../../../../utils';

test('The strict option should behave correctly with partial strict options', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../../fixtures/withOptions', import.meta.url)),
    setupTimeout: 120000,
    nuxtConfig: {
      nuxtTypedRouter: {
        strict: {
          NuxtLink: {
            strictRouteLocation: true,
          },
          router: {
            strictToArgument: true,
          },
        },
      },
    },
  } as any);

  const diagnostic = await runTypesDiagnostics(__dirname, __filename);

  expect(diagnostic.length).toBe(0);

  type TypedRouter = import('../../.nuxt/typed-router').TypedRouter;
  type TypedNuxtLinkProps =
    import('../../.nuxt/typed-router/typed-router').TypedNuxtLinkProps<string>;

  const router = {
    push: vi.fn(),
  } as unknown as TypedRouter;

  let toProp: TypedNuxtLinkProps = {} as TypedNuxtLinkProps;

  assertType(router.push('/user'));
  // @ts-expect-error
  assertType(router.push({ path: '/foo' }));

  // @ts-expect-error
  assertType((toProp.to = '/login'));
  assertType((toProp.to = { path: '/user' }));
});
