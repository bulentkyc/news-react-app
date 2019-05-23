import React from 'react';

const navBar = (props) => {
    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-0 fixed-top" height="50px">
                <div className="container">
                    <div className="d-flex align-items-center h-100">
                        <a id='salutation' className="navbar-brand ml-3" height="50px" href="/">
                            <img alt="" height="50px" className="d-inline-block align-top" src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg"/>
                        </a>
                        <a className="h-100" href="profile">Welcome on board!</a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a id="logInOut" className="nav-link mr-5" href="/login">Home</a>
                            </li>
                        </ul>
                        <button class="btn btn-outline-success mr-3">Cart <span class="badge badge-light">{props.cartCount}</span></button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default navBar;