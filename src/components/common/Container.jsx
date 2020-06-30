import React from 'react'

const Container = ({ title, subTitle, width, background, children }) => (
  <section className={`hero is-small is-bold ${background}`}>
    <div className="columns is-centered">
      <div className={`column ${width}`}>
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {title}
            </h1>
            <h2 className="subtitle">
              {subTitle}
            </h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  </section>
)

export default Container