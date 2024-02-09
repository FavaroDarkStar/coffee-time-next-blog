import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from '@mapbox/rehype-prism';
import remarkGfm from 'remark-gfm';

import {api} from '../services/api'

// ----------------------------------------

export const getPosts = async() => {
  const {data} = await api.get('/posts');
  data.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  return data;
};

export const getPostById = async (id) => {
  const {data} = await api.get(`/posts?id=eq.${id}&select=*`);
  const mdxSource = await serialize(data[0].body, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    },
  });

  return { mdxSource, data };
};

