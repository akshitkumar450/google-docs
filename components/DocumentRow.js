
import Icon from "@material-tailwind/react/Icon";

function DocumentRow() {
    return (
        <section className='bg-[#f8f9fa] pb-10 px-10'>
            <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
                <div className='flex items-center justify-between pb-5'>
                    <h2 className='font-medium flex-1'>My documents</h2>
                    <p className='mr-5'>Date created</p>
                    <Icon name='folder' size='3xl' color='gray' />
                </div>
            </div>
        </section>
    )
}

export default DocumentRow
