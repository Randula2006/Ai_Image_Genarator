import React, { useRef, useState } from 'react'
import '../components/ImageGenarator.css'
import defaultImg from '../assets/default_image.svg'

const ImageGenarator = () => {

    const[image_url,setImage_url] = useState("/");
    let inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value==="") {
            return 0;
        }
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization:
                    "Bearer (use your own openAi secret key to access)", //don't forget to use the secret key
                    "User-Agent": "Chrome" ,
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"240x240",
                }),
            }
        );
    }

  return (
    <div className='aiImgGenarator'>
      <div className='header'>Ai Image <span>Generator</span></div>
      <div className='ImgLoading'>
        <div className='Image'><img src={image_url==="/"?defaultImg:image_url} alt="" /></div>

      </div>
      <div className='searchBox'>
        <input type="text" ref={inputRef} className='serchInput' placeholder='Describe Your Idea to make it happen' name="" id="" />
        <button className='generateSubmit' type='submit'>Generate</button>
      </div>
    </div>
  )
}

export default ImageGenarator;
