import { color } from 'framer-motion';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function getProgressColor(progress) {
    if (progress < 30) return '#DB2360';
    if (progress < 40) return '#C9215B';
    if (progress < 70) return '#D2D531';
    return '#21C775';
}

export default function ProgressRounded({ value }) {
    return (
        <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#081C22', boxShadow: '0 0 10px gray' }}>
            <CircularProgressbar
                value={value || '0'}
                text={`${value || '0'}%`}
                styles={buildStyles({
                    pathColor: getProgressColor(value || 0),
                    trailColor: '#204429',
                    textSize: '26px',
                    textColor: 'white',
                    fontWeight: 'bold',
                })}
            />
        </div>
    );
};
