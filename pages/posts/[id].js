import { getGlobalData } from '../../utils/global-data';
import {
  getNextPostBySlug,
  getPostById,
  getPreviousPostBySlug,
  postFilePaths,
  getPosts,
} from '../../utils/mdx-utils';

import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';

// ----------------------------------------

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Head,
};

export default function PostPage
({
  source,
  data,
  globalData,
}) {
  return (
    <Layout>
      <SEO
        title={`${data[0].title} - ${globalData.name}`}
        description={data[0].description}
      />
{/* transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0*/}
      <Header name={globalData.name} />
      <article className="py-6 lg:py-10 px-6 lg:px-16  
                          transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0
                          backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 ">
        {/* Cabeçalho do post*/}
        <header className='mb-10'>
          {/* Titulo do post */}
          <h1 className="text-3xl md:text-5xl dark:text-white text-center font-bold font-mono mb-2">
            {data[0].title}
          </h1>
          {/* Descrição do post */}
          {data[0].description && (
             <p className="text-xl font-mono italic">{data[0].description}</p>
          )}
        </header>

        {/* Corpo do post */}
        <main>
          <article className="prose dark:prose-dark font-mono" >
            <MDXRemote {...source} components={components} />
          </article>
        </main>

      </article>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostById(params.id);

  return {
    props: {
      globalData,
      source: mdxSource,
      data
    },
  };
};

export const getStaticPaths = async () => {
  const posts = await getPosts(); // Obtenha todos os posts do seu backend ou banco de dados
  const paths = posts.map((post) => ({
    params: { id: post.id }, // Crie o caminho usando o id do post
  }));

  return {
    paths,
    fallback: false, // Se fallback for true, o Next.js tentará gerar as páginas sob demanda
  };
};
