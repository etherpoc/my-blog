export function toCast<T, U extends T>(target: T): U|undefined {
  try {
    return target as U
  }
  catch {
    return undefined
  }
}


export function getBaseUrl(){
  const baseURL = process.env["NEXT_PUBLIC_BASE_URL"];
  if(baseURL){
    return `${baseURL}`.replace(/(?<!^)\/$/, '')
  }
  else{
    return "http://localhost:3000"
  }
}

export function getAPIBaseUrl(){
  const apiBaseURL = process.env["NEXT_PUBLIC_API_BASE_URL"];
  if(apiBaseURL){
    return `${apiBaseURL}`.replace(/(?<!^)\/$/, '')
  }
  else{
    return "http://localhost:8000"
  }
}
