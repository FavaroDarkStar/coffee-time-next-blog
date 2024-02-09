import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.png'

export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12">
      <div className="w-12 h-12 mx-auto">
        <Image
          src={logo}
          alt="Descrição da imagem"
        />
      </div>
      <p className="text-2xl dark:text-white text-center not-italic">
        <Link href="/">
          <a>{name}</a>
        </Link>
      </p>
    </header>
  );
}
