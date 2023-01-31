import Link from "next/link"
import Image from "next/image"

const ReadAllItems = (props) => {

  return (
    <div>
      <div>
        <h1 className="h1-style">こんにちは</h1>
        {props.allItems.map(item => 
          <Link legacyBehavior href={`/item/${item._id}`} key={item._id}>
            <a>
              <Image src={item.image} width="750" height="500" alt="item-image" />
              <div>
                <h2>\{item.price}</h2>
                <h3>{item.title}</h3>
                <p>{item.description.substring(0,80)}...</p>
              </div>
            </a>
          </Link>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps = async() => {
  const response = await fetch("http://localhost:3000/api/item/readall")
  const allItems = await response.json()
  return{
    props: allItems
  }
}

export default ReadAllItems