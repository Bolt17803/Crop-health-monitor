import React from "react"
import { useState, useRef, useCallback, useEffect } from 'react';
import ReactCrop from "react-image-crop";

export default function Crop(){
    const imageRef = useRef();
	const rcImageRef = useRef();
	const canvasRef = useRef();
	const [image, setImage] = useState(null);

	const [crop, setCrop] = useState({ aspect: 9/16 });
	const [completedCrop, setCompletedCrop] = useState(null);

	const handleImageChanged = (event) => {
		const {files} = event.target;

		if(files && files.length > 0){
			const reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.addEventListener("load",()=>{setImage(reader.result)});	
		}
	};	

	const handleOnLoad = useCallback((img) => {
		rcImageRef.current=img.target;
	},[]);

	const clear = () => {
		setImage(null);
		setCompletedCrop(null);
		setCrop({ aspect:9/16 });

		const canvas = canvasRef.current;

		const ctx = canvas.getContext("2d")
		ctx.clearRect(0,0,canvas.width,canvas.height);
		canvasRef.current = null;
	};

	useEffect(() =>{
	// 	if(!completedCrop || !rcImageRef){
			
	// 	}
	// 	else{

	// 	const rc_image = rcImageRef.current;
	// 	const canvas = canvasRef.current;
	// 	console.log("canvas: >>,canvas")
	// 	const crop = completedCrop;

	// 	const scaleX = rc_image.naturalWidth/ rc_image.width;
	// 	const scaleY = rc_image.naturalHeight/ rc_image.height;

	// 	const pixelRatio = window.devicePixelRatio;
	// 	const dImageWidth = crop.width*scaleX;
	// 	const dImageHeight = crop.height*scaleY;

	// 	canvas.width = dImageWidth*pixelRatio;
	// 	canvas.height = dImageHeight*pixelRatio;

	// 	const ctx = canvas.getContext("2d");
	// 	ctx.setTransform(pixelRatio,0,0,pixelRatio,0,0);
	// 	ctx.imageSmoothingquality = "large";
	// 	ctx.imageSmoothingEnabled = true;
		
	// 	ctx.drawImage(
	// 		rc_image,
	// 		crop.x*scaleX,
	// 		crop.y*scaleY,
	// 		dImageWidth,
	// 		dImageHeight,
	// 		0,
	// 		0,
	// 		dImageWidth,
	// 		dImageHeight
	// 	);
		
	// }
},[completedCrop])

	const downloadImage = () => {
		if(!completedCrop || !canvasRef.current){
			return;
		}

		canvasRef.current.toBlob((blob) => {
			const previewUrl = window.URL.createObjectURL(blob);
			const anchor = document.createElement("a");
			anchor.download = "cropPreview.png";
			anchor.href = URL.createObjectURL(blob);
			anchor.click();
			window.URL.revokeObjectURL(previewUrl);
		},"image/png",1);
	}

    return(
        <div className="second_page" id="crop">
			<div className="second_page--container">
				<div className='crop--view'>
					<div className="crop--image">
					{image && (<ReactCrop className="rc" src={image} 
										crop={crop}
										onChange={(c)=>setCrop(c)} 
										onComplete={(c)=>setCompletedCrop(c)}>
									<img src={image} onLoad={handleOnLoad} />
								</ReactCrop>)}
					</div>
				</div>
				<div className="buttons-panel">
					<input className='image--input' type='file' accept='image/*' ref={imageRef} onChange={handleImageChanged}/>
					<button className='btn--img' type='button' onClick={()=>imageRef.current.click()}>Upload Image</button>
					<button className='btn--cancel' type='button' onClick={clear}>Cancel Operation</button>
					<button className='btn--crop' type='button' onClick={clear}>Crop Image</button>
					<button className='btn--revert' type='button' onClick={clear}>Revert back to original</button>
					{/* <button className='btn--download' type='button' disabled={!completedCrop?.width || !completedCrop.height} onClick={downloadImage}>Download</button> */}
				</div>
			</div>
        </div>
    )
}