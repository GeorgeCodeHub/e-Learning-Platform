import React from 'react';

const Page = ({children, singleMode, id}) => (<div
  id={id}
  style={{width: "100%", background:"white", padding: 25}}
>
  {children}
</div>); 

export default Page;