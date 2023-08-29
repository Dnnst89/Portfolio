'use client';
/* En esta seccion se renderiza el contenido de la
    pagina principal
*/

import RegisterMenu from './includes/RegisterMenu';
//El children enruta los componentes hijos
const mainLayout = ({ children }) => {
    return (
        <>
            <div>
                <div>
                    <RegisterMenu />
                </div>
                {/* se agregan los componentes hijos */}
                <div>{children}</div>
            </div>
        </>
    );
};

export default mainLayout;
