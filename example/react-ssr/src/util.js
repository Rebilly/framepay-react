import React from 'react';

export const prettyRenderState = (data, parentKey) => {
    if (data !== null && typeof data === 'object') {
        return <ul>
            {Object.keys(data).map((key, index) => {

                const dataKey = `${parentKey ? parentKey + '-' : ''}${key}`;
                const value = data[key];

                if (value === null) {
                    return null;
                }

                return <li key={`state-render-${key}-${index}`}>
                    <span
                        className="key"><b>{key}</b>:</span>
                    &nbsp;
                    {prettyRenderState(value, dataKey)}
                </li>;
            })}
        </ul>;
    }

    if (data === null) {
        return null;
    }

    const val = typeof data === 'object' ? JSON.stringify(data) : data;

    return <span>
        <span id={`${parentKey}-${val}`} data-value={val}/>
        <span id={parentKey} data-value={val}>{val}</span>
    </span>;
};

export const prettyDebugRender = (state) => {
    return (<div>
        <div>
            <pre id="pre">{JSON.stringify(state, null, 2)}</pre>
        </div>
        <div>
            <div id="data">{prettyRenderState(state)}</div>
        </div>
    </div>);
};

export const deepMerge = (x, y) => {
    return Object.keys(y)
        .reduce((acc, k) => {
            if (typeof y[k] !== 'object') {
                return {
                    ...acc,
                    ...{ [k]: y[k] }
                };
            }

            return {
                ...acc,
                ...{ [k]: { ...acc[k], ...deepMerge(acc[k] || {}, y[k] || {}) } }
            };
        }, Object.create(x));
};
