import React from 'react'

export default function SearchPlaylist(name, img, id, click) {
  return (
      <>
        <div onClick={() => click(id)}>
          <img src={img} />
          <p>{name}</p>
        </div>
    </>
  )
}
