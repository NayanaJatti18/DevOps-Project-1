const { test } = require('node:test');
const assert = require('node:assert');
const { createServer } = require('../app');

test('Application should return successful response', async (t) => {

    const server = createServer();

    await new Promise(resolve => {
        server.listen(0, resolve);
    });

    t.after(() => new Promise(resolve => {
        server.close(resolve);
    }));

    const port = server.address().port;

    const response = await fetch(`http://localhost:${port}`);

    assert.strictEqual(response.status, 200);

    const body = await response.text();

    assert.match(body, /Welcome to My DevOps Project/);
});