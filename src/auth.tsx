import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

import { PublicClientApplication } from "@azure/msal-browser"
import { msalConfig } from "./authConfig"
import { AuthContextProvider } from './authContext';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";

import App from './App';
// import { useFetch } from './hooks';
// import { findClosest } from './helpers';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components';
import { fetchAPI } from './helpers';
// import { APIProvider } from '@vis.gl/react-google-maps';
export const msalInstance = new PublicClientApplication(msalConfig);

// SignInButton Component returns a button that invokes a popup login when clicked
function SignInButton() {
  const { instance } = useMsal();

  return (
    <button style={{ display: "inline-block", marginBottom: "0.25rem", letterSpacing: "0.025em", fontWeight: "600", borderRadius: "9999px", paddingLeft: "0.5rem", paddingRight: "0.5rem", position: "absolute" }} onClick={() => signInClickHandler(instance)}>
      Sign In
    </button>
  );
}
async function signInClickHandler(instance: any) {
  console.log(instance)
  try {
    await instance.loginPopup().then(
      () => console.log(instance)
    )
  } catch (error) {
    console.log(error)
  }
}

// async function getInstructions() {
//   let response: any = {}
//   response.Users = await fetchAPI({ req: { method: 'find', db: 'Inventory', collection: 'Users' }, isObj: true })
//   response.Categories = await fetchAPI({ req: { method: 'find', db: 'Inventory', collection: '_Categories' }, isObj: true })
//   const dbLocs = await fetchAPI({ req: { method: 'find', db: 'Inventory', collection: '_Locations' }, isObj: true });
//   response.locs = await findClosest(dbLocs);
//   response.sas = await fetchSAS();
//   return response
// }
(async () => {
  try {
    if (!window.fetch) alert('Browser version not supported. Please upgrade to the latest version or find another device to use.');
    // const results = await getInstructions().then(data => data);
    const results = {};
    const queryClient = new QueryClient();
    const selects: any = { a: 1 };
    const settings = await fetchAPI({ req: { method: 'find', db: 'Truck', collection: 'Settings' }, isObj: true });

    console.log('Auth render');

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <>
        {/* <StrictMode> */}
          <QueryErrorResetBoundary>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => console.log('fallback')} resetKeys={[]}>
              <MsalProvider instance={msalInstance}>
                <AuthenticatedTemplate>
                  <AuthContextProvider msal={msalInstance} schema={results} selects={selects}>
                    <QueryClientProvider client={queryClient}>
                      {/* <APIProvider apiKey={`${import.meta.env.VITE_GOOGLE_APIKEY}`} libraries={['places','routes']}> */}

                        {results &&
                          <App settings={settings}/>
                        }
                      {/* </APIProvider> */}
                    </QueryClientProvider>
                  </AuthContextProvider>
                </AuthenticatedTemplate>

                <UnauthenticatedTemplate>
                  <p>Please sign into your Microsoft Office account.</p>
                  <SignInButton />
                </UnauthenticatedTemplate>
              </MsalProvider>
            </ErrorBoundary>
          </QueryErrorResetBoundary>
        {/* </StrictMode> */}
      </>
    )
  }
  catch (e) {
    console.log('Initialization Error', e);
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <>
        {<h3>&nbsp;Trouble connecting to the Truck Scheduler. You may be experiencing problems with your internet connection. Please try again later.</h3>}
      </>,
    );
  }
})()