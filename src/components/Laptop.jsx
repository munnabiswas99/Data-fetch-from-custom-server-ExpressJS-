import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Laptop = () => {
    const laptop = useLoaderData();
    console.log(laptop);
    return (
        <div>
            <p>{laptop.brand}</p>
            <p>{laptop.model}</p>
            <p>{laptop.price}</p>
        </div>
    );
};

export default Laptop;