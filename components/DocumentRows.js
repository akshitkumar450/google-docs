import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from 'next/router'

function DocumentRows({ id, fileName, date }) {
    const router = useRouter()
    return (
        <section className='bg-white pb-10 px-10' >
            <div
                onClick={() => router.push(`/doc/${id}`)}
                className='max-w-3xl mx-auto flex items-center justify-between cursor-pointer hover:bg-gray-200'>
                <Icon name='article' size='3xl' color='blue' />
                <h1 className='flex-1 pl-11'>{fileName}</h1>
                <p>{new Date(date?.seconds * 1000).toLocaleDateString()}</p>
                {/*<p className='text-sm pr-5 text-gray-500'>{date.toDate().toLocaleDateString()}</p>*/}
                <Button
                    color="gray"
                    buttonType="outline"
                    size="regular"
                    iconOnly={true}
                    ripple="dark"
                    className='border-0'
                >
                    <Icon name='more_vert' size='3xl' />
                </Button>
            </div>
        </section>
    )
}

export default DocumentRows
