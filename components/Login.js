import Button from "@material-tailwind/react/Button";
import Image from 'next/image'
import { signIn } from 'next-auth/client'

function Login() {
    return (
        <div className='flex flex-col items-center justify-center h-screen py-2'>
            <Image
                src="https://links.papareact.com/1ui"
                height='300'
                width='550'
                objectFit='contain'
                alt="logo"
            />
            <Button
                color='blue'
                buttonType='filled'
                ripple='light'
                className='w-44 mt-10'
                // inbuilt next js signin function
                onClick={signIn}
            >Login </Button>
        </div>
    )
}

export default Login
