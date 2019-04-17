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

                return <li
                    key={`state-render-${key}-${index}`}
                    id={`key-${key}`}>
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
        <span id={parentKey} data-value={val}>{String(val)}</span>
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


export const deepMerge = (target, source) => {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object) {
            source[key] = source[key] || {};
            target[key] = target[key] || {};
            Object.assign(
                source[key],
                deepMerge(target[key], source[key])
            );
        }
    }

    return Object.assign(target || {}, source);
};


export const ReactVersion = () => {
    return (<div>
        <h1 id="react-version" data-version={React.version}>{React.version}</h1>
    </div>);
};
