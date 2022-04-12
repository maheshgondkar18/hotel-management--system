import React from 'react'

export const Home = () => {
    return (
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{border:"18px solid", borderRadius:"20px"}}>
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="img/cr4.jpg" className="d-block w-100" style={{height:"620px"}} />
                        <div className="carousel-caption d-none d-md-block" style={{backgroundColor: "rgba(255,255,255,0.8)", padding:"20px"}}>
                            <div className='row'>
                                <div className='col'>
                                    <a type="button" class="btn btn-outline-primary btn-lg" style={{width:"100%"}} href="/login">Login</a>
                                </div>
                                <div className='col'>
                                <a type="button" class="btn btn-outline-danger btn-lg" style={{width:"100%"}} href="/register">Register</a>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="carousel-item">
                    <img src="img/cr5.jpg" className="d-block w-100" style={{height:"620px"}}  />
                        <div className="carousel-caption d-none d-md-block" style={{backgroundColor: "rgba(255,255,255,0.8)", padding:"20px"}}>
                            <div className='row'>
                                <div className='col'>
                                    <a type="button" class="btn btn-outline-primary btn-lg" style={{width:"100%"}} href="/login">Login</a>
                                </div>
                                <div className='col'>
                                    <a type="button" class="btn btn-outline-danger btn-lg" style={{width:"100%"}} href="/register">Register</a>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="carousel-item">
                    <img src="img/cr6.png" className="d-block w-100" style={{height:"620px"}}  />
                        <div className="carousel-caption d-none d-md-block" style={{backgroundColor: "rgba(255,255,255,0.8)", padding:"20px"}}>
                            <div className='row'>
                                <div className='col'>
                                    <a type="button" class="btn btn-outline-primary btn-lg" style={{width:"100%"}} href="/login">Login</a>
                                </div>
                                <div className='col'>
                                <a type="button" class="btn btn-outline-danger btn-lg" style={{width:"100%"}} href="/register">Register</a>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
