import React from 'react'

export default function Loader() {
  return (
   /* From Uiverse.io by Javierrocadev */ 
<div  className="loaader min-h-[100vh] flex flex-row justify-center items-center gap-2 mt-[50px] ">
  <div  className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
  <div  className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
  <div  className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
</div>
  )
}
