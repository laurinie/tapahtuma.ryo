import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import { graphql } from "gatsby"
import NonStretchedImage from "../components/NonStretchedImage";
import Layout from "../layouts/index";
import Link from 'gatsby-link'

import heroStyles from '../components/hero.module.css'
import pageStyles from "../pages/page.module.css";

class PageTemplate extends React.Component {
  renderBlock(block) {
    if (block.title !== "empty") {
      return (
        <div className={pageStyles.block}>
          <h1>{block.title}</h1>
          <div
            className={heroStyles.block}
            dangerouslySetInnerHTML={{
              __html: block.content.childMarkdownRemark.html,
            }}
          />
        </div>
      )
    }
  }
  render() {
    const post = get(this.props, 'data.contentfulPage')
    return (
      <Layout>
        <div>
          <Helmet title={`Ryö ${post.title}`} />
          <div className={heroStyles.hero}>
            {post.highlighted !== null ? <h2 className={pageStyles.highlighted}>{post.highlighted}</h2> : ""}
            <NonStretchedImage className={heroStyles.heroImage} fluid={post.coverImage.fluid} />
          </div>
          <div className="wrapper">
            <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>Takaisin</Link>
            {post.blocks.map(block => (
              this.renderBlock(block)
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
query PageBySlug($slug: String!) {
  contentfulPage(slug: {eq: $slug}) {
    slug
    title
    coverImage {
      fluid(quality: 100) {
        src
      }
    }
    highlighted
    blocks {
      title
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
}
`
