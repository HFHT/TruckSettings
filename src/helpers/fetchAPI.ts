
interface State {
  req?: object
  error?: Error
  isObj?: Boolean
}

const baseURL = `${import.meta.env.VITE_MONGO_URL}`;

export async function fetchSAS() {
  try {
    const { url, sasKey } = await (await fetch(`${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTSasToken?cont=habistorepickup`)).json();
    return { url, sasKey };
  } catch (error: any) { console.log(error); return null }
}

// Used before React is loaded
export async function fetchAPI({ req, error, isObj = false }: State): Promise<State> {
  console.log(req);
  const headers = new Headers();
  const options = {
    method: "GET",
    headers: headers
  };
  return fetch(`${baseURL}?req=${encodeURIComponent(JSON.stringify(req))}`, options)
    .then(response => response.json())
    .then(data => { return isObj ? data : data[0] })
    .catch(error => { console.log(error); return null });
}
