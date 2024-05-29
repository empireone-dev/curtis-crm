import Input from "@/app/layouts/components/input";
import Modal from "@/app/layouts/components/modal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setForm } from "../redux/ticket-form-slice";


export default function TicketFormSearchProductSection() {

  const { products, form } = useSelector((state) => state.ticket_form)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchProducts, setSearchProducts] = useState([])
  const dispatch = useDispatch()


  async function formHandler(event) {
    try {
      setLoading(true);

      const productFilter = products.slice(2); // Exclude the first two elements
      const searching = event === '' ? null : event.toLowerCase();

      const searchProductsList = productFilter.filter((product) =>
        product.some((value) => typeof value === 'string' && value.toLowerCase().includes(searching))
      );

      setSearchProducts(searchProductsList);
      setSearch(event);

      // Simulate an asynchronous operation
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    } catch (error) {
      console.error('An error occurred:', error);
      setLoading(false);
    }
  }



  const newProducts = searchProducts.map(res => ({
    brand: res[0],
    item_number: res[1],
    unit: res[2],
    class: res[3]
  }))
  function selectedProduct(data) {
    dispatch(setForm({
      ...form,
      ...data
    }))
    setOpen(false)
  }
  return (
    <div>
      <button onClick={() => setOpen(true)} className="p-3 rounded-sm bg-blue-500 text-white hover:bg-blue-600">
        Select Product
      </button>
      <Modal
        setOpen={setOpen}
        open={open}
        title="Products"
        width="max-w-5xl"
        position='items-start'
      >
        <div className="pt-2 relative mx-auto text-gray-600 w-full">
          <Input
            onChange={formHandler}
            name='product'
            value={search}
            label='Search Product'
            type='text'
            errorMessage={newProducts.length == '' && 'Products not found!'}
          />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
            <MagnifyingGlassIcon className="h-6 text-blue-600" />
          </button>
        </div>

        <div className="relative my-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3">
                  Item Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit
                </th>
                <th scope="col" className="px-6 py-3">
                  Item Class
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="w-full ">
                <th colSpan={4} className="w-full">
                  {loading && <div className="flex h-52 w-full items-center justify-center">
                    <svg className="w-6 h-6 text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                      <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                      </path>
                    </svg>
                  </div>}
                </th>
              </tr>
              {
                !loading && newProducts.map((res, i) => {
                  return (
                    <tr onClick={() => selectedProduct(res)} key={i} className="bg-white hover:cursor-pointer border-b hover:bg-gray-200">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {res.brand}
                      </th>
                      <td className="px-6 py-4">
                        {res.item_number}
                      </td>
                      <td className="px-6 py-4">
                        {res.unit}
                      </td>
                      <td className="px-6 py-4">
                        {res.class}
                      </td>
                    </tr>
                  )
                })
              }


            </tbody>
          </table>
        </div>

      </Modal>
    </div>
  )
}
