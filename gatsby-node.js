'use strict';

const path = require('path');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.

  switch (node.internal.type) {
    case 'MarkdownRemark': {
      const { permalink, layout, date } = node.frontmatter;
      const { relativePath } = getNode(node.parent);

      let slug = permalink;

      if (!slug) {
        slug = `/${relativePath.replace('.md', '')}/`;
      }

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug || ''
      });

      // Used to determine a page layout.
      createNodeField({
        node,
        name: 'layout',
        value: layout || ''
      });

      // createNodeField({
      //   node,
      //   name: 'date',
      //   value: date
      // });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // filter: {fileAbsolutePath: {regex: "/blog/.*\\.md$/"}}
  // sort: { order: DESC, fields: [frontmatter___date] }
  const allBlogPosts = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            excerpt(pruneLength: 250)
            id
            frontmatter {
              slug
              title
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  `);

  // const allMarkdown = await graphql(`
  //   {
  //     allMarkdownRemark(limit: 1000) {
  //       edges {
  //         node {
  //           fields {
  //             layout
  //             slug
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);

  if (allBlogPosts.errors) {
    console.error(allBlogPosts.errors);
    throw new Error(allBlogPosts.errors);
  }

  allBlogPosts.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, layout, date } = node.frontmatter;

    createPage({
      path: slug,
      // This will automatically resolve the template to a corresponding
      // `layout` frontmatter in the Markdown.
      //
      // Feel free to set any `layout` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `page`
      // template.
      //
      // Note that the template has to exist first, or else the build will fail.
      component: path.resolve(`./src/templates/blog.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
        date
      }
    });
  });
};
