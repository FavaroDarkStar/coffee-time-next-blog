// import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from '@mapbox/rehype-prism';
import remarkGfm from 'remark-gfm';

import {api} from '../services/api'


export const getPosts = async() => {
  const {data} = await api.get('/posts');
  return data;
};

export const getPostBySlug = async (slug) => {
  const postFilePath = slug;
  const source = await api.get(`/posts?filePath=eq.${slug}.mdx&select=description`);
  const { content, data } = matter(source.data[0].description);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    },
    scope: data,
  });

  return { mdxSource, data, postFilePath };
};