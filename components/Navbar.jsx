import Link from 'next/link';

const Navbar = () => {
    return (
        <>
            <nav>
                <ul>
                    <Link className="hover:underline p-3" href="/login">
                        Log In
                    </Link>
                    <Link className="hover:underline" href="/signin">
                        Sign In
                    </Link>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
