import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet /> {/* Child routes will be rendered here */}
            </main>
        </div>
    );
};

export default MainLayout;