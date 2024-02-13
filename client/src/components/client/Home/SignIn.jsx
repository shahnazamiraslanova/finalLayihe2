import React from 'react'
import 'typeface-roboto';

import './SignIn.css'

const SignIn = () => {
  return (
    <div id='sign'>
            <div className="container">
                <div id='signArticle'>
                    <h2>WELCOME!</h2>
                    <p>You can get all information about our course from this site!</p>
                </div>
                <div id='signForm'>
                <h3>Sign In Your Page!</h3>

                  <form action="">
                    <select name="" id="">
                      <option value="">I am student</option>
                      <option value="">I am teacher</option>
                    </select>
                    <input type="text" placeholder=' Id...' />
                    <input type="text" placeholder='Password...' />
                    <button >Go To My Page</button>
                  </form>
                </div>
            </div>
    </div>
  )
}

export default SignIn