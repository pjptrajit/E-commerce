import { useEffect, useState } from 'react';

function Menu() {
    const [product, setProduct] = useState();
    async function getMenu(){
        try {
            // http://localhost:9000/api/user/v1/login
            let res = await fetch("http://localhost:9000/api/product/getAllProduct",
                {
                    method: "GET"
                }
            );

            if(!res){
                console.log("Data cannot fetch!");
            }
            res = await res.json();
            console.log(res.productInfo);
            setProduct(res.productInfo);

        } catch (error) {
            console.log("Error: ",error);   
        }
    }

    useEffect(()=>{
        getMenu();
    },[]);

  return (
    <div>
        <div className='w-full h-[90vh] flex justify-center items-center'>
            {
                product?.length > 0 ?(<div className='w-[80vw] h-[65vh] flex gap-10 p-10 m-auto overflow-auto border-8'>
                    {
                        product.map((item, index)=>{
                            return <div key={index} className='w-64 h-96 p-5 shrink-0 border'>
                                <div><img src={`http://localhost:9000/image/${item.image}`} alt="image not found" /></div>
                                <div>
                                    <h1>Name: {item.name}</h1>
                                    <h1>Price: {item.price}</h1>
                                    <h1>Description: {item.description}</h1>
                                </div>
                            </div>
                        })
                    }
                </div>) :(<div></div>)
            }
        </div>
    </div>
  )
}

export default Menu