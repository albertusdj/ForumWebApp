import React from 'react';
import getCookie from './cookie.js';

const csrftoken = getCookie('csrftoken');

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
}

export default CSRFToken;