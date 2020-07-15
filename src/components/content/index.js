import React from "react"
import ContentHeader from './header'
import ContentV3 from './v3'

export default function Content(props) {
  return (
    <div className="content-wrapper">
      <ContentHeader />
      <div className="content">
        <div className="container-fluid">
          <ContentV3 {...props} />
        </div>
      </div>
    </div>
  )
}
