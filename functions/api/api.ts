
import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import crypto from "crypto";
import fetch from 'node-fetch';
import { BUX_API_KEY, BUX_API_SECRET, BUX_BASE_URL, BUX_CLIENT_ID, SITE_DOMAIN } from "./env-check";

function sha1(data:string) {
  return crypto.createHash("sha1").update(data, "binary").digest("hex");
}

const handler: Handler = async (event:HandlerEvent, context:HandlerContext ) => {
  
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed!" }),
      headers: { Allow: "POST" },
    };
  }
  
  if (event.headers.host !== SITE_DOMAIN){
     return {
          statusCode: 403,
          body: JSON.stringify({ error: "Forbidden Access To Api" }),
          headers: { Allow: "POST" },
        };
  }
  
  let params = null;
  try {
    params =  JSON.parse(event.body|| '{}');
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
  
  const {
    req_id, 
    status, 
  } : 
  {
    req_id: string, 
    status: string , 
  } = params;

  let signature:string = `${req_id}${status.toLowerCase()}{${BUX_API_SECRET}}`; 

  signature = sha1(signature);

  if (!req_id||!status) {
    let error = {
      statusCode: 422,
      body: `Validation Error: req_id: ${req_id} , status: ${status}`,
    };
    return error;
  }
  
  const payload = {
    headers: { 
      Accept: 'application/json', 
      'x-api-key': `${BUX_API_KEY}` 
    },
    method: 'GET',
  };
 
  const apiURL = `${BUX_BASE_URL}/notification_url?req_id=${req_id}&client_id=${BUX_CLIENT_ID}&status=${status}&signature=${signature}`

  try {
    const response = await fetch(apiURL, payload);
    
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }

}

export { handler };
