import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8 text-center">
          <h2 className="mb-3">Sobre o <span>Mini blog</span></h2>
          <p className="mb-3">
            Este projeto consiste em um blog feito com react no front-end e parte do back-end feito com firebase
          </p>
          <Link to='/post' className="btn">Criar Post</Link>
        </div>
      </div>
    </div>
  )
}

export default About