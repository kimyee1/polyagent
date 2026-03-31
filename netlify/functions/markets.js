exports.handler = async function(event, context) {
  try {
    const url = 'https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=100&order=volume&ascending=false';
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0' }
    });
    if (!response.ok) throw new Error('Polymarket returned ' + response.status);
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch(e) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: e.message })
    };
  }
};

