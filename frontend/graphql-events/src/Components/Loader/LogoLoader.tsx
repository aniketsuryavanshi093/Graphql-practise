import React from 'react';
import './spinner.scss';
import { Spinner } from '@nextui-org/react';

const LogoLoader = () => (
    <>
        <div className="spinner-container">
            <div className="spinner-card">
                <Spinner color="primary" labelColor="primary" />
            </div>
        </div>
        <div className="modal-backdrop show" />
    </>
);

export default LogoLoader;