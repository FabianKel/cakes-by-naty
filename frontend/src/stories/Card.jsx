import React from 'react';
import Button from './Button';

function Card({ productonombre, src, alt }) {
    const svg = <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
    return (
        <div className="bg-white border p-4 m-1 rounded-md shadow-lg flex flex-col justify-between max-w-sm">
            <h2 className="text-black text-2xl font-bold mb-2 font-navheader text-center">{productonombre}</h2>
            <div className="flex justify-center items-center h-full mb-4">
                <div className={"w-full h-full object-cover overflow-hidden rounded-md"}>
                    <img src={src} alt={alt} className="w-full h-full object-cover rounded-md" />
                </div>
            </div>
            <div className="flex justify-center mt-auto">
                <Button text={"Ver más"} svg={svg}/>
            </div>
        </div>
    );
};

export default Card;