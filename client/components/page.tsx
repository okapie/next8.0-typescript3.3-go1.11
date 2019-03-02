import Link from "next/link"
import { connect } from "react-redux"
import { PageProps } from "../interfaces/components"

function Page (props: PageProps) {
  return (
    <div>
      <h1>{props.title}</h1>
      <nav>
        <Link href={props.linkTo}>
          <a>Navigate: {props.NavigateTo}</a>
        </Link>
      </nav>
    </div>
  )
}

export default connect(state => state)(Page)
