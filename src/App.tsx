import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

import { TailwindIndicator } from '@/blocks/TailwindIndicator';
import { PharmaStorePage } from '@/pages/PharmaStorePage';

// import '@/i18n/i18n';

/* // NOTE: Don't use routes for action projects: as they use relative paths for hosting apps
 * import { BrowserRouter, Route, Routes } from 'react-router-dom';
 * function AppRoutes() {
 *   return (
 *     <Routes>
 *       <Route path="/" element={<PharmaStorePage />} />
 *       {[> <Route path="/test" element={<Test />} /> <]}
 *     </Routes>
 *   );
 * }
 */

function App() {
  return (
    <HelmetProvider>
      {/* <AppNavBar /> */}
      <PharmaStorePage />
      {/*
      // NOTE: Don't use routes for action projects: as they use relative paths for hosting apps
      <AppRoutes />
      */}
      <ToastContainer />
      <TailwindIndicator />
    </HelmetProvider>
  );
}

export default App;
