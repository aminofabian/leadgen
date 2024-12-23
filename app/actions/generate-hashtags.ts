'use server';

import https from 'https';

export async function generateHashtagsAction(input: string) {
  if (!input) {
    throw new Error('Input is required');
  }

  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      hostname: 'claude-2-1.p.rapidapi.com',
      port: null,
      path: '/messages',
      headers: {
        'x-rapidapi-key': '52655f1cfbmshc28794a26461c71p1a3967jsnc854ec10622d',
        'x-rapidapi-host': 'claude-2-1.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    };

    const request = https.request(options, function (res) {
      const chunks: Buffer[] = [];

      res.on('data', function (chunk) {
        chunks.push(chunk);
      });

      res.on('end', function () {
        const body = Buffer.concat(chunks);
        try {
          const response = JSON.parse(body.toString());
          resolve(response);
        } catch (error) {
          console.error('Error parsing response:', error, body.toString());
          reject(new Error('Failed to parse API response'));
        }
      });
    });

    request.on('error', function (error) {
      console.error('Error in API request:', error);
      reject(new Error('Failed to generate hashtags'));
    });

    const message = `Generate relevant hashtags for the following content. Return only hashtags separated by spaces, no explanations or other text: ${input}`;

    request.write(JSON.stringify({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    }));

    request.end();
  });
}
