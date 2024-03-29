import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mango Technical Test</title>
        <meta name="description" content="Prueba Técnica Mango - Range Component" />
      </Head>
      <main>
        <h1>Mango Technical Test</h1>
        <h2>Range Component</h2>
        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'flex-start', padding: 0 }}>
            <li style={{ marginRight: '20px' }}> 
              <Link href="/exercise1">Exercise1</Link>
            </li>
            <li>
              <Link href="/exercise2">Exercise2</Link>
            </li>
          </ul>
        </nav>
        <p>Developer Alexandra Suarez Graterol</p>
      </main>
    </div>
  );
}