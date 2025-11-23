import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Laptops = () => {
    const laptops = useLoaderData();
    return (
        <div>
            <h1>All phone are here: {laptops.length}</h1>
            {
                laptops.map(laptop => <li key={laptop.id}>
                    <Link to={`/laptop/${laptop.id}`}>{laptop.model}</Link>
                </li>)
            }
        </div>
    );
};

export default Laptops;