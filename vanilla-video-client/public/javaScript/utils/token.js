async function fetchToken(options) {
    const response = await fetch('http://localhost:3005/auth-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
    })
    const body = await response.json();
    return body.token;
};

async function tokenRefresher(user, privateKey){
    let token;
    const options = {
        scopes: ['broadcaster'],
        userId: 'admin',
        data: {
          displayName: user,
          mirrors: [
            {
              id: privateKey,
              streamName: 'demo',
              kind: 'pipe',
              clientEncoder: 'demo',
              streamKey: privateKey,
              clientReferrer: 'staging',
            },
          ],
        },
      };
    try {
        token = await fetchToken(options);
    } catch (error) {
        console.error("unable to get access token", {
        error,
        });
        throw error;
    }
    return token;
};



