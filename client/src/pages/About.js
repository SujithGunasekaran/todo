import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/about.css';



export default function About() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const redirectToPath = () => {
        window.location.replace('/')
    }

    document.title = "Todo | About"


    return (
        <div>
            <Header />
            <div className="about-main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="about-main-info">
                                This is simple todo website to track our daily activity,
                                In this Website we can able to Create our daily task and update task, If task has been completed we can delete the task..
                                <br /><br /><span className="about-link-href" onClick={redirectToPath}>Click here</span> to view scource code of this website.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}
