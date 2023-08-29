/*
    Este será el archivo principal que va a 
    mostrar el contenido.

*/

import MainLayout from './layouts/MainLayout';
export default function Home({ children }) {
    return <MainLayout>{children}</MainLayout>;
}
