import { createBrowserRouter } from 'react-router-dom';

import { routes } from './routes';

export { routes };
// export * from './routes-view';

// const isPreviewBuild = import.meta.env.VITE_PREVIEW_BUILD === 'true';
// const previewUUID = import.meta.env.VITE_PREVIEW_UUID;
// const basenameOption = isPreviewBuild ? { basename: `/${previewUUID}/` } : {};

export const router = createBrowserRouter(routes);
