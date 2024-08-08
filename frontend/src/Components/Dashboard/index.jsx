import React from 'react'

const Dashboard = () => {

  const ImageData=[
    {
      // imageUrl:"public/logo192.png",
      imageTitle:"introTitle"
    },
    {
      // imageUrl:"/logo192.png",
      imageTitle:"introTitle1"
    },
    {
      // imageUrl:"/logo192.png",
      imageTitle:"introTitle2"
    },
    {
      // imageUrl:"/logo192.png",
      imageTitle:"introTitle3"
    }
  ]
  return (
  <>
  <h1>this is dashboard</h1>
  <div>
    {
      ImageData.map((item,index)=>(
        <>
        {/* <div key={index}>{item.imageUrl}</div> */}
        <div className='d-flex'>{item.imageTitle}</div>
        </>
      ))
    }
  </div>
  <div>
    
  </div>
  </>
  )
}

export default Dashboard
