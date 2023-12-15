async function fetchToken (authUrl, reqBody){
    const response = await window.fetch(authUrl, {
        method: "post",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
    });
    if (response.status !== 200) {
        throw new Error("Unable to get token");
    }

    const body = await response.json();
    return body.token;
};

async function tokenRefresher(options){
    const mirrors = [
            {
                id: options.streamKey,
                streamName: "demo",
                kind: "pipe",
                rtmpPath: `/origin_proxy/${options.streamKey}`,
                clientEncoder: "demo",
                streamKey: options.streamKey,
                clientReferrer: options.clientReferrer !== undefined ? options.clientReferrer : null,
            },
            ]

    const url = `${options.authUrl}`;
    let token;
    try {
        const fetchOptions = {
            scopes: [options.scope],
            userId: options.userId ?? options.streamKey,
            data: {
                displayName: options.displayName ?? options.streamKey,
                mirrors,
            },
        };
        token = await fetchToken(url, fetchOptions);
    } catch (error) {
        console.error("unable to get access token", {
        error,
        url,
        });
        throw error;
    }
    return token;
};

