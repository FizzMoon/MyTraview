import React, { useEffect, useState } from 'react'
import BestArticles from '../../pages/BestArticles'
import Section from './Section'
import SeventeenDistrict from './SeventeenDistrict'

const SinglePage = () => {

    return (
        <div className="slider" style={{width: "100%", height: "100vh"}}>
                <div id="s1" style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
                    <Section />
                </div>

                <div id="s2" style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
                    <SeventeenDistrict />
                </div>

                <div id="s3" style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
                    <BestArticles />
                </div>
            
        </div>
    )
}

export default SinglePage