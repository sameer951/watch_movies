import React from 'react';
class Error404 extends React.Component {
    render() {
        return (<div>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

            <div className="page-wrap d-flex flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">
                            <span className="display-1 d-block">404</span>
                            <div className="mb-4 lead">The page you are looking for was not found.</div>
                            <a href="/jyotikant_cv" className="btn btn-link">Back to Home</a>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`body {
                    background: #dedede;
                    }
                    .page-wrap {
                    min - height: 100vh;
                    }`}
            </style>
        </div>
        )
    }
}

export default Error404;