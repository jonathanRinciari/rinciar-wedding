import React from 'react';

export const Polaroid = ({children}: React.PropsWithChildren) => {

    return (
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="filter2912">
            <feGaussianBlur id="feGaussianBlur2914" stdDeviation="3.4782385"></feGaussianBlur>
          </filter>
        </defs>
        <g id="layer1" transform="matrix(1.317432, 0, 0, 1.221582, -547.324158, -375.832031)">
          <g id="g3271" transform="translate(9.9102 9.3779)">
            <path id="rect2893" filter='url(#filter2912)' fill="#000000" d="m413.06 322.28h330.18v365.47s-82.55-7.18-165.09-7.18c-82.55 0-165.09 7.18-165.09 7.18v-365.47z"></path>
            <rect id="rect2889" fill="#f2f2f2"  height="362.18" width="330.18" y="318.05" x="413.06"></rect>
            <rect id="rect2916" opacity=".55556" fill="#cccccc" height="308.62" width="306.51" y="328.2" x="424.89"></rect>
            <rect id="rect2310" strokeLinejoin='round' stroke='rgb(0, 0, 0)' stroke-width="0.78245" fill="rgb(0, 0, 0)" opacity="0" height="300.34" width="300.34" y="331.14" x="427.98"></rect>
            <path id="rect3250" opacity="0.07" fill="rgb(255, 255, 255)" d="m427.59 330.75h300.34s-47.35 61.4-122.43 102.97c-75.09 41.58-177.91 63.33-177.91 63.33v-166.3z"></path>
            {/* <image height="300.34" width="300.34" y="331.14" x="427.98" href={url} /> */}
            <foreignObject height="308.62" width="306.51" y="328.2" x="424.89">
                {children}
            </foreignObject>
          </g>
        </g>
      </svg> 
    );
}