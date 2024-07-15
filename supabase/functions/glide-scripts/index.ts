// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  console.log('glide-scripts', req);

  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { orderId, imageUrl, type } = await req.json();
    console.log('glide', orderId, type, imageUrl);

    if (!orderId || !type || !imageUrl) {
      throw Error('Invalid request body');
    }

    const glideId = Deno.env.get('GLIDE_ID');
    const glideKey = Deno.env.get('GLIDE_KEY');
    const glideTable = Deno.env.get('GLIDE_TABLE_SCRIPTS');

    console.log('glide keys', glideId, glideKey, glideTable);

    if (!glideId || !glideKey || !glideTable) {
      throw Error('Invalid glide credentials');
    }

    // Add row to glide
    const glideUrl = "https://api.glideapp.io/api/function/mutateTables";
    let glideHeader = new Headers();
    glideHeader.append("Content-Type", "application/json");
    glideHeader.append("Authorization", `Bearer ${glideKey}`);

    let devGlide = {
      "appID": glideId,
      "mutations": [{
        "kind": "add-row-to-table",
        "tableName": `native-table-${glideTable}`,
        "columnValues": {
          "4k950": orderId,
          "Fs0ZA": type,
          "UtWBK": imageUrl
        }
      }]
    }

    const requestOptions = {
      method: 'POST',
      headers: glideHeader,
      body: JSON.stringify(devGlide),
      redirect: 'follow'
    };

    const glideRes = await fetch(glideUrl, requestOptions);
    console.log('glide res', glideRes);

    if (glideRes.status !== 200 && glideRes.status !== 201) {
      const error = { status: glideRes.status, statusText: glideRes.statusText }
      throw Error(error);
    }

    return new Response(JSON.stringify({ message: 'successfully added object', data: { orderId, type, imageUrl } }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } 
  catch (error) {
    console.log('error', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

// To deploy 
// supabase functions deploy glide-scripts --no-verify-jwt