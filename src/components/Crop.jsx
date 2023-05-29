import React from "react"
import { useState, useRef, useCallback, useEffect } from 'react';
import ReactCrop from "react-image-crop";
import './crop_page_controls_styles.css';


export default function Crop(){

	var fruitNameList = ["Apple","Blueberry","Cherry","Corn","Grape","Orange","Peach","Pepper","Potato","Raspberry","Soybean","Squash","Strawberry","Tomato"]

    const imageRef = useRef();
	const rcImageRef = useRef();
	const canvasRef = useRef();

	const [cropData, setCropData] = useState(null);
	const [image, setImage] = useState(null);
	const [croppedImage, setCroppedImage] = useState(null);
	const [selection,setSelection] = useState(null);
	const [species, setSpecies] = useState(null);
	const [crop, setCrop] = useState({ aspect: 9/16 });
	const [completedCrop, setCompletedCrop] = useState(null);
	const [testimg, setTestimg] = useState(null);
	const [disease, setDisease] = useState("");

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
		if(completedCrop && rcImageRef){
			const rc_image = rcImageRef.current;
			const canvas = canvasRef.current;
			//The below code is to upoad cropped pic!:

			// const crop = completedCrop;

			// const scaleX = rc_image.naturalWidth/ rc_image.width;
			// const scaleY = rc_image.naturalHeight/ rc_image.height;

			// const pixelRatio = window.devicePixelRatio;
			// const dImageWidth = crop.width*scaleX;
			// const dImageHeight = crop.height*scaleY;

			// canvas.width = dImageWidth*pixelRatio;
			// canvas.height = dImageHeight*pixelRatio;

			// const ctx = canvas.getContext("2d");
			// ctx.setTransform(pixelRatio,0,0,pixelRatio,0,0);
			// ctx.imageSmoothingquality = "large";
			// ctx.imageSmoothingEnabled = true;
			
			// ctx.drawImage(
			// 	rc_image,
			// 	crop.x*scaleX,
			// 	crop.y*scaleY,
			// 	dImageWidth,
			// 	dImageHeight,
			// 	0,
			// 	0,
			// 	dImageWidth,
			// 	dImageHeight
			// );
			// canvas.toBlob(setCroppedImage)

			//The below code is to upload full pic!: (ignore the setCroppedPic namw :P)
			canvas.width = rc_image.naturalWidth;
			canvas.height = rc_image.naturalHeight;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(rc_image, 0, 0);
			canvas.toBlob(setCroppedImage);
			
		}
	},[completedCrop])

	const handleSubmit = (e) => {
		const scaleX = rcImageRef.current.naturalWidth/rcImageRef.current.clientWidth;
		const scaleY = rcImageRef.current.naturalHeight/rcImageRef.current.clientHeight;
		setCropData({
			x1: Math.floor(crop.x*(scaleX)),
			y1: Math.floor(crop.y*(scaleY)),
			x2: Math.floor((crop.x+crop.width)*(scaleX)),
			y2: Math.floor((crop.y+crop.height)*(scaleY))
		});
		console.log("Sent");
		const formData = new FormData();

		formData.append("file",croppedImage,"testpic.png");
		formData.append("data", JSON.stringify(cropData)); 

		const requestOptions={method: 'POST',body: formData,};

		fetch("http://127.0.0.1:8000/upload/", requestOptions)
		.then(response => response.json())
		.then(data => {console.log("B64 image:"+data.result);setImage(data.result);})
		.catch(error => console.error(error));
	}

	const handleSelectionSubmit = (e) => {
		const newFormData = new FormData();

		newFormData.append("file",croppedImage,"testpic.png");
		newFormData.append("data",JSON.stringify({Selection: {selection}, Species: {species}}));

		const requestOptions={method: 'POST',body: newFormData,};

		fetch("http://127.0.0.1:8000/upload_selection/", requestOptions)
		.then(response => response.json())
		.then(data => {console.log("Disease:"+data.result);setDisease(data.result);})
		.catch(error => console.error(error));
	}
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
					<div className="image--container">
						{/* <div className="crop--image"> */}
							{image && (<ReactCrop className="rc" src={image} 
												crop={crop}
												onChange={(c)=>{
													console.log(cropData);setCrop(c);
													const scaleX = rcImageRef.current.naturalWidth/rcImageRef.current.clientWidth;
													const scaleY = rcImageRef.current.naturalHeight/rcImageRef.current.clientHeight;
													setCropData({
														x1: Math.floor(crop.x*(scaleX)),
														y1: Math.floor(crop.y*(scaleY)),
														x2: Math.floor((crop.x+crop.width)*(scaleX)),
														y2: Math.floor((crop.y+crop.height)*(scaleY))
													});}} 
												onComplete={(c)=>{console.log(cropData);setCompletedCrop(c)}}>
														<img src={image} class="crop--image" onLoad={handleOnLoad} />
										</ReactCrop>)}
							{/* <img src={testimg} className="crop--image" alt="overlay"/> < */}
						{/* </div>	 */}
					</div>
				</div>				
				<canvas ref={canvasRef}></canvas>
				<div className="buttons-panel">
					<input className='image--input' type='file' accept='image/*' ref={imageRef} onChange={handleImageChanged}/>
					<button className='btn--img' type='button' onClick={()=>imageRef.current.click()}>Upload Image</button>
					<button className='btn--crop' type='button' onClick={handleSubmit}>Submit Image</button>
					<button className='btn--cancel' type='button' onClick={clear}>Clear</button>
					{/* <button className='btn--download' type='button' disabled={!completedCrop?.width || !completedCrop.height} onClick={downloadImage}>Download</button> */}
					<div class="radiobutton-container">
						<div class="container">
							<input type="radio" class="hidden" id="input1" name="inputs" onChange={()=>{setSelection("Fruit");}}/>
							<label class="entry" for="input1"><div class="circle"></div><div class="entry-label">Fruit</div></label>
							<input type="radio" class="hidden" id="input2" name="inputs" onChange={()=>{setSelection("Leaf");}}/>
							<label class="entry" for="input2"><div class="circle"></div><div class="entry-label">Leaf</div></label>
							<div class="highlight"></div>
							<div class="overlay"></div>
						</div>
					</div>
					<div className="fruit-dropdown">
						<select id="fruit-selector" name="fruit" class="fruit-dropdown" onChange={(event)=>{setSpecies(event.target.value);}} disabled={selection == null}>
							<option value="none" selected disabled hidden>Select a Fruit</option>
							{fruitNameList.map((item)=>(<option value={item}>{item}</option>))}
						</select>
					</div>
					<button className='btn--analyse' type='button' onClick={handleSelectionSubmit} disabled={species == null}>Analyse</button>
					<h4>{disease}</h4>
				</div>
			</div>
        </div>
    )
}