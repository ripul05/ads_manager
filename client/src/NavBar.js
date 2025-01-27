import React from 'react';


function NavBar() {
    return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-1">
            <a className="navbar-brand" style={nameStyle} href="#">Kshitij's Agency</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" style={{ ...nameStyle, marginLeft: '0' }} href="#home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"style={{ ...nameStyle, marginLeft: '0' }} href="#about">About</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" style={{ ...nameStyle, marginLeft: '0' }} href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>

    );
}

const nameStyle={
    fontWeight: 'bold',
    marginLeft: '1%',
};

export default NavBar