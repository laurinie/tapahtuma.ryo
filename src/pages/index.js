import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import { graphql } from "gatsby"
import NonStretchedImage from "../components/NonStretchedImage";
import Layout from "../layouts/index";
import pageStyles from "./page.module.css";
import Link from 'gatsby-link'
import SEO from "../components/SEO";
import Highlighted from "../components/higlighted"

const RootIndex = (props) => {
  const renderBlock = (block,from) => {
    if (block.title !== "empty") {
      return (
        <div className={pageStyles.indexblock} key={block.slug}>
          <Link to={`/${block.slug}`} state={{from:from}}>
            <div className={pageStyles.link}>
              <h1>{block.title}</h1>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" /><path d="M0 0h24v24H0V0z" fill="none" /></svg>
            </div>
            <p>{block.description}</p>
          </Link>
        </div>
      )
    }
  }
  const post = get(props, 'data.contentfulPage')
  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.description}
        pathname={post.slug}
        article={false}
      />
      <div className={pageStyles.cover}>
        <NonStretchedImage className={pageStyles.coverImage} objectFit={"contain"} fluid={post.coverImage.fluid} />
        <Highlighted highlighted={post.highlighted}/>
        </div>
      <div className="wrapper">
        <h1 className="section-headline">{post.title}</h1>
        {post.blocks.map(block => (
          renderBlock(block,post.slug)
        ))}
      </div>
    </Layout>
  )
}


export default RootIndex

export const pageQuery = graphql`
  query FrontPage{
    contentfulPage(slug: {eq: "/"}) {
      slug
      title
      coverImage {
        fluid(quality: 100) {
          src
        }
      }
      highlighted
      blocks {
        ... on ContentfulPage {
        title
        description
        slug
        }
      }
    }
  }
`
