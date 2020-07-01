import React from 'react'

const Container = ({ title, subTitle, width, background, children }) => (
  <>
    <section className={`hero is-small is-bold ${background}`}>
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            {title}
          </h1>
          <h2 className="subtitle">
            {subTitle}
          </h2>
        </div>
      </div>
    </section>
    <div className="columns is-centered">
      <div className={`column ${width}`}>
        {children}
      </div>
    </div>
  </>
)

export default Container