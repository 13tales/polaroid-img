import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'polaroid',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
