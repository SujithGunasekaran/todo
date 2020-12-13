import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import '../css/footer.css';

export default function Footer()
{
    return(
        <div>
            <div className="footer-main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="footer-main-icon-display">
                                <GitHubIcon style={{fontSize:'21px'}} className="footer-main-icon"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}