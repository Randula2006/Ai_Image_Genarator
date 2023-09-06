import React, { useRef, useState } from 'react'
import '../components/ImageGenarator.css'
import defaultImg from '../assets/default_image.svg'

const ImageGenarator = () => {

    const[image_url,setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading,setLoading] = useState(false);

    const imageGenerator = async () => {
        if (inputRef.current.value==="") {
            return 0;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization:
                    "Bearer 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", //don't forget to use the secret key
                    "User-Agent": "Chrome" ,
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"240x240",
                }),
            }
        );
        let data = await response.json();
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
    }

  return (
    <div className='aiImgGenarator'>
      <div className='header'>Ai Image <span>Generator</span></div>
      <div className='ImgLoading'>
        <div className='Image'><img src={image_url==="/"?defaultImg:image_url} alt="" /></div>
        <div className='loading'>
          <div className={loading?"loading-bar-full":"loading-bar"}>
            <div className={loading?"loading-text":"display-none"}>Loading.....</div>
          </div>
        </div>

      </div>
      <div className='searchBox'>
        <input type="text" ref={inputRef} className='serchInput' placeholder='Describe Your Idea to make it happen' name="" id="" />
        <div className='generateSubmit' onClick={()=>{imageGenerator()}}>Generator</div>
      </div>
    </div>
  )
}

export default ImageGenarator;
