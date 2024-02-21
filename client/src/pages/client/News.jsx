import React, { useEffect } from 'react'
import LastNews from '../../components/client/News/LastNews'
import MainNews from '../../components/client/News/MainNews'

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
<>
<LastNews/>
<MainNews/>

</>  )
}

export default News