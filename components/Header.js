import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from 'next-auth/client'

function Header() {
    const [session, loading] = useSession()
    // console.log(session);

    return (
        <header className='flex items-center sticky top-0 z-50 px-4 py-2 shadow-md bg-white'>
            <div className='flex items-center'>
                <Button
                    color="gray"
                    buttonType="outline"
                    size="regular"
                    rounded={true}
                    iconOnly={true}
                    ripple="dark"
                    className='border-0 w-20 h-20'
                >
                    <Icon name='menu' size='3xl' />
                </Button>
                <Icon name='description' size='5xl' color='blue' />
                <h1 className='ml-2 text-gray-700 text-xl'>Docs</h1>
            </div>

            <div className='flex flex-1 items-center bg-gray-200 mx-2 lg:mx-4 px-5 py-2 rounded-md focus-within:shadow-md'>
                <Icon name='search' size='3xl' color='gray' />
                <input type="text" placeholder='search' className=' flex-1 text-gray-500 outline-none' />
            </div>

            <div className='flex items-center'>
                <Button
                    color="gray"
                    buttonType="outline"
                    size="regular"
                    rounded={true}
                    iconOnly={true}
                    ripple="dark"
                    className='border-0 w-20 h-20'
                >
                    <Icon name='apps' size='3xl' color='gray' />
                </Button>
                <img
                    // inbuilt signout function
                    onClick={signOut}
                    src={session.user.image}
                    alt=""
                    loading='lazy'
                    className='cursor-pointer h-12 w-12 rounded-full ml-2' />
            </div>
        </header>
    )
}

export default Header
