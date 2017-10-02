import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Site from '../layouts/Site';
import Main from '../components/Main';
import Header from '../components/Header';
import BlogsContainer from '../components/BlogsContainer';
import Prefooter from '../components/Prefooter';

export default class Page extends Component {
  static async getInitialProps({ req, query }) {
    const { protocol, url } = req || {};
    const siteUrl = req ? `${protocol}://${req.get('Host')}` : '';
    const site = await fetch(`${siteUrl}/api/site`).then(resp => resp.json());
    const page = await fetch(`${siteUrl}/api/page${url}`).then(resp =>
      resp.json()
    );
    const blogs = await fetch(`${siteUrl}/api/blogs`).then(resp => resp.json());

    return { site, page, blogs };
  }

  render() {
    const { site, page, blogs } = this.props;
    const { title, subtitle } = page;

    return (
      <Site site={site} sidebar={true}>
        <Main>
          <Header title={title} subtitle={subtitle} />
          <BlogsContainer blogs={blogs} />
          <Prefooter
            text="Let’s be friends!"
            linkLabel="Say hi!"
            linkUrl="https://twitter.com/connor_baer"
          />
        </Main>
      </Site>
    );
  }
}
